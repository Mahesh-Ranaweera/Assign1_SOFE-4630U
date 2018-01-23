# Assign1_SOFE-4630U
Assignment 1: CloudComputing

## Setting up PostgreSQL
```sh
wget -q https://www.postgresql.org/media/keys/ACCC4CF8.asc -O - | sudo apt-key add -

sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ `lsb_release -cs`-pgdg main" >> /etc/apt/sources.list.d/pgdg.list'

sudo apt-get update

sudo apt-get install postgresql postgresql-contrib
```

## Connect to PostgreSQL
```sh
service postgresql start

sudo su - postgres

psql
```