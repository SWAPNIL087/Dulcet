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

router.post('/grabit',function(req,res){
	/*const{pname} = req.body;
	console.log(pname);
*/console.log("reached?")
	
let fs = require('fs')
	/*file = fs.readFileSync("./public/data.json","utf-8");

	tem = JSON.parse(file)*/
	/*var index = tem.findIndex(x => x.name == pname);
	if(index!== undefined) tem.splice(index,1);*/
	console.log(req.body);
	var file = JSON.parse(JSON.stringify(req.body));
	xy=(Object.values(file));

	/*var util = require('util');
	console.log(util.inspect(file))*/
	fs.writeFileSync("./public/data.json",'[',"utf-8");
	fs.appendFile("./public/data.json",xy,(err)=>{
		if(err){
			console.log(err);
		}
	});
	setTimeout(function() {
		fs.appendFile("./public/data.json","]",(err)=>{
		if(err){
			console.log(err);
		}
	})	
	}, 10);
	
	
	/*console.log(file);*/
	res.redirect('/index')

})
router.get('/home',function(req,res){
	setTimeout(function() {
		if(username  === "swapnil"){
			router.get('/admin',function(req,resss){
				resss.render('admin')
				
			})
			res.render('home',{key:"Admin`"})
		}
		else{
			console.log("nope")
			res.render('home')
		}
		}, 10);
})
router.get('/cart',function(req,res){

	db.query("SELECT * FROM "+username+"",async (error,result) => {
		if(error) {
			console.log(error);
		}
		else{
			db.query("SELECT SUM(carttotal) AS overall FROM "+username+"",async(err,result2)=>{
			result.stringify = JSON.stringify(result);
			//var string = JSON.stringify(result2);
			console.log(result2)
			//console.log(result.stringify)
			//console.log(string)
			
		db.query("SELECT * FROM "+username+"",async (error,resultf) => {
					if(error){
						console.log(error)
					}
					else{
						console.log(resultf,"finalllleeeeeeeeeeee")
						db.query("SELECT SUM(cartnumber) AS uwish FROM "+username+"",async(err,re)=>{
				if(err){
					console.log(err)

				}
				else{
					console.log(re)
					
					uwish=(parseInt(re[0].uwish))
				}
			})
				setTimeout(function() {
				res.render('cart',{cartno:uwish,result:resultf,all:result2});
			}, 10);
					}
				})	

			
		})
		}
	})
			})
/*uptill here delete*/
router.get('/index',function(req,res){
	res.render('index')
})
router.get('/register',function(req,res){
	res.render('register')
})

router.get('/checkout',function(req,res){
	//add here the total from database and send it to the client side
	db.query("SELECT * FROM "+username+"",async (error,result) => {
		if(error) {
			console.log(error);
		}
		else{
			db.query("SELECT SUM(carttotal) AS overall FROM "+username+"",async(err,result2)=>{
			result.stringify = JSON.stringify(result);
			//var string = JSON.stringify(result2);
			console.log(result2)
			console.log(result2[0].overall,"///////////////////////////////////////////////////")
			//console.log(result.stringify)
			//console.log(string)
			
		db.query("SELECT * FROM "+username+"",async (error,resultf) => {
					if(error){
						console.log(error)
					}
					else{
						console.log(resultf,"finall")
						db.query("SELECT SUM(cartnumber) AS uwish FROM "+username+"",async(err,re)=>{
				if(err){
					console.log(err)

				}
				else{
					console.log(re)
					
					uwish=(parseInt(re[0].uwish))
				}
			})
				setTimeout(function() {
				res.render('checkout',{cartno:uwish,result:resultf,all:result2});
			}, 10);
					}
				})	

			
		})
		}
	})
	
	
})
router.get('/login',function(req,res){
	res.render('login')
})
var aut  = false;
var username = ""
router.post('/',function(req,res){
	console.log(req.body);
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
								db.query("CREATE TABLE `database`."+ name +" (`productincart` VARCHAR(10000) NOT NULL , `cartnumber` INT(100) NOT NULL , `carttotal` INT(100) NOT NULL , `image` VARCHAR(10000) NOT NULL , `prize` TEXT(100000) NOT NULL) ENGINE = InnoDB;")
				return res.send(

			'<h3 style="color:#006622;background-color: #33ff77;border-radius:15px;"><center>Name registered!,Please Login To Continue.</center><h3>'
			)
			}
		})										}
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

	
	 
	 router.get('/jumbo-acoustic',function(req,res){

	 		db.query("SELECT SUM(cartnumber) AS hadippa FROM "+username+"",async (error,result) => {
		if(error) {
			console.log(error);
		}
		else{
			
				console.log(parseInt(result[0].hadippa))
				thefinalcartnumber = parseInt(result[0].hadippa)
			
		}
	});			setTimeout(function() {
		res.render('jumbo-acoustic',{cartno:thefinalcartnumber})
	}, 10);
				
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
	    		
	    		setTimeout(function() {
		if(name  === "swapnil"){
			router.get('/admin',function(req,resss){
				resss.render('admin')
				
			})
			res.render('home',{key:"Admin`"})
		}
		else{
			console.log("nope")
			res.render('home')
		}
		}, 10);
	    			
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
		//console.log('??????????????????????????????????????????????????????????')
		arr=[]
		const{key} = req.body
		arr.push(key);
		console.log(arr,"right here!!!!")   })
		router.post('/payments',function(req,res){
			//console.log(arr)
			//console.log(req.body)
			const{name,email,mobile,address}=req.body
			console.log("what is undefined tell me")
			array ='customer_name : '+name+'address : '+address+'mobile_number : '+mobile	
			var realkey=""
		db.query("SELECT * FROM "+username+"",async (error,result) => {
		if(error) {
			console.log(error);
		}
		else{
			db.query("SELECT SUM(carttotal) AS overall FROM "+username+"",async(err,result2)=>{
			result.stringify = JSON.stringify(result);
			//var string = JSON.stringify(result2);
			console.log(result2)
			console.log(result2[0].overall,"????????????????????????????????????????")	
			realkey=result2[0].overall
		  
	
	router.get('/payment',function(req,res){
			let params ={}
			params['MID'] 					= 'UlBnlB76012052438176';
			params['WEBSITE']				= 'WEBSTAGING';
			params['CHANNEL_ID']			= 'WEB';
			params['INDUSTRY_TYPE_ID']		= 'Retail';
			params['ORDER_ID']				= 'TEST_'  + new Date().getTime();
			params['CUST_ID'] 				= 'Customer001';
			params['TXN_AMOUNT']			= realkey +'00';
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
		})}) }  })
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
	const{key,productname,productprice,productimage} = req.body;

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
				setTimeout(function() {
					db.query("UPDATE "+username+" SET carttotal = ? WHERE productincart = ?",[initialcartnumber*productprice,productname],function(error,results){
			if(error){
				console.log(error);
			}  });	
				}, 25);
			}
			//**update**//
			setTimeout(callme,100);
			//******
		}
