# Node BuildingMaintenanceApplication

A Node app built with MongoDB and Angular. For demonstration purposes and a tutorial.

Node provides the RESTful API. Angular provides the frontend and accesses the API. MongoDB stores like a hoarder.

## Requirements

- [Node and npm](http://nodejs.org)
- [Bower and bower_components] (http://bower.io)

## Connect Local and Remote Database
   In database.js & server.js files, based on your requirement uncomment remoteUrl or localUrl.

## Local
1. Cross check in database.js & server.js files pointing to localUrl or not.
2. Make sure local mongoDB up or not.

## Remote
1. Cross check in database.js & server.js files pointing to remoteUrl or not.
2. Open command prompt run following command
   - [mongo ds025180.mlab.com:25180/building -u buildingUser -p building123]
3. You can see the below lines
   - [MongoDB shell version: 3.X.X]
   - [connecting to: ds025180.mlab.com:25180/buildingur]
4. Your successfully connect the remote database

## Installation

1. Clone the repository: 'https://github.com/MotivityWorkOrg/buildingMaintenanceApp.git'
2. Install the application: 'npm install'
3. Install the bower components 'bower install'
3. Start the server: 'node server.js'
4. View in browser at 'http://localhost:8080'
