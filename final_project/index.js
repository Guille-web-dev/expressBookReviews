const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;
const dotenv = require('dotenv');

// get config vars
dotenv.config();

const app = express();

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){
    jwt.verify(req.session.token,process.env.MY_SECRET,(err) => {
        if(err){
            res.json({
                statusCode:401,
                message:"Unauthorized user"
            })
        }
    })
    console.log(req.session.token)
    next()
});
 
const PORT =3000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));
