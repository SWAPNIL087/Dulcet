const express = require('express');
const app = express();
const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({path: './.env'});

const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'gta@fck/100',
	database: 'database',
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

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
