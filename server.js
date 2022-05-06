const express = require('express'); // imports the library
const bodyParser = require("body-parser"); // body parser is middleware
const { response } = require('express');
const port = 3000;
const app = express(); // uses the library

app.use(bodyParser.json()); //use the middleware, call before anything happens on each request

app.listen(port,()=>{
    console.log("listening...")
}); // listens on port 3000

app.post('/login', (request, response)=>{ 
    
    const loginRequest = request.body;
    
    if (loginRequest.userName=="josephmama@hotmail.com" && loginRequest.password=="Joe12!"){
        response.status(200); //200 means OK
        response.send("Welcome!");
    }
    else {
        response.status(401); //401 means unauthorized
        response.send("Unauthorized");
    };
});


app.get('/', (request,response)=>{response.send("Hello!")});


