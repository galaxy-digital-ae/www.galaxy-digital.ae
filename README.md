# Website

This project contains 4 main areas

- [site](site): the website code
- [conf](conf): the web server configuration
- [Dockerfile](Dockerfile): the website build process
- [openshift](openshift): the OpenShift configuration files

# Local testing

You can test the website locally using Docker and a Makefile, which publishes the website on http://localhost.

* Install docker: https://docs.docker.com/get-docker/

* Run the following console command in the root of this project: `make run`

* Add `127.0.0.1 www.galaxy-digital.local` to /etc/hosts

* Trust the file `cert.pem` found in `bin/ssl` (Example under `Trusting the CA`: https://betterprogramming.pub/how-to-create-trusted-ssl-certificates-for-your-local-development-13fd5aad29c6) 

* Go to https://www.galaxy-digital.local

Or use [OpenShift CodeReady](https://developers.redhat.com/products/codeready-containers/overview)
to run the full solution on your laptop.

# UAT and Production

There are two possible deployment modes. Please indicate to your Tech Partner which model you want to activate.

- **Trunk-based deployment**: Every commit to `master` is mirrored into the Sanofi environment, and automatically deployed to a UAT environment. On demand, any commit can be promoted to production.
- **GitFlow**: Every commit to `develop` is mirrored to Sanofi and deployed to UAT automatically. Every commit to `master` is mirrored to Sanofi, and be be deployed to production on demand.

The application can be viewed on the Sanofi network at the following URL:

http://www-happyhorizon-test.apps.scale-8747d275.p773994914889.aws-emea.sanofi.com/

http://www-happyhorizon.apps.scale-8747d275.p773994914889.aws-emea.sanofi.com/

For the final publication step, the production website will be exposed via Sanofi's CDN (content delivery network) to provide network protection, caching and WAF capabilities.

# About static assets

Small images such as logos can be stored in Github next to the source code.

Large images (over 5MB), PDFs, videos or similar files **must** be managed separately.
They are typically stored on Amazon S3 and exposed over our CDN. We can grant FTP access for the team to manage their static assets.

# Maintenance

## Database repair

Run `flyway repair` in a shell inside the wordpress contaianer.
For a running wordpress container run:
```
oc rsh dc/www flyway repair
```
For spinning up a new container when wordpress container has crashed:
```
oc debug dc/www -- flyway repair
```

## Pinning wordpress plugin versions

* Create a directory `./site/wp-content/plugins/<plugin-name>` to auto-download plugin upon docker build.
* Create a file `./site/wp-content/plugins/insta-plugin/version.txt` with the content `.4.0.0` to pin version.
* Or fill the plugin directory with the desired content/version and git-commit. Download upon docker build will be skipped if content is detected

## Upgrading Wordpress versions

* Make sure to clean up old wordpress version from `/site` directory. Either use `git stash -u` or just completely start over with a fresh `git clone`.
* Upgrade Wordpress version by modifying line 1 in `Dockerfile`.
* `make run` to compile the new version and test it out
* Go to https://www.www.galaxy-digital.local/wp-admin/upgrade.php and follow upgrade instructions
* `make export` to save the upgrade database back to git
