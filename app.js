const express = require('express');
const app = express();
const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({path: './.env'});

const db = mysql.createConnection({
	host: process.env.d_h,
	user: process.env.d_u,
	password: process.env.d_p,
	database: process.env.d
})



const publicDirectory = path.join(__dirname,'./public')
app.use(express.static(publicDirectory))

app.use(express.urlencoded({extended: false}))
app.use(express.json());

app.set('view engine','hbs');

db.connect(function(err){
	if(err) throw err;
	console.log("Connected to Mysql!")

})

app.use('/',require('./routes/pages'))



/*app.use('/auth',require('./routes/server'))*/

app.listen(3000)