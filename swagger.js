// to run use node swagger.js

const swaggerAutoGen = require('swagger-autogen')();

const doc = {
    info: {
        title: "CIT341 Project 2 API",
        description: "This is the API for Awesome Mart API.",
    },
    host: "cse341-team-4-final-project.onrender.com",
    schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

//generate swagger.json
swaggerAutoGen(outputFile, endpointsFiles, doc);