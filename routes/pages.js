const express =  require('express');
const app = express();
const mysql = require('mysql');
var nodemailer = require('nodemailer');

let mailTransporter = nodemailer.createTransport({ 
    service: 'gmail', 
    auth: { 
        user: 'swapniltiwari087@gmail.com', 
        pass: 'psxhwhjsfqpwzibe'
    } 
}); 

const db = mysql.createConnection({
	host: process.env.d_h,
	user: process.env.d_u,
	password: process.env.d_p,
	database: process.env.d
});
const router = express.Router();


/*make sure to delete it in the end*/
router.get('/home',function(req,res){
	res.render('home')
})

/*router.get('/jumbo-acoustic',function(req,res){

				res.render('jumbo-acoustic',{cartno:thefinalcartnumber})
			})*/

router.get('/cart',function(req,res){
				
				res.render('cart',{cartno:thefinalcartnumber})


			})
/*uptill here delete*/
router.get('/index',function(req,res){
	res.render('index')
})
router.get('/register',function(req,res){
	res.render('register')
})

router.get('/checkout',function(req,res){
	res.render('checkout',{total:"bhag be"})
	
})
router.get('/login',function(req,res){
	res.render('login')
})

var aut  = false;
var username = ""
router.post('/',function(req,res){
	console.log(req.body);
	/*const name = req.body.name;
	const password = req.body.password;*/
	//works same
	const {name,password} = req.body;
	console.log(name);
	
	
	db.query("SELECT name FROM login WHERE name = ?",[name],async (error,result) => {
		if(error) {
			console.log(error);
		}
		if(result.length > 0){
			return res.send(
			'<h3 style="color:#cc0000;background-color: #ff9999;border-radius:15px;"><center>Name has already been registered!</center><h3>'
			)			
		}
		if(name.length>0 && password.length>0) {
		db.query("INSERT INTO login SET ?",{name: name, password: password},function(error,results){
			if(error){
				console.log(error);
			}
			else{
								db.query("CREATE TABLE `database`."+ name +" ( `productincart` VARCHAR(10000) NOT NULL , `cartnumber` INT(100) NOT NULL , `carttotal` INT(100) NOT NULL , `image` VARCHAR(10000) NOT NULL , `prize` VARCHAR(100000) NOT NULL) ENGINE = InnoDB;")
				return res.send(

			'<h3 style="color:#006622;background-color: #33ff77;border-radius:15px;"><center>Name registered!,Please Login To Continue.</center><h3>'
			)
		
			}
		})
												}
		if(name.length==0 || password.length==0){
			return res.send(
          '<h3 style="color:#cc0000;background-color: #ff9999;border-radius:15px;"><center>name or password cannot be empty!!</center><h3>'
				)
		}
	})
})

router.post('/index',function(req,res){
	const{name} = req.body;
	username = name;
	cartnoarray = [];
	console.log(username)
	 db.query("SELECT cartnumber FROM "+username+"",async (error,result) => {
		if(error) {
			console.log(error);
		}
		else{
			setTimeout(function() {
				//console.log(result);
				for (var i =0;i<result.length;i++){
					cartnoarray.push(parseInt(result[i].cartnumber))
				}	
				console.log(cartnoarray)
				var sum = cartnoarray.reduce(function(a, b){
       			 return a + b;
    			}, 0);
    				
   				 console.log(sum);
   				 thefinalcartnumber = sum;
   				 


			}, 10);
			
		}
	});
	 router.get('/jumbo-acoustic',function(req,res){

				res.render('jumbo-acoustic',{cartno:thefinalcartnumber})
			});

	


	
	try{
		const {name , password } = req.body;
	    if(name.length==0 || password.length==0){
	    	return res.render('index',{
				message:'name or password field cannot be left empty!,please try again!'
			})
	    }
	    else{
	    db.query('SELECT * FROM login where name = ? AND password = ?',[name,password],function(error,result,fields){
	    	
	    	if(result.length > 0){

	    		res.render('home');
	    		router.get('/jumbo-acoustic',function(req,res){
				res.render('jumbo-acoustic')})

				

	    		
	    	}
	    	else{
	    		res.render('index',{message:
                'Incorrect name or password!,please try again..'
	    			})
	    	}



	    })
}
	}catch(error){
		console.log(error)
	}

	
})
var email=""
var mobile=""

const checksum_lib = require('../checksum')
const port=3030

var arr=[]
 
