// const MongoClient =require('mongodb').MongoClient;
const {MongoClient,ObjectID}=require('mongodb');

var obj =new ObjectID();
console.log(obj);
// var user={name:"nikhil",age:25};
// var {name}=user;
// console.log(name);

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
if(err){
return console.log('unable to connect to mo');
}


// db.collection('Todos').insertOne({
// _id:new ObjectID(),
//   text:'something todo',
//   completed:false
// },(ree,result)=>
// {
// if(err){   return console.log("unable to insert",err);}
// console.log(result.ops[0]._id.getTimestamp());
// });

console.log('connected');
db.close();
});
