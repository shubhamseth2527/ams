var checksum = require('../app/models/checksum');
module.exports = function (app) {
   app.get('/pgredirect', function(req,res){
        console.log("in pgredirect");
        res.render('pgredirect.ejs');
    });
};