var isRealString = (str) => {
  return typeof str === 'string' && str.trim().length > 0;
};

var isMatchPassword = (str) => {
  // console.log(str);
  return (str == "livegame123");
};

module.exports = {
  isRealString,
isMatchPassword
};
