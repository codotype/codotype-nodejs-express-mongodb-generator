# <%= blueprint.label %> ExpressJS + MongoDB API Server
API server with Express.js + MongoDB + JWT + Docker


## Getting Started
Express.js, Mongoose, ES6 Syntax is used in this project.


### Install and Deploy
1. Install dependencies with NPM:

```
npm install
```

2. Run the Docker containers for MongoDB and [Mongo-Express](https://github.com/mongo-express/mongo-express)

```
docker-compose up
```

3. Run the server in development mode:

```
npm run dev
```


### Development
A [Postman](https://www.getpostman.com/) collection and environments (`dev` and `production`) are included in this repository to support API development - they are located in the `.postman` directory. Read the Postman [documentation](https://www.getpostman.com/docs/postman/collections/data_formats) about importing collections and environments.


### Documentation
Documentation is auto-generated from [APIDoc.JS](http://apidocjs.com). Build the documentation with the following command:

```
npm run apidoc
```


### Technologies used

- [Express.js](https://expressjs.com/)

- [Mongoose](http://mongoosejs.com/)

- [dotenv](https://www.npmjs.com/package/dotenv)

- [APIDoc.JS](http://apidocjs.com)

- [JSON Web Token](https://jwt.io)


## License
[MIT License](http://opensource.org/licenses/MIT).
Built with [Codotype.io](https://www.codotype.io/).
