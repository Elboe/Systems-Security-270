const express = require('express'); // imports the library

const port = 3000;
const app = express(); // uses the library
const md5 = require("md5");
const bodyParser = require("body-parser"); // body parser is middleware
const {createClient} = require("redis");
const redisClient = createClient(
{
    socket:{
        port:6379,
        host:"127.0.0.1"
    }
}
) // this creates a connection to the redis database


app.use(bodyParser.json()); //use the middleware, call before anything happens on each request


app.listen(port, async ()=>{
    await redisClient.connnect(); // creating a TCP socket with redis
    console.log("listening on port: "+port)
}); // listens on port 3000

const validatePassword = async (request, response) => {
    
    const requestHashedPassword = md5(request.body.password); // get the password from the body and hash it
    const redisHashedPassword= await redisClient.hmGet('password', request.body.userName); //read password from redis
    const loginRequest = request.body;
    console.log("Request Body", JSON.stringify(request.body));
    //search database for username and retrieve current password

    if (requestHashedPassword==redisHashedPassword){
        response.status(200); //response is OK
        response.send("Welcome!");
    }
    else {
        response.status(401) //response is unauthorized
        response.send("Unauthorized")
    }
}

const savePassword = async (request, response)=>{
    const clearTextPassword = request.body.password;
    const hashTextPassword = md5(clearTextPassword);
    await redisClient.hSet('password', request.body.userName, hashTextPassword);
    response.status(200); 
    response.send({result:"Saved"});
}

app.post('/signup', savePassword);
app.post('/login', validatePassword);