const express = require('express'); // imports the library

const app = express(); // uses the library

app.listen(3000,()=>{console.log("listening...")}); // listens on port 3000

app.get('/',(req,res)=>{res.send("Hello!")});

