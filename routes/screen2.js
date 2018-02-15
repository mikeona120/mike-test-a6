
/*
 * GET home page.
 */

var data = require('../data.json');

exports.view = function(req, res){
  res.render('screen2', data);
};
