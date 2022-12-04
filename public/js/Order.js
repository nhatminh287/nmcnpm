
// Menu Toggle

let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation");
let main = document.querySelector(".main");

toggle.onclick = function () {
  navigation.classList.toggle("active");
  main.classList.toggle("active");
};

//Tab Toggle
var buttons = document.getElementsByClassName('tablinks');
var contents = document.getElementsByClassName('tabcontent');
function showContent(id){
    for (var i = 0; i < contents.length; i++) {
        contents[i].style.display = 'none';
    }
    var content = document.getElementById(id);
    content.style.display = 'block';
}

buttons[0].addEventListener("click", function(){
    for (var j = 0; j < buttons.length; j++) {
        buttons[j].classList.remove("active");
    }
    this.className += " active";
    showContent("client-order");
});
buttons[1].addEventListener("click", function(){
    for (var j = 0; j < buttons.length; j++) {
        buttons[j].classList.remove("active");
    }
    this.className += " active";
    showContent("history");
});


// show Add Product tab
function AddProduct(){
    showContent("product-list");
}
// Submit and return to Order tab
function ReturnToOrder(){
    showContent("client-order")
}
showContent("client-order");

// Render Product List
//Example Data
const Foods=[
    {
        name:"Rice",
        src:"../example img/rice.png",
        price: 50000
    },
    {
        name:"Flour",
        src:"../example img/flour.png",
        price:45000
    },
    {
        name:"Bread",
        src:"../example img/bread.png",
        price:20000
    },
    {
        name:"Sugar",
        src:"../example img/sugar.png",
        price:30000
    }
]
for (let food of Foods){
    var wrapper=document.createElement("div");
    wrapper.className="column";

    var img=document.createElement("img");
    img.className="input-item-img";
    img.src=food.src;

    var prd_name=document.createElement("p");
    prd_name.className="input-item-name";
    prd_name.innerHTML=food.name;
    
    var price=document.createElement("p");
    price.className="input-item-price";
    price.innerHTML=food.price;
    var currency=document.createElement("span");
    currency.innerHTML="đ";
    
    var priceInfo = document.createElement("div");
    priceInfo.className="price_info";

    priceInfo.appendChild(price);
    priceInfo.appendChild(currency);

    wrapper.appendChild(img);
    wrapper.appendChild(prd_name);
    wrapper.appendChild(priceInfo);

    document.getElementById("product-list-wrapper").appendChild(wrapper);
}

// Add product to export

var membership_checkBox = document.getElementById("check-membership");
var order_summary = document.getElementById("order-summary");
var cash_pay_btn = document.getElementById("cash-pay-btn");
var online_pay_btn = document.getElementById("online-pay-btn");
var order_total = document.getElementById("order-total");
var _discount = document.getElementById("discount");
var final_sum = document.getElementById("final-sum");

var order_list = document.getElementById("order-list");
var list_item = document.getElementsByClassName('column');

for (var j = 0; j < list_item.length; j++) {
    list_item[j].addEventListener("click", function(){
        var d=this.cloneNode(true);
        //Create Quantity input
        const ip=document.createElement("input");
        ip.type="number";
        ip.placeholder="Quantity";
        ip.value=0;
       
        //Create delete button
        const delelte_btn = document.createElement("button");
        delelte_btn.innerHTML="X";
        delelte_btn.style.width = '50px';
        delelte_btn.style.height = '43px';
        delelte_btn.addEventListener("click", function(){
            this.parentNode.parentNode.removeChild(this.parentNode);
            var check_input_item = document.getElementsByClassName('input-item');

            if(check_input_item.length === 0) {
                membership_checkBox.style.display = "none";
                order_summary.style.display = "none";
                cash_pay_btn.style.display = "none";
                online_pay_btn.style.display = "none";
                order_total.style.display = "none";
                _discount.style.display = "none";
                final_sum.style.display = "none";

                var total_1 = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(0);
                var total_2 = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(0);
                document.getElementById("order-total").innerHTML="Total: "+ total_1;
                document.getElementById("final-sum").innerHTML="Final: "+ total_2;
            }
        });
        d.className="input-item";
        d.appendChild(ip);
        d.appendChild(delelte_btn);
        order_list.appendChild(d);
        ReturnToOrder();
        var check_input_item = document.getElementsByClassName('input-item');

        if(check_input_item.length !== 0) {
            membership_checkBox.style.display = "block";
            order_summary.style.display = "block";
        }
    });
}

// Function to calculate sum money
function CalculateOrder(){
    var order = document.getElementById("order-list")
    var prices=order.getElementsByClassName("input-item-price");
    var quantity = order.getElementsByTagName("input")
    var sum=0;
    for(let i=0;i<prices.length;i++){
        sum = sum + (parseInt(prices.item(i).innerHTML) * quantity[i].value);
    }

    var total_1 = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(sum);

    document.getElementById("order-total").innerHTML="Total: "+ total_1;
    if(document.getElementById("membership-checkbox").checked==true){
        document.getElementById("discount").innerHTML="Discount: 5%";
        sum*=0.95;
    }else{
        document.getElementById("discount").innerHTML="";
    }

    var total_2 = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(sum);
    document.getElementById("final-sum").innerHTML="Final: "+ total_2;
    
    cash_pay_btn.style.display = "inline-block";
    online_pay_btn.style.display = "inline-block";
    order_total.style.display = "block";
    _discount.style.display = "block";
    final_sum.style.display = "block";
}

function HandleCashPay(){
    //Update database
    //
    document.getElementById("client-order").innerHTML="<h1>Order Successfully</h1>"
}
function HandleOnlinePay(){
    //Update database
    //
    showContent("online-payment");

    //document.getElementById("client-order").innerHTML="<h1>Order Successfully !!!</h1>";
}