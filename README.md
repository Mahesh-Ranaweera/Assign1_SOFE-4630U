# Assign1_SOFE-4630U :: Notebook WebApp
Assignment 1: CloudComputing

![Notebook Logo](https://github.com/Mahesh-Ranaweera/Assign1_SOFE-4630U/blob/master/public/assets/app_header.svg?sanitize=true)

Notebook is an web application that allows users such as students to take notes online, upload and share them to the public. 
App allows users to register and use the service. Users are able to upload their current notes and save them privately or share them
publicly to the other users in the platform. Users are able to search publicly available notes and view them. This web-app is build using 
NodeJS, Express and uses PostgreSQL as the database service.

## Web App Link
> https://collaborative-notebook.herokuapp.com

## Web-APP Features
* User Authentication
* Allow to create new notes, edit and delete them
* Able to upload notes from a text file
* Notes can be made available to other users that are registered in the platform
* Allow users to search publicly available notes
* Responsive interface

![Notebook Description](https://github.com/Mahesh-Ranaweera/Assign1_SOFE-4630U/blob/master/public/assets/app_description.svg?sanitize=true)
---
## Setting up the application for local testing

### Install Prerequisite
- NodeJS
- PostgreSQL

1. NodeJS
https://nodejs.org

2. Setting up PostgreSQL
    ```sh
    wget -q https://www.postgresql.org/media/keys/ACCC4CF8.asc -O - | sudo apt-key add -

    sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ `lsb_release -cs`-pgdg main" >> /etc/apt/sources.list.d/pgdg.list'

    sudo apt-get update

    sudo apt-get install postgresql postgresql-contrib
    ```

    * Connect to PostgreSQL
    ```sh
    service postgresql start

    sudo su - postgres

    psql
    ```

3. Download the source files
    ```js
    git clone git@github.com:Mahesh-Ranaweera/Assign1_SOFE-4630U.git

    cd Assign1_SOFE-4630U

    npm install

    npm start

    >> Navigate to localhost:3000 on the web-browser
    ```