var thefinalcartnumber = 0;
router.post('/anyurl',function(req,res){
		arr=[]
		const{key} = req.body
		arr.push(key);
		console.log(arr)})

		router.post('/payments',function(req,res){
			
			console.log(arr)
			//console.log(req.body)
			const{name,email,mobile,address}=req.body
			array ='customer_name : '+name+'address : '+address+'mobile_number : '+mobile

			
	router.get('/payment',function(req,res){
			let params ={}
			params['MID'] 					= 'UlBnlB76012052438176';
			params['WEBSITE']				= 'WEBSTAGING';
			params['CHANNEL_ID']			= 'WEB';
			params['INDUSTRY_TYPE_ID']		= 'Retail';
			params['ORDER_ID']				= 'TEST_'  + new Date().getTime();
			params['CUST_ID'] 				= 'Customer001';
			params['TXN_AMOUNT']			= arr[0];
			params['CALLBACK_URL']			= 'http://localhost:'+port+'/callback';
			params['EMAIL']					= email;
			params['MOBILE_NO']				= mobile;

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
				res.end;

			})
		})
	console.log(arr)
	let mailDetails = { 
    from: 'swapniltiwari087@gmail.com', 
    to: 'swapniltiwari2524@gmail.com', 
    subject: 'Test mail', 
    text: array
}; 
//add the condition when payment is succesful then only send email..
	/*if(){*/
			mailTransporter.sendMail(mailDetails, function(err, data) { 
    if(err) { 
        throw err; 
    } else { 
        console.log('Email sent successfully'); 
    } 
	});/*}*/
	res.redirect('/payment');
	
})
console.log(username);
		
//for cart management//========================================================


router.post('/forcartnumber',function(req,res){
	var cartnoarray = [];
	const{key,productname} = req.body;

	var initialcartnumber = 0;
	db.query("SELECT productincart FROM "+username+" WHERE productincart = ?",[productname],async (error,result) => {
		if(error) {
			console.log(error);
		}
		if(result.length > 0){
//========================
			db.query("SELECT cartnumber FROM "+username+" WHERE productincart = ?",[productname],async (error,result) => {
		if(error) {
			console.log(error);
		}
		else{
			
			 initialcartnumber = parseInt(result[0].cartnumber)+1;
			 console.log(initialcartnumber);
			 /*setTimeout(function() {
				console.log(result);
				console.log( parseInt(result[0].cartnumber))
				for(var i; i<result.length ; i++){
				 cartnoarray.push( parseInt(result[i].cartnumber))
				}
				console.log(cartnoarray);


			}, 10);*/
			 

		}
	})
//============================
			
			
			function callme(){
				db.query("UPDATE "+username+" SET cartnumber = ? WHERE productincart = ?",[initialcartnumber,productname],function(error,results){
			if(error){
				console.log(error);

			}
			else{
//**********************************

			setTimeout(function() {
				db.query("SELECT cartnumber FROM "+username+"",function(err,result){
					if(error){
						console.log(error);
					}
					else{
						for (var i =0;i<result.length;i++){
					cartnoarray.push(parseInt(result[i].cartnumber))
				}	
				console.log(cartnoarray)
				var sum = cartnoarray.reduce(function(a, b){
       			 return a + b;
    			}, 0);
    				
   				 console.log(sum);
   				 thefinalcartnumber = sum;

						//console.log(result);
					}
				})
				
			
			}, 10);
			
			}

			})
			}
			//**update**//
			setTimeout(callme,100);

			
			
			
			//******
		}
//=============================
//for new clicks
		else{
			var one = Number('1')
			db.query("INSERT INTO "+ username+" SET ?",{productincart:productname,cartnumber:one,carttotal:0},function(error,results){
			if(error){
				console.log(error);
					 }
			
			
		                 })
			 db.query("SELECT cartnumber FROM "+username+"",async (error,result) => {
		if(error) {
			console.log(error);
		}
		else{
			setTimeout(function() {
				//console.log(result);
				for (var i =0;i<result.length;i++){
					cartnoarray.push(parseInt(result[i].cartnumber))
				}	
				console.log(cartnoarray)
				var sum = cartnoarray.reduce(function(a, b){
       			 return a + b;
    			}, 0);
    				
   				 console.log(sum);
   				 thefinalcartnumber = sum;
   				 


			}, 10);
			
		}
	})
			
            }

           

	})


	
	

})
module.exports = router;