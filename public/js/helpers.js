var register = function(Handlebars) {
  var helpers = {
    // put all of your helpers inside this object
    getCurrentYear: function(){
        return new Date().getFullYear();
    },
    showtext: function(text){
      //var upperCaseusername = text.toUpperCase();
        return text.toUpperCase();
    }
  };

  if (Handlebars && typeof Handlebars.registerHelper === "function") {
    // register helpers
    for (var prop in helpers) {
        Handlebars.registerHelper(prop, helpers[prop]);
    }
  } else {
      // just return helpers object if we can't register helpers here
      return helpers;
  }

};

module.exports.register = register;
module.exports.helpers = register(null);
