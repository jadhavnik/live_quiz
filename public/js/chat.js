var socket = io();

// function scrollToBottom () {
//   // Selectors
//   var messages = jQuery('#messages');
//   var newMessage = messages.children('li:last-child')
//   // Heights
//   var clientHeight = messages.prop('clientHeight');
//   var scrollTop = messages.prop('scrollTop');
//   var scrollHeight = messages.prop('scrollHeight');
//   var newMessageHeight = newMessage.innerHeight();
//   var lastMessageHeight = newMessage.prev().innerHeight();
//
//   if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
//     messages.scrollTop(scrollHeight);
//   }
// }

socket.on('connect', function () {
  var params = jQuery.deparam(window.location.search);

  socket.emit('join', params, function (err) {
    if (err) {
      alert(err);
      window.location.href = '/';
    } else {
      console.log('No error');
    }
  });
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

// socket.on('nextQuestion', function (data) {
// countdown(data);
// });

function after_27(){

  socket.emit('getQuestionNo',{
     page:document.getElementsByClassName("next_page_no")[0].innerHTML,
     question:document.getElementsByClassName("current_ques_no")[0].innerHTML

  });

  setTimeout(bar, 15000);
  setTimeout(countdown, 5000);

}


$(function() {
    var intervalID = setInterval(after_27,1000);
    setTimeout(function() {
        clearInterval(intervalID);
    }, 2000);
});

$(function() {
    var intervalID = setInterval(after_27,30000);
    setTimeout(function() {
        clearInterval(intervalID);
    }, 90000);
});



socket.on('GetQuestionData',function (message){
console.log(message.data[0].ques);
  var template = jQuery('#message-template').html();
  $("#first_content").remove();
    var html = Mustache.render(template, {
      quest_no: message.data[0].quest_no,
      ques: message.data[0].ques,
      opt_a: message.data[0].opt_a,
      opt_b: message.data[0].opt_b,
      opt_c: message.data[0].opt_c,
      opt_d: message.data[0].opt_d,
      next_page: message.data[0].next_page
    });

    jQuery('#messages').append(html);


});

// function check_questin_no()
// {
// var page=document.getElementsByClassName("next_page_no")[0].innerHTML;
// if(page > 2)
// {
//   // var intervalId = window.setInterval(checkTime, 1000);
// }else
// {
//   setTimeout(bar, 15000);
//   setTimeout(countdown, 5000);
// }
//
// }
//
//
// check_questin_no();

// function checkTime() {
//
//     var d = new Date();
//     var h = d.getHours();
//     var m = d.getMinutes();
//     var s = d.getSeconds();
//
//     if(h == 12 && m == 00 && s == 0)
//      {
// setTimeout(bar, 15000);
// setTimeout(countdown, 5000);
//        // return alert("hi");
//        // return true;
//      }
//      // return false;
// }




// var data_a;
var seconds = 10;
function countdown() {
  // console.log(data);
  // var data_a= data;
    seconds = seconds - 1;
    if (seconds < 0) {
      seconds=10;
      return;
      // window.location.href=data;
        // Chnage your redirection link here
           // window.location.href = "/" + data;
    } else {
        // Update remaining seconds
         document.getElementById("countdown").innerHTML = seconds;
        // Count down using javascript
      setTimeout(countdown, 1000);
    }
}

// function countdown() {
//
//
// for (i = 10; i >= 0 ; i--) {
//        document.getElementById("countdown").innerHTML = i;
// }
//
// }

function bar() {

    return new Promise((resolve, reject) => {
        var rate_value;
        if (document.getElementById('a').checked) {
          rate_value = document.getElementById('a').value;
        }else if(document.getElementById('b').checked)
        {
            rate_value = document.getElementById('b').value;
        }else if(document.getElementById('c').checked)
        {
            rate_value = document.getElementById('c').value;
        }else if(document.getElementById('d').checked)
        {
            rate_value = document.getElementById('d').value;
        }
// console.log(rate_value);
  console.log("client sending message",rate_value);
        socket.emit('message', rate_value, function(response) {

          var template = jQuery('#answer-template').html();
            var html = Mustache.render(template, {
              people_count: response.count_answer,
              res: response.right_answer,

            });

            jQuery('#answer').replaceWith(html);

// jQuery('#people_count').replaceWith(response.count_answer);
//           jQuery('#res').replaceWith(response.right_answer);
           console.log("client got ack response", response);
              setTimeout(() => resolve(response),11000);
            // resolve(response);
        });
    });
}



// bar().then(message => {
//    // you can use message here and only in here
//    console.log("response from bar(): ", message);
// });

// function final_redirect()
// {
//   var page=document.getElementsByClassName("next_page_no")[0].innerHTML;
//  window.location.href =  page;
// }
//   setTimeout(final_redirect, 27000);


socket.on('updateUserList', function (users) {
  var ol = jQuery('<ol></ol>');

  users.forEach(function (user) {
    ol.append(jQuery('<li></li>').text(user));
  });

  jQuery('#users').html(ol);
});

socket.on('getUserCount', function (user_count) {
  var pp = jQuery('<p></p>').text("Total Users:"+user_count);

  // users.forEach(function (user) {
  //   ol.append(jQuery('<li></li>').text(user));
  // });

  jQuery('#count_users').html(pp);
});


// socket.on('newMessage', function (message) {
//   var formattedTime = moment(message.createdAt).format('h:mm a');
//   var template = jQuery('#message-template').html();
//   var html = Mustache.render(template, {
//     text: message.text,
//     from: message.from,
//     createdAt: formattedTime
//   });
//
//   jQuery('#messages').append(html);
//   scrollToBottom();
// });
//
// socket.on('newLocationMessage', function (message) {
//   var formattedTime = moment(message.createdAt).format('h:mm a');
//   var template = jQuery('#location-message-template').html();
//   var html = Mustache.render(template, {
//     from: message.from,
//     url: message.url,
//     createdAt: formattedTime
//   });
//
//   jQuery('#messages').append(html);
//   scrollToBottom();
// });

// jQuery('#message-form').on('submit', function (e) {
//   e.preventDefault();
//
//   var messageTextbox = jQuery('[name=message]');
//
//   socket.emit('createMessage', {
//     text: messageTextbox.val()
//   }, function () {
//     messageTextbox.val('')
//   });
// });
//
// var locationButton = jQuery('#send-location');
// locationButton.on('click', function () {
//   if (!navigator.geolocation) {
//     return alert('Geolocation not supported by your browser.');
//   }
//
//   locationButton.attr('disabled', 'disabled').text('Sending location...');
//
//   navigator.geolocation.getCurrentPosition(function (position) {
//     locationButton.removeAttr('disabled').text('Send location');
//     socket.emit('createLocationMessage', {
//       latitude: position.coords.latitude,
//       longitude: position.coords.longitude
//     });
//   }, function () {
//     locationButton.removeAttr('disabled').text('Send location');
//     alert('Unable to fetch location.');
//   });
// });


// function bar(data, timeout = 10000) {
//     return new Promise((resolve, reject) => {
//         let timer;
//
//         socket.emit('message', data);
//
//         function responseHandler(message) {
//             // resolve promise with the value we got
//             resolve(message);
//             clearTimeout(timer);
//         }
//
//         socket.once('msg', responseHandler);
//
//         // set timeout so if a response is not received within a
//         // reasonable amount of time, the promise will reject
//         timer = setTimeout(() => {
//             reject(new Error("timeout waiting for msg"));
//             socket.removeListener('msg', responseHandler);
//         }, timeout);
//
//     });
// }
//
// bar().then(message => {
//    // you can use message here and only in here
// });


// https://stackoverflow.com/questions/51488022/how-to-make-javascript-execution-wait-for-socket-on-function-response#
// https://stackoverflow.com/questions/15515862/nodejsexpress-with-socketio
