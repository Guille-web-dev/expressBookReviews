const express = require('express');
const books = require('./booksdb.js');
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  if(!req.body.user || !req.body.password){
    return res.status(404).json({message:" user name and password is require"})
  }
  users.push(req.body)
  return res.status(201).json({message: "Registered user successfully", body:req.body});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  return res.status(200).json({body:books});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const {isbn} = req.params
  const data = books[isbn]
  return res.status(200).json({body:data});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const {author} = req.params
  const authorName = author.replace(/([a-z])([A-Z])/g, '$1 $2')
  const book = Object.values(books)
  const data = book.find(({author}) => author === authorName)
  return res.status(200).json({body:data});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const {title} = req.params
  const titleName = title.replace(/([a-z])([A-Z])/g, '$1 $2')
  const book = Object.values(books)
  const data = book.find(({title}) => title === titleName)
  return res.status(200).json({body:data});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const {isbn} = req.params
  const book = books[isbn]
  const data = book["reviews"]
  return res.status(200).json({body:data});
});

module.exports.general = public_users;
