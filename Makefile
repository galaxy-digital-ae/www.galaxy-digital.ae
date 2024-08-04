help:
	@echo "build     - Builds Docker Image"
	@echo "install   - Build   + Generate TLS Certificate"
	@echo "run/start - Install + Up"
	@echo "up        - Start Wordpress (Docker-Compose up)"
	@echo "down      - Stop  Wordpress (Docker-Compose down)"
	@echo "stop      - Stop    + Delete all data"
	@echo "status    - Show running state (Docker-Compose ps)"
	@echo "logs      - Show PHP Wordpress logs"
	@echo "query     - MySQL command prompt"
	@echo "export    - Makes a mysqldump and saves it to git"

build:
	#cp -f backup/mysql/www.galaxy-digital.ae.sql.gz mysql/V0__www.galaxy-digital.ae.sql.gz
	gunzip -c backup/mysql/www.galaxy-digital.ae.sql.gz |sed 's/utf8mb4_0900_ai_ci/utf8mb4_general_ci/g' >mysql/V0__www.galaxy-digital.ae.sql && gzip -f mysql/V0__www.galaxy-digital.ae.sql
	sudo docker build -t quay.io/sanofi/www.galaxy-digital.ae:latest .

install: build
	mkdir -p ./configuration/ssl
	# If file exists or create new cert.pem
	[ -s ./configuration/ssl/cert.pem ] || openssl req -newkey rsa:4096 -x509 -sha256 -days 3650 -nodes \
                                             -out ./configuration/ssl/www.galaxy-digital.ae.crt -keyout ./configuration/ssl/www.galaxy-digital.ae.key \
                                             -subj "/C=SI/ST=Ljubljana/L=Ljubljana/O=Security/OU=IT Department/CN=www.galaxy-digital.ae.test" \
                                             && cat ./configuration/ssl/www.galaxy-digital.ae.crt ./configuration/ssl/www.galaxy-digital.ae.key > ./configuration/ssl/cert.pem

run: install
	git config core.fileMode false
	git config --add safe.directory `pwd`
	-sudo chmod --quiet -R a+rwX ./site 2>&1 #|grep -v "Operation not permitted"
	sudo docker-compose up -d

start: run

restart: stop start

up:
	sudo docker-compose up -d

down:
	sudo docker-compose down

stop: down
	sudo docker volume rm www.galaxy-digital.ae-db_data

status:
	sudo docker-compose ps

logs:
	sudo docker logs -f wordpress

query:
	sudo docker exec -ti db bash -c 'mysql -u $${MYSQL_USER} --password=$${MYSQL_PASSWORD} $${MYSQL_DATABASE}'

exec:
	sudo docker exec -ti wordpress bash

export:
	sudo docker exec -ti wordpress /bin/bash -c 'echo "DELETE FROM wp_options   WHERE option_name LIKE \"%_transient_%\"" |mysql -u $${WORDPRESS_DB_USER} -h $${WORDPRESS_DB_HOST} --password="$${WORDPRESS_DB_PASSWORD}" $${WORDPRESS_DB_NAME}'
	sudo docker exec -ti wordpress /bin/bash -c 'echo "DELETE FROM wp_3_options WHERE option_name LIKE \"%_transient_%\"" |mysql -u $${WORDPRESS_DB_USER} -h $${WORDPRESS_DB_HOST} --password="$${WORDPRESS_DB_PASSWORD}" $${WORDPRESS_DB_NAME}'
	sudo docker exec -ti wordpress /bin/bash -c 'mysqldump --no-tablespaces --ignore-table=$${WORDPRESS_DB_NAME}.wp_redirection_404 --ignore-table=$${WORDPRESS_DB_NAME}.wp_3_redirection_404 --ignore-table=$${WORDPRESS_DB_NAME}.flyway_schema_history -u $${WORDPRESS_DB_USER} -h $${WORDPRESS_DB_HOST} --password="$${WORDPRESS_DB_PASSWORD}" $${WORDPRESS_DB_NAME} >/tmp/dump.sql && gzip /tmp/dump.sql'
	sudo docker cp wordpress:/tmp/dump.sql.gz mysql/V2__www.galaxy-digital.ae.sql.gz
	git add mysql/V2__www.galaxy-digital.ae.sql.gz
	#git add .
	#git commit -m "`date`"
	#git push
