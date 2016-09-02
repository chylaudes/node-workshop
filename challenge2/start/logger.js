// TO DO: expose a function called "info" which prints the date and a logging string.
exports.info = function(msg){
  console.log( new Date()+ ':' + msg);
};
//

exports.error = function(msg){
  console.error(msg);
};
