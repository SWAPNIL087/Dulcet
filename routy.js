const checksum_lib = require('./checksum')
const port=3030
module.exports=function(app){
		app.get('/payment',function(req,res){
			let params ={}
			params['MID'] 					= 'UlBnlB76012052438176';
			params['WEBSITE']				= 'WEBSTAGING';
			params['CHANNEL_ID']			= 'WEB';
			params['INDUSTRY_TYPE_ID']	= 'Retail';
			params['ORDER_ID']			= 'TEST_'  + new Date().getTime();
			params['CUST_ID'] 			= 'Customer001';
			params['TXN_AMOUNT']			= '1.00';
			params['CALLBACK_URL']		= 'http://localhost:'+port+'/callback';
			params['EMAIL']				= 'swaap@gmail.com';
			params['MOBILE_NO']			= '234145';

			checksum_lib.genchecksum(params, 'dRLua1Lf3gtoXznY', function (err, checksum){
				var txn_url = "https://securegw-stage.paytm.in/theia/processTransaction";

				var form_fields = "";
				for(var x in params){
					form_fields += "<input type='hidden' name='"+x+"' value='"+params[x]+"' >";
				}
				form_fields += "<input type='hidden' name='CHECKSUMHASH' value='"+checksum+"' >";

				var html = '<html><body><center><h1>Please wait! Do not refresh the page</h1></center><form method="post" action="'+txn_url+'" name="f1" >'+form_fields +'</form><script type="text/javascript">document.f1.submit()</script></body></html>'
				res.writeHead(200,{'Content-Type' : 'text/html'})
				res.write(html)
				res.end
			})
		})
	}