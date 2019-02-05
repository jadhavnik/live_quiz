[{
  id: '/#12poiajdspfoif',
  name: 'Andrew',
  room: 'The Office Fans'
}]

const fs =require('fs');
// addUser(id, name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)

class Users {
  constructor () {
    this.users = [];
  }
  addUser (id, name, room,question,answer) {
    var user = {id, name, room,question,answer};
// var userString =fs.readFileSync('notes-date.json');
// this.users=JSON.parse(userString);
    this.users.push(user);
// fs.writeFileSync('notes-date.json',JSON.stringify(this.users));
    return user;
  }
  removeUser (id) {
    var user = this.getUser(id); //geting user data to match id at the next

    if (user) {
////////***********  Updating the user list not sending anything
      this.users = this.users.filter((user1) => user1.id !== id);

    }

    return user;   //sending single user
  }

  getUser (id) {
    return this.users.filter((user) => user.id === id)[0]
  }
  getUserList (room) {
    var users = this.users.filter((user) => user.room === room);
    var namesArray = users.map((user) => user.name);

    return namesArray;
  }

  getUserCount (room) {
    var users = this.users.filter((user) => user.room === room);
    var namesArray = users.map((user) => user.name);

    return namesArray.length;
  }

setAnswer(id,question,answer)
{
  var user = this.getUser(id);
this.removeUser(id);
  user.question = question;
  user.answer=answer;
  // var userString =fs.readFileSync('notes-date.json');
  // this.users=JSON.parse(userString);
    this.users.push(user);
fs.writeFileSync('notes-date.json',JSON.stringify(this.users));
return user;
}

getYesCount(question)
{
  var users = this.users.filter((user) => (user.question === question && user.answer === "yes" ));
  var namesArray = users.map((user) => user.name);

  return namesArray.length;
}

getNoCount(question)
{
  var users = this.users.filter((user) => (user.question === question && user.answer === "no" ));
  var namesArray = users.map((user) => user.name);

  return namesArray.length;
}
// getAnswer(room)
// {
//   var user = this.getUser(id);
//   user.question = question;
//   user.answer=answer;
// return user;
// }


}

module.exports = {Users};

 // class Person {
 //   constructor (name, age) {
 //     this.name = name;
 //     this.age = age;
 //   }
 //   getUserDescription () {
 //     return `${this.name} is ${this.age} year(s) old.`;
 //   }
 // }
 //
 // var me = new Person('Andrew', 25);
 // var description = me.getUserDescription();
 // console.log(description);
