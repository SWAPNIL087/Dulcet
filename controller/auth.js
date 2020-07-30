const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = mysql.createConnection({
	host: process.env.d_h,
	user: process.env.d_u,
	password: process.env.d_p,
	database: process.env.d
});

exports.index = function(req,res){
	console.log(req.body);

	/*const name = req.body.name;
	const password = req.body.password;*/
	//works same
	const {name,password} = req.body;

	db.query("SELECT name FROM login WHERE name = ?",[name],async (error,result) => {
		if(error) {
			console.log(error);
		}
		if(result.length > 0){
			return res.render('index',{
				message:'name has already been registered!'
			})
			
		}

		


		db.query("INSERT INTO login SET ?",{name: name, password: password},function(error,results){
			if(error){
				console.log(error);
			}
			else{
				return res.render('index',{
					message:'name registered!'
				})
			}
		})



	})

	
}