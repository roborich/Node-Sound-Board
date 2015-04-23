var jade = require('jade');

exports.home = function(req, res){
	var page_options = {};
	page_options.homepage = true;
	res.render('boilerplate', page_options);
};
