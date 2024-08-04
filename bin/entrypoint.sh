#!/bin/bash

set -ex
env

echo "Decompressing SQL files ..."
gunzip /var/www/sql/*.gz || echo "No SQL files found to decompress"
ls -alh /var/www/sql/

echo "Migrating Database..."
for i in {1..5}; do 
    mysqldump --no-tablespaces -u ${WORDPRESS_DB_USER} -h ${WORDPRESS_DB_HOST} --password="${WORDPRESS_DB_PASSWORD}" ${WORDPRESS_DB_NAME} >/var/www/sql/V1__${WORDPRESS_DB_NAME}.sql && \
	/usr/local/bin/flyway migrate \
	&& break || sleep 15
done

echo "Starting Wordpress ..."
exec docker-entrypoint.sh apache2-foreground
