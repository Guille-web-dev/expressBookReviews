const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();
const dotenv = require('dotenv');

// get config vars
dotenv.config();

let users = [{user:"Guillermo",password:"1234"},{user:"Alejandro",password:"4321"}];

const isValid = (userName)=>{ //returns boolean
  return users.some(({user}) => user === userName)
}

const authenticatedUser = (userName,Password)=>{ //returns boolean
  return users.some(({user,password}) => user.toLowerCase()  === userName.toLowerCase()  && password === Password)
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  if(!req.body.user || !req.body.password){
    return res.status(404).json({message:"The name and password are required"})
  }
  if(!authenticatedUser(req.body.user,req.body.password)){
    return res.status(401).json({message:"Unregistered user"})
  }
  const token = jwt.sign({data:req.body.user},process.env.MY_SECRET)
  req.session.token = token;
  req.session.userName = req.body.user
  return res.status(200).json({message: "User logged in"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const {isbn} = req.params
  const reviews = req.body.reviews
  const book = Object.values(books)[isbn]
  book["reviews"][req.session.userName] = reviews
  return res.status(201).json({message: "modified review", body:book});
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
  const {isbn} = req.params
  const book = Object.values(books)[isbn]
  delete book["reviews"][req.session.userName] 
  return res.status(201).json({message: "modified review", body:book});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
