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

socket.on('nextQuestion', function (data) {


countdown(data);


var seconds = 3;

function countdown(data) {
  console.log(data.page_no);
    seconds = seconds - 1;
    if (seconds < 0) {
        // Chnage your redirection link here
          window.location = "/" + data.page_no;
    } else {
        // Update remaining seconds
        // document.getElementById("countdown").innerHTML = seconds;
        // Count down using javascript
        window.setTimeout("countdown()", 1000);
    }
}

});



// Run countdown function





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
