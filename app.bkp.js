const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');



// BlogPost Model
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const BlogPost = new Schema({
  author: ObjectId,
  title: String,
  body: String,
  date: Date
});



// Mongo DB Connection
mongoose.connect('mongodb://127.0.0.1:27017/test')
  .then(() => console.log('Connected!'));


// the following code examples can be pasted here...
const Post = mongoose.model('BlogPost', BlogPost);

// const post1 = new Post({
//   title: "My first Post",
//   body: "The body of the first Post",
//   date: new Date()
// });

// post1.save();

// Post.find({}).then((posts) => {
//   console.log(posts)
// })



// Post.findOne({_id: "64aac5c5179456275bf253cf"}).then((post) => {
//   console.log(post)
//   post.title = "Post2"
//   post.save()
// })

// Post.findOneAndUpdate({_id: "64aac5c5179456275bf253cf"},{ title: "Post4" })
// .then(() => console.log("ok"))


// Post.findOneAndDelete({_id: "64aac5c5179456275bf253cf"})
// .then((post) => console.log(post))

// async function getOneBlogPost(){
//   const post = await Post.find()
// }






const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
