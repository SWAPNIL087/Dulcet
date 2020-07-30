
let carts = document.querySelectorAll('.add-cart');
let products = [
{
	name:"JUMBOGUITAR 1",
	tag:"jumboguitar1",
	price:150,
	incart:0

},
{
	name:"JUMBOGUITAR 2",
	tag:"jumboguitar2",
	price:120,
	incart:0

},
{
	name:"JUMBOGUITAR 3",
	tag:"jumboguitar3",
	price:135,
	incart:0

},
{
	name:"JUMBOGUITAR 4",
	tag:"jumboguitar4",
	price:100,
	incart:0

},
{
	name:"JUMBOGUITAR 5",
	tag:"jumboguitar5",
	price:90,
	incart:0

},
]


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