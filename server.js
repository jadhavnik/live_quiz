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
app.use(bodyParser.urlencoded({ extended: false }));
//  const {PORT = 3000} = process.env; //ES6

const publicPath = path.join(__dirname, './public');
app.use(express.static(publicPath));

// hbs.registerPartials(__dirname +'/views/partials');
app.engine('hbs', hbs({extname: 'hbs',helpers: require("./public/js/helpers.js").helpers,defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/',partialsDir: __dirname + '/views/partials/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','hbs');



const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {Users} = require('./utils/users');
const {Question,Answer} = require('./models/question_answer');

const {generateMessage,sendPageNo,sendQData} = require('./utils/message');
const {isRealString,isMatchPassword} = require('./utils/validation');

var users = new Users();

io.on('connection',(socket)=>{


socket.on('join', (params, callback) => {
//     if (!isRealString(params.name) || !isRealString(params.room)) {
//       return callback('Name and password name are required.');
//     }
// if(!isMatchPassword(params.room))
// {
//   return callback('Please enter correct passowrd');
// }
    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);
    console.log(`${ params.name} connected`);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
    callback();
    });



socket.on('message', function(message, ackCallback)
{
console.log("server received message", message);
var result={};
var check;
var question_to_send;
var get_user_data={};
question_to_send=1;

var user_data =users.getUser(socket.id);

    socket.on('getQuestionNo', (get_data) =>
    {
    // console.log("1:",get_data.page);
    var query_for_q={ quest_no: get_data.page };
    // if(get_data.question == 1)
    // {
    //   //do nothing
    // }else {
      Question.find(query_for_q)
          .then(function(doc)
          {
          console.log("2:",doc);
              io.to(user_data.room).emit('GetQuestionData',{data:doc});
          });
    // }


            var query_for_a={ question: get_data.question };
                Answer.find(query_for_a).then (function(doc)
                {
                  // console.log("answer :",doc[0].answer);
                  // console.log("message :",message);
                  check = doc[0].answer === message ? true : false;
                  console.log(check);
                      setTimeout(()=>
                      {
                          if(message != null){
                              if(doc[0].answer == message)
                                {
                                  // Answer.updateOne({question: 1}, { $inc: { count_ans: 1 } }, {upsert: true}, function(err){
                                  // console.log(err);
                                  // });
                                  get_user_data = users.setAnswer(socket.id,1,"yes");
                                  console.log(get_user_data.answer);
                                    function x()
                                    {
                                      var promise = new Promise(function(resolve, reject)
                                      {
                                        setTimeout(function()
                                          {
                                            var result={};
                                            result.count_answer = users.getYesCount(1);
                                            result.right_answer = "Your answr is right";
                                            resolve(result);
                                          },3000);
                                        });
                                        return promise;
                                      }

                                      x().then(function(result)
                                      {
                                        ackCallback(result);
                                        console.log("server sending back result : ", result);
                                      });
                                    }
                                    else
                                    {
                                      // var get_user_data = users.setAnswer(id,1,"no");
                                      // result.count_ans =0;
                                        result.count_answer = users.getNoCount(1);
                                        result.right_answer = "Your answer is wrong";
                                        console.log("server sending back result : ", result);
                                        ackCallback(result);
                                      }
                                    }
                                  }, 6000);
                                });
                              });
                            });


socket.on('disconnect',()=>{
  console.log('User was disconnected');
  var user = users.removeUser(socket.id);

  if (user) {
    io.to(user.room).emit('updateUserList', users.getUserList(user.room));
    io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
  }
});

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

app.get('/quiz/:id/', (req, res) =>{

  var query={ quest_no: req.params.id };

  Question.find(query)
      .then (function(doc){
          res.render('quiz',{items:doc});
        });

  // res.render('/');
});

app.get('/index', (req, res) =>{
  res.render('admin_ques');
});

app.get('/welcome', (req, res) =>{
  res.render('welcome');
});


app.post('/insert_ques', (req, res) =>{

  var question = new Question({
    quest_no:req.body.quest_no,
    ques: req.body.question,
opt_a: req.body.option_a,
opt_b: req.body.option_b,
opt_c: req.body.option_c,
opt_d: req.body.option_d,
next_page:req.body.page_no
  });

  question.save();
  res.redirect('index');
});

app.post('/insert_ans', (req, res) =>{

  var answer = new Answer({
    question: req.body.question,
answer: req.body.answer
  });

  answer.save();
  res.redirect('index');
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

app.get('/home',(req,res) => {
res.render('home');
});

app.get('/get_question_data', (req, res) => {

  var query={ quest_no: 1 };

  Question.find(query)
      .then (function(doc){
          res.render('/',{items:doc});
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

// app.get('/bad',(req,res)=>{
//
//   res.send({
// errMsg:'this is err'
//   });
// });

// app.get('/about',(req,res)=>{
// res.render('about',{
//   pageTitle:'about page'
//   //currentYear:new Date().getFullYear()
// });
// });

// app.get('/',(req,res)=>{
// res.render('home',{
//   pageTitle:'home page',
//   welcomeMsg:'hi'
//   //currentYear:new Date().getFullYear()
//
// });
// });

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
