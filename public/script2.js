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
    totalcost(products[i]);
  })

}

function onLoadCartNumbers(){
	let productnumbers = localStorage.getItem('cartnumbers');

	if(productnumbers){
		document.querySelector('.cart  span').textContent = productnumbers;

	}
}

function cartnumbers(product,action){
	/*console.log("the product clicked is:",product)*/
	let productnumbers = localStorage.getItem('cartnumbers');
	productnumbers = parseInt(productnumbers);

	let cartItems = localStorage.getItem('productsInCart');
	cartItems = JSON.parse(cartItems);


	if(action == 'decrease'){
		localStorage.setItem('cartnumbers', productnumbers -1)

		document.querySelector('.cart span').textContent = productnumbers -1;
	}else if(productnumbers){
		localStorage.setItem("cartnumbers",productnumbers + 1);
		document.querySelector('.cart span').textContent = productnumbers +1;


	}else{
		localStorage.setItem('cartnumbers',1);
		document.querySelector('.cart span').textContent = 1;
	}


	setItems(product);
	
}
function setItems(product){
	let cartitems  = localStorage.getItem('productsInCart');
	cartitems  = JSON.parse(cartitems);
	if(cartitems != null){
		if(cartitems[product.tag] == undefined){
			cartitems = {
				...cartitems,
				[product.tag]: product
			}
		}
		cartitems[product.tag].incart +=1;
	}
	else{
		product.incart = 1;
		cartitems = {
			[product.tag]: product
		}
	}

	localStorage.setItem("productsInCart", JSON.stringify(cartitems));
}

function totalcost(product,action){
	//console.log("the price of product is :",product.price);
	let cartCost = localStorage.getItem('totalcost');
	
	console.log("cartCost is:",cartCost);

	if(action=="decrease"){
		cartCost = parseInt(cartCost);
		localStorage.setItem('totalcost',cartCost - product.price);

	}

	else if(cartCost != null){
		cartCost = parseInt(cartCost);
		localStorage.setItem("totalcost",cartCost + product.price );
	}
	else{
		localStorage.setItem("totalcost",product.price);
	}
	
}

var totalll= localStorage.getItem('totalcost');

function  displayCart(){
	let cartitems = localStorage.getItem("productsInCart");
	cartitems = JSON.parse(cartitems);
let productContainer = document.querySelector(".products")
	let cartCost = localStorage.getItem('totalcost');
	
	console.log(cartitems);
	if(cartitems && productContainer ){
		productContainer.innerHTML = '';
		//-------------------------------------------------------
		Object.values(cartitems).map(item => {
			productContainer.innerHTML += `
			<div class="cp" style="display:flex;">
			<div class="product-title">
				<div><i class="trash fa fa-trash-o" style="font-size:36px"></i>
				<img height="80px",width="80px" src="${item.tag}.jpg"></div>
				<br>
				<span class="selector">${item.name}</span>
				<hr>
				</div>
				<div name="check" class="price">rs${item.price}00.00</div>
				<div name="check" class = "quantity">
				<i class="fa fa-arrow-circle-left decrease" style="font-size:36px"></i><span>${item.incart}</span>
				&nbsp &nbsp<i class="increase fa fa-arrow-circle-right " style="font-size:36px"></i>
				</div>
				<div name="check" class="total">
				<h6 class="total">rs${item.incart * item.price}00.00/-</h6>
				</div>
			</div>
			`
		});
		productContainer.innerHTML += `
			<div class ="basketTotalConatiner">
			<h4 class="BasketTotalTitle">
				Cart Total- &nbsp
			</h4>
			<h4 class="basketTotal">
				rs <span class="amount">${cartCost}</span>00.00 /-
			</h4>
		`
	}
	deleteButtons();
	manageQuantity();
}
function deleteButtons(){
	let deleteButtons = document.querySelectorAll('.products .trash');
	let productName;
	let productNumbers = localStorage.getItem('cartnumbers');
	let cartItems = localStorage.getItem('productsInCart');
	let cartCost = localStorage.getItem('totalcost');
	cartItems = JSON.parse(cartItems);
	
	

	for (let i =0; i<deleteButtons.length; i++){
		deleteButtons[i].addEventListener('click',function(){
			console.log("check");
			/*console.log("clicked");*/
			 productName = deleteButtons[i].parentElement.parentElement/*parentElement.querySelector('.selector')*/.textContent.trim().toLowerCase().replace(/ /g,'');
			 console.log(productName);
			 //console.log(cartItems[productName].name +" "+ cartItems[productName].incart);
			 /*console.log("number of products"+ productNumbers)*/
			localStorage.setItem('cartnumbers',productNumbers - cartItems[productName].incart);
			localStorage.setItem('totalcost',cartCost - (cartItems[productName].price * cartItems[productName].incart));

			delete cartItems[productName];
			localStorage.setItem('productsInCart',JSON.stringify(cartItems));

			displayCart();
			onLoadCartNumbers();
		})
	}
}

function manageQuantity(){
	let decreaseButtons = document.querySelectorAll('.decrease');
	let increaseButtons = document.querySelectorAll('.increase');
	let cartItems = localStorage.getItem("productsInCart");
	let currentQuantity = 0
	let currentProduct = "";
	cartItems = JSON.parse(cartItems);
	console.log(cartItems);

	for (let i =0;i<decreaseButtons.length;i++){
		decreaseButtons[i].addEventListener('click',function(){
			//console.log("decrease wokring fine!");
			currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
			//console.log(currentQuantity);
			currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.textContent.trim().toLowerCase().replace(/ /g,"" );
			console.log(currentProduct);
			if(cartItems[currentProduct].incart > 1){
				cartItems[currentProduct].incart -= 1;
				cartnumbers(cartItems[currentProduct],"decrease");
				totalcost(cartItems[currentProduct],"decrease");
			localStorage.setItem('productsInCart',JSON.stringify(cartItems));

			displayCart(); 
			location.reload()


			}

			
		})
	}
	for (let i =0;i<increaseButtons.length;i++){
		increaseButtons[i].addEventListener('click',function(){
			//console.log("increase wokring fine!");
			currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
			//console.log(currentQuantity);
			currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.textContent.trim().toLowerCase().replace(/ /g,"" );
			console.log(currentProduct);
			
			cartItems[currentProduct].incart += 1;
			cartnumbers(cartItems[currentProduct],"");
			totalcost(cartItems[currentProduct],"");
			localStorage.setItem('productsInCart',JSON.stringify(cartItems));

			displayCart(); 
			location.reload()
			

		})
	}
}

onLoadCartNumbers();
displayCart();