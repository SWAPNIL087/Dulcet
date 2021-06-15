fetch('data.json').then(response => {
          //console.log(response);
          return response.json();
        }).then(data => {
          // Work with JSON data here
          products= data;
          console.log(products)
          JSON.stringify(products)
          console.log("keyaa>>><??")
          for (let i=0;i<products.length;i++){
          	console.log("somethingg")
          	console.log(`cart`+(i+1)+``)
          document.getElementById("productlist").innerHTML+= `
			<div class="image">

		<img src=`+products[i].image+` height="250px" width="165px">
		<div class="hidenseek">
			<a class="add-cart cart`+(i+1)+`" href="#" >
				<i class="fa fa-cart-plus" style="color: white;margin:auto;" aria-hidden="true"></i>
				<h5 style="color: white;">Jumbo Guitar `+(i+1)+`</h5>
				<center><h5 style="color: white;">rs `+products[i].price+`00/-</h5></center>
			</a>
		</div>
	</div>
			`
		}
        }).catch(err => {
          // Do something for an error here

          console.log("Error Reading data " + err);
        });

fetch('data.json').then(response => {
          console.log(response);
          return response.json();
        }).then(data => {
          // Work with JSON data here
          var products=""
          products=(data)
          //console.log(products)

let carts = document.querySelectorAll('.add-cart');

for (let i=0;i<carts.length; i++){
  carts[i].addEventListener('click',function(){
    cartnumbers(products[i]);
    setTimeout(function() {
		location.reload();
	}, 700);
    
  })

}


function cartnumbers(product){
	console.log("the product clicked is:",product.name);
	$.ajax({
               type: "POST",
               url: "/forcartnumber", 
               data: {
                  key: "1",
                  productname: product.name,
                  productprice: product.price,
                  productimage:product.image,
                  
               },
               
               dataType: 'json',
               success: function(data) {
                  //success condition code
               },
               error: function() {
                  //error condition code
               }
               
                
        });	
}
        }).catch(err => {
          // Do something for an error here
          console.log("Error Reading data " + err);
        });
