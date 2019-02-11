var moment = require('moment');

var sendQData = (doc)=>{
  return
  {
//     "quest_no":doc.quest_no,
//     "opt_a":doc.opt_a,
// "opt_b":doc.opt_b,
// "opt_c":doc.opt_c,
// "opt_d"  :doc.opt_d,
// "next_page":doc.next_page
doc
  }
};
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
  sendPageNo,
  sendQData

};
