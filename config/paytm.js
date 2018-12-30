'use strict';
var PAYTM_STAG_URL = 'https://pguat.paytm.com';
var PAYTM_PROD_URL = 'https://secure.paytm.in';
var MID = 'wvxGKq03614769671661';
var PAYTM_MERCHANT_KEY = 'zdRrJ5d2tRy!Wla#';
var PAYTM_ENVIORMENT = 'TEST';   // PROD FOR PRODUCTIONvar PAYTM_MERCHANT_KEY = 'WdMiB&MRU!j%PixV';

var WEBSITE = 'TEST DATA';
var CHANNEL_ID =  'APP_DEBUG=1';
var INDUSTRY_TYPE_ID = 'Developer';
var PAYTM_FINAL_URL = '';
var TXNDATE = new Date().toDateString();
   
console.log(TXNDATE);
if (PAYTM_ENVIORMENT== 'TEST') {
  PAYTM_FINAL_URL = 'https://securegw-stage.paytm.in/merchant-status/getTxnStatus';
}else{
  PAYTM_FINAL_URL = 'https://securegw-stage.paytm.in/merchant-status/getTxnStatus';
}

module.exports = {
    MID: MID,
    PAYTM_MERCHANT_KEY :PAYTM_MERCHANT_KEY,
    PAYTM_FINAL_URL :PAYTM_FINAL_URL,
    WEBSITE: WEBSITE,
    CHANNEL_ID: CHANNEL_ID,
    INDUSTRY_TYPE_ID: INDUSTRY_TYPE_ID,
    TXNDATE: TXNDATE,
};