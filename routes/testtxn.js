var checksum = require('../app/models/checksum');
var config = require('../config/paytm');
module.exports = function (app) {
     app.get('/testtxn', function(req,res){
        console.log("in testtxn get");
         res.render('testtxn.ejs',{'config' : config});
     });
     app.post('/testtxn',function(req, res) {
        console.log("POST Order start");
        var paramlist = req.body;
        var paramarray = new Array();
        console.log(paramlist);
        for (name in paramlist)
        {
            if (name == 'PAYTM_MERCHANT_KEY') {
               var PAYTM_MERCHANT_KEY = paramlist[name] ;
            }else{
                paramarray[name] = paramlist[name] ;
            }
        }
        console.log(paramarray);
        paramarray['../config/paytm.js'] = 'http://localhost:8080/response';  // in case if you want to send callback        
        console.log(PAYTM_MERCHANT_KEY);
        checksum.genchecksum(paramarray, PAYTM_MERCHANT_KEY, function (err, result){
            console.log(result);
            res.render('pgredirect.ejs',{ 'restdata' : result });
        });
        console.log("POST Order end");
     });
};