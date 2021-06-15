
var btn1 = document.getElementById("btn1");
/*console.log("cheers");*/


btn1.addEventListener("click",function(){
	/*console.log("cheers");*/
	var request = new XMLHttpRequest();
	request.open('GET','../register');
	request.onload = function(){
		document.getElementById("container1").innerHTML = request.responseText;

	}
	request.send();

 })
var btn2 = document.getElementById("btn2");
/*console.log("cheers");*/


btn2.addEventListener("click",function(){
	/*console.log("cheers");*/
	var request = new XMLHttpRequest();
	request.open('GET','../login');
	request.onload = function(){
		document.getElementById("container2").innerHTML = request.responseText;

	}
	request.send();

 })

function send_data(){
	var name = document.getElementById("name").value;
	var password = document.getElementById("password").value;

	var httpr = new XMLHttpRequest();
	httpr.open("POST","../index",true);
	httpr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	 httpr.onreadystatechange = function(){
	 if(httpr.readyState==4 && httpr.status==200){
	 	document.getElementById("response").innerHTML=httpr.responseText;

	 }
}

httpr.send("name="+name+"&password="+password);
}



