const path=require('path');
const _ = require('lodash');
const http= require('http');
const express =require('express');
var hbs = require('express-handlebars');
const  socketIO=require('socket.io');
const bodyParser = require('body-parser');
// const hbs=require('hbs');
const fs=require('fs');

const port =process.env.PORT || 3000 ;

var app= express();
var server =http.createServer(app);
var io=socketIO(server);

app.use(bodyParser.json());
//  const {PORT = 3000} = process.env; //ES6

const publicPath = path.join(__dirname, './public');
app.use(express.static(publicPath));

// hbs.registerPartials(__dirname +'/views/partials');
app.engine('hbs', hbs({extname: 'hbs',helpers: require("./public/js/helpers.js").helpers,defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/',partialsDir: __dirname + '/views/partials/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','hbs');



const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');


io.on('connection',(socket)=>{
console.log('new user connected');
socket.on('disconnect',()=>{
  console.log('User was disconnected');
});

});



app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});


app.use((req,res,next)=>{

var now =new Date().toString();

var log =`${now} : ${req.method} ${req.url}`;

fs.appendFile('server.log',log + "\n",(err)=>{
if(err){
  console.log(err);
}
});

next();
});

// app.use((req,res,next)=>{
// res.render('maintenance');
// });

app.use(express.static(__dirname+'/public'));

// hbs.registerHelper('getCurrentYear',()=>{
//
//   return new Date().getFullYear()
// });

// hbs.registerHelper('showtext',(text)=>{
//   return text.toUpperCase();
// });

app.get('/index', (req, res) =>{
  res.render('admin_ques');
});

app.get('/home',(req,res) => {
// res.send("<h1>hello Express</h1>");
res.send({
  name:'nikhil',
  likes:[
    'paint',
    'carr'
  ]
});

});


app.get('/bad',(req,res)=>{

  res.send({
errMsg:'this is err'
  });
});

app.get('/about',(req,res)=>{
res.render('about',{
  pageTitle:'about page'
  //currentYear:new Date().getFullYear()
});
});

app.get('/',(req,res)=>{
res.render('home',{
  pageTitle:'home page',
  welcomeMsg:'hi'
  //currentYear:new Date().getFullYear()

});
});

app.get('/first',(req, res)=>{

  res.render('first_one');
});

app.get('/second',(req, res)=>{
  // callback({res.render('/second');},2000);
res.render('second_one');
});

server.listen(port,()=>
{
  console.log(`port ${port}`);
});