//=============================
//for new clicks
		else{
			var one = Number('1')
			db.query("INSERT INTO "+ username+" SET ?",{productincart:productname,cartnumber:one,carttotal:productprice,image:productimage,prize:productprice},function(error,results){
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
//applying function to the buttons in cart here*
 //delete button \::
 router.post('/trash',function(req,res){
 	const{key} = req.body;
 	console.log(key);
 	db.query("SELECT cartnumber FROM "+username+" WHERE productincart = "+"'"+key+"'"+"",async(error,result)=>{
 		if(error){
 			console.log(error);
 		}
 		else{
 			console.log(parseInt(result[0].cartnumber))
 			thefinalcartnumber = thefinalcartnumber - parseInt(result[0].cartnumber);
 		}
 	})
 	
 		db.query("DELETE FROM "+username+" WHERE productincart = "+"'"+key+"'"+"",async(error,result)=>{
 		if(error){
 			console.log(error)
 		}

 	})
 	
 	
 	res.redirect('/cart')
 })
//decrease button function://
let keyholder=''
 router.post('/decrease',function(req,res){
 	const{key} = req.body;
 	let initialcartnumber=''
 	let productprice = ''


 	db.query("SELECT cartnumber FROM "+username+" WHERE productincart = "+"'"+key+"'"+"",async(error,result)=>{
 		if(error){
 			console.log(error)
 		}
 		else{

 			keyholder=key;
 			let pass=(parseInt(result[0].cartnumber));
 	setTimeout(function() {db.query("SELECT * FROM "+username+" WHERE productincart = "+"'"+key+"'"+"",async(error,result)=>{
 		if(error){console.log(error);}
 		else{
 			initialcartnumber = parseInt(result[0].cartnumber);
			productprice = parseInt(result[0].prize);
			////////
				db.query("UPDATE "+username+" SET carttotal = ? WHERE productincart = ?",[initialcartnumber*productprice,keyholder],function(error,results){
				if(error){
					console.log(error);
				}
				else{
					console.log(results,"hererh please pay attention here i doubt theres something wron")
					console.log(result,"aha")
				}
					})

 		}
 })}, 100);
 
 				if(pass>1){
 				db.query("UPDATE "+username+" SET cartnumber = ? WHERE productincart = ?",[pass-1,key],function(error,results){
 					if(error){
 						console.log(error);
 					}
 					else{
 						//console.log(results,"batao to sahhi kaha ho iss bhid me")
 					}
 				})

 				/////try here freshly
 							}
 					
 		}
 	})
 	
 	res.redirect('/cart')
 })

 //increase button function://
let keyhold=''
 router.post('/increase',function(req,res){
 	const{key} = req.body;
 	let initialcartnumber=''
 	let productprice = ''


 	db.query("SELECT cartnumber FROM "+username+" WHERE productincart = "+"'"+key+"'"+"",async(error,result)=>{
 		if(error){
 			console.log(error)
 		}
 		else{

 			keyhold=key;
 			let pass=(parseInt(result[0].cartnumber));
 	setTimeout(function() {db.query("SELECT * FROM "+username+" WHERE productincart = "+"'"+key+"'"+"",async(error,result)=>{
 		if(error){console.log(error);}
 		else{
 			initialcartnumber = parseInt(result[0].cartnumber);
			productprice = parseInt(result[0].prize);
			////////
				db.query("UPDATE "+username+" SET carttotal = ? WHERE productincart = ?",[initialcartnumber*productprice,keyhold],function(error,results){
				if(error){
					console.log(error);
				}
				else{
					console.log(results,"hererh please pay attention here i doubt theres something wron")
					console.log(result,"aha")
				}
					})

 		}
 })}, 100);
 
 				
 				db.query("UPDATE "+username+" SET cartnumber = ? WHERE productincart = ?",[pass+1,key],function(error,results){
 					if(error){
 						console.log(error);
 					}
 					else{
 						//console.log(results,"batao to sahhi kaha ho iss bhid me")
 					}
 				})

 				/////try here freshly
 							
 					
 		}
 	})
 	
 	res.redirect('/cart')
 })

module.exports = router;