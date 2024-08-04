#FROM wordpress:php7.4-apache
#FROM wordpress:5.8.2-php7.4-apache
#FROM wordpress:6.2.2-php7.4-apache
#FROM --platform=linux/x86_64 wordpress:6.1-php7.4-apache
FROM --platform=linux/x86_64 wordpress:6.6.1-php8.3-apache

LABEL com.redhat.deployments-dir="/var/www/html" \
      com.redhat.dev-mode="DEBUG:true" \
      io.k8s.description="Wordpress + Database-versioning" \
      io.k8s.display-name="Wordpress + Flyway" \
      io.openshift.expose-services="8080:http" \
      io.openshift.s2i.scripts-url="image:///usr/local/s2i" \
      io.openshift.tags="builder,php,php56,rh-php56,wordpress" \
      io.openshift.wants=mysql \
      io.openshift.min-memory=200Mi \
      io.openshift.min-cpu=0.1

EXPOSE 8080

USER 0

## FlyWay - Database Versioning ##
RUN  curl -sSLk https://repo1.maven.org/maven2/org/flywaydb/flyway-commandline/10.17.0/flyway-commandline-10.17.0-linux-x64.tar.gz |tar -C/usr/local -zx; \
     chmod +x   /usr/local/flyway-10.17.0/flyway; \
     rm -rf /usr/local/flyway-10.17.0/sql; \
     ln -s /var/www/sql/ /usr/local/flyway-10.17.0
COPY bin/flyway.sh             /usr/local/bin/flyway
COPY configuration/flyway.conf /usr/local/flyway-10.17.0/conf/flyway.conf

## Additional Utils ##
RUN curl -sSLk -o /usr/local/bin/wp-cli https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
ADD bin/*.sh   /usr/local/bin/
COPY bin/mysql.sh /usr/local/bin/mysql
RUN chmod +x /usr/local/bin/*

## Apache HTTPD - WebServer ##
COPY configuration/apache2/sites-enabled/000-default.conf /etc/apache2/sites-enabled/000-default.conf
COPY configuration/apache2/ports.conf /etc/apache2/ports.conf
COPY configuration/wp-config.php /usr/src/wordpress/wp-config-docker.php

## PHP Dependency - MySQL ##
RUN apt-get update && apt-get install -y default-mysql-client

## PHP Dependency - SMTP ##
RUN apt-get update && apt-get install -y msmtp msmtp-mta
ADD configuration/msmtprc /etc/msmtprc
ADD configuration/ssl/*.crt /usr/local/share/ca-certificates/
RUN update-ca-certificates

## PHP Plugins - MemCacheD ##
#RUN apt-get update && apt-get install -y libmemcached-dev zlib1g-dev \
#    && pecl install memcached \
#    && docker-php-ext-enable memcached

## PHP Plugins - Misc ##
RUN docker-php-ext-enable opcache

## PHP Config ##
RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"
COPY configuration/php.conf.d/ "$PHP_INI_DIR/conf.d/"

## Site itself ##
ADD /site       /usr/src/wordpress
ADD /health.php /usr/src/wordpress/
ADD --chmod=777 /mysql      /var/www/sql
#ADD --chmod=777 /archive    /var/www/archive
RUN chmod a+rwX /var/www/sql /var/www/html

## Minify ##
#RUN apt-get install -y webpack

## Wordpress Plugins ##
RUN apt-get install -y unzip less \
 && cd /usr/src/wordpress/wp-content/plugins \
 && for plugin in `ls */.gitkeep |cut -d/ -f1`; do \
 (version=`cat ${plugin}/version.txt 2>/dev/null`; echo "Installing Wordpress Plugin ${plugin} ${version}."; curl -sSLk -o ./${plugin}.zip https://downloads.wordpress.org/plugin/${plugin}${version}.zip && unzip -qo ${plugin}.zip; rm -f ${plugin}.zip || true) || true; done;

## Runtime Config ##
USER 33
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
