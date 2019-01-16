const express =require('express');
const hbs=require('hbs');
const fs=require('fs');

const port =process.env.PORT || 3000 ;

//  const {PORT = 3000} = process.env; //ES6


var app= express();

hbs.registerPartials(__dirname +'/views/partials');
app.set('view engine','hbs');

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


hbs.registerHelper('getCurrentYear',()=>{

  return new Date().getFullYear()
});

hbs.registerHelper('showtext',(text)=>{
  return text.toUpperCase();
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

app.listen(port,()=>
{
  console.log(`port ${port}`);
});
