var moment = require('moment');

var generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: moment().valueOf()
  };
};

var sendPageNo = (page_no) => {
  return { page_no };
};

// var generateLocationMessage = (from, latitude, longitude) => {
//   return {
//     from,
//     url: `https://www.google.com/maps?q=${latitude},${longitude}`,
//     createdAt: moment().valueOf()
//   };
// };

module.exports = {
  generateMessage,
  sendPageNo

};
