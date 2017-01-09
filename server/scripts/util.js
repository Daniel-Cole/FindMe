function checkBody(req, required) {
  var errors = [];
  for (i = 0; i < required.length; i++) {
    if(!req.body.hasOwnProperty(required[i])){
      errors.push(required[i]+" is a required field.");
    }
  }
  return errors;
};

function createErrorMessage(){

}

var utils = {
    checkBody: checkBody,
    createErrorMessage: createErrorMessage
};

global.utils = utils

module.exports = global.utils