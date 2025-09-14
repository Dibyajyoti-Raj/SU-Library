const express = require('express');
const router = express.Router();
const bigPromise=require("../middlewares/bigPromise");
const customError=require("../utils/customError");
const bookModel=require("../models/bookModel");
const studModel=require("../models/studModel");
const Book = require('../models/bookModel');


//home
exports.home=bigPromise(async(req,res,next)=>{
    console.log("home");
    res.status(200).json({
        success:true,
        message:"Welcome to the home page"
    });
});

//create book
exports.createBook=bigPromise(async(req,res,next)=>{

    const{title, author, genre, year, pages, publisher}=req.body;
    if(!title || !author || !genre || !year || !pages || !publisher){
        return next(new customError("Please provide all the required fields", 400));
    }
    const newBook=new bookModel({
        title, author, genre, year, pages, publisher
    });
    //console.log(newBook);
    const book=await newBook.save();
    res.status(201).json({
        success:true,
        data:book
    });

});


// get book by id
// route: /api/books/:id
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json({ data: book });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching book by ID' });
  }
};

exports.getBooksByQuery = async (req, res) => {
  try {
    const { title, author, genre, year, publisher } = req.query;
    const filter = {};

    // Build filter dynamically if query parameters exist
    if (title) filter.title = { $regex: title, $options: 'i' };
    if (author) filter.author = { $regex: author, $options: 'i' };
    if (genre) filter.genre = { $regex: genre, $options: 'i' };
    if (year) filter.year = year;
    if (publisher) filter.publisher = publisher;

    const books = await Book.find(filter);
    
    res.status(200).json({
      success: true,
      count: books.length,
      data: books
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};



// Update book
exports.updateBook = bigPromise(async (req, res, next) => {
    try {
      const bookId = req.params.id;
      const { title, author, genre, year, pages, publisher } = req.body;
  
      if (!bookId) {
        return next(new customError("Please provide book id", 400));
      }
      if (!title || !author || !genre || !year || !pages || !publisher) {
        return next(new customError("Please provide all the required fields", 400));
      }
  
      const updatedBook = await bookModel.findByIdAndUpdate(bookId, req.body, {
        new: true,
        runValidators: true,
      });
  
      if (!updatedBook) {
        return next(new customError(`Book with id ${req.params.id} not found`, 404));
      }
  
      res.status(200).json({
        success: true,
        data: updatedBook,
      });
    } catch (error) {
      if (error.name === "MongoError" && error.code === 11000) {
        // Duplicate key error handling for title field
        return next(
          new customError("A book with the same title already exists.", 400)
        );
      } else {
        // Handle other errors or rethrow this error
        console.error('Error during update:', error);
        return next(error);
      }
    }
  });
  


//delete book
exports.deleteBook=bigPromise(async(req,res,next)=>{
    const bookId=req.params.id;
    if(!bookId){
        return next(new customError("Please provide book id", 400));
    }
    const deletedBook=await bookModel.findByIdAndDelete(bookId);
    if(!deletedBook){
        return next(new customError(`Book with id ${req.params.id} not found`, 404));
    }
    res.status(200).json({
        message:`Book with id ${req.params.id} deleted successfully`,
        success:true,
    });
});


//add a new student
exports.addStudent=bigPromise(async(req,res,next)=>{

  const{username, email, sic, password}=req.body;
  if(!username || !email || !sic || !password){
      return next(new customError("Please provide all the required fields", 400));
  }

  //can use .create() dierctly or Create new then save.
  const stud = await studModel.create({ username, email, sic, password });
  // const newStud=new studModel({
  //   username, email, sic, password,
  // });
  // //console.log(newStud);
  // const stud=await newStud.save();
  res.status(201).json({
      success:true,
      data:stud
  });
});

//get all students
exports.getAllStuds=bigPromise(async(req,res,next)=>{
  const stud=await studModel.find();
  res.status(200).json({
      success:true,
      count:stud.length,
      data:stud
  });
});

//login existing student
exports.loginStudent = bigPromise(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new customError("Please provide email and password", 400));
  }

  const user = await studModel.findOne({ email });

  if (!user || user.password !== password) {
    return next(new customError("Invalid credentials", 401));
  }

  // optionally: generate and return a token here

  res.status(200).json({
    success: true,
    message: "Login successful",
    user,
  });
});
