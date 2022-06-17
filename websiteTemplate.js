//  Nav bar active background
var header = document.getElementById("myTopnav");
var btns = header.getElementsByClassName("nav-link");
for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function () {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
      });
  }

  window.onscroll = function() {scrollfunction()};

var navbox = document.getElementById("nav-box");
var sticky = navbox.offsetTop;

function scrollfunction() {
  if (window.pageYOffset >= sticky) {
    document.getElementById("image").style.display="none"
  } else {
    document.getElementById("image").style.display="block"
  }
}

//nav bar responsive
function responsiveToggelFunction() {
      var myTopnavBar = document.getElementById("myTopnav");
      if (myTopnavBar.className === "topnav") {
                myTopnavBar.classList += " responsive";
      } else {
                myTopnavBar.className = "topnav";
      }
  }

  // nav bar hide on click on window
var hideNavbar_btn = document.getElementById("body")
hideNavbar_btn.addEventListener("click", () => {
  return document.getElementById("myTopnav").classList.remove("responsive")
})

//json data file
const getJson = async () => {
  const res = await fetch("./productdtls.json");
  const data = await res.json();
  return data;
};

//Pagination of Product .json
const mainDiv = document.querySelector(".main-container");
let perPage = 4
const renderItems = async () => {
        const item = await getJson();
        const totalItems = item.length
        const displayPageNav = perPage => {
              let pagination = ``
              perPage = perPage ? perPage : 1
              const pages = Math.ceil(totalItems / perPage)
              for (let i = 1; i <= pages; i++) {
                     pagination += `<a href="#" class="Page_Numbers" onClick="displayItems(${i},${perPage})" >${i}</a>`
                 }
              document.getElementById('pagination').innerHTML = pagination
         }
  displayPageNav(perPage);
}
renderItems();

// cart.json to store cart items or item details
var cart = {
  productitems: []
}





// Data rendere and pagination part of index and offset

const displayItems = async (page = 1, perPage = 2) => {
        const item = await getJson();
        const totalItems = item.length
        let index, offSet
        if (page == 1 || page <= 0) {
          index = 0
          offSet = perPage
        } else if (page > totalItems) {
          index = page - 1
          offSet = totalItems
        } else {
          index = page * perPage - perPage
          offSet = index + perPage
        }

      // slice item in index and perpage wise
        const slicedItems = item.slice(index, offSet)
        let html = ``;

     //Mapping product   
        slicedItems.map(elem => {

              // color and size option render
                let colorOption = ``;
                let SizeOption = ``;
                elem.variants.forEach(e => {
                      colorOption += `<option value="${e.color}">  ${e.color}  </option>`
                  })
                elem.Product_size.forEach(e => {
                      SizeOption += `<option  value="${e.size}">  ${e.size}  </option>`
                  })

              // Documenting the product cart on html
                html += ` <div class="col-lg-3 col-md-4 col-12 ">
                            <div class="product-card card d-flex flex-column align-items-center">
                              <img href="${elem.Product_URL}" class="card-img"src="${elem.Product_URL}" alt="${elem.Thumbnail_URL}">
                              <div class="card-body ">
                                <h5 class="card-title">${elem.Name}</h5>
                                <div class="product_Description">
                                    <span class="card-Description-text">Description</span>
                                    <h6 class="product_discription_box">
                                        <p class="card-text"> ${elem.Description.slice(0, 35)}<span id="dots">...</span><span id="more">${elem.Description.slice(35, 70)}</span></p><button  class="Discription_Readmore_Button" id="myBtn"> Read More</button>
                                    </h6>
                                </div>
                                <div class="buy d-flex justify-content-between align-items-center">
                                  <div class="price">
                                  <div class="d-flex justify-content-between align-items-center mt-2 mb-2 product_option">
                                  <span  class="card-Description-text">Available color</span>
                                  <label><select class="colors"  name="productColor" id="productColor">
                                      ${colorOption}
                                      </select>       </label>                                   
                                    </div>

                                    <div class="d-flex justify-content-between align-items-center mt-2 mb-2 product_option">
                                  <span  class="card-Description-text">Size</span>
                                  <label><select  class="Size" name="productSize"  data-product-id="productSize">
                                      ${SizeOption}
                                      </select>       </label>                                   
                                    </div>

                                    <div class="product_Price_box">
                                        <span >Rs.&nbsp;</span><h4>${elem.Price}</h4>
                                    </div> 
                                    </div>
                                    <div>
                                    <h6 class="mt-4 card-Rating_Tag ">Rating:${elem.Rating_Avg}</h6></div>
                                  <div class="Add-to-cart-button-Card">
                                          <span id="product_id" style="display:none" >${elem.Product_ID}</span>
                                        <button class="btn btn-danger  mt-1 Add-to-cart-button"><i class="fas fa-shopping-cart"></i> Add To Cart</button>
                                        <a  class="btn btn-info productMoreInfo">More info</a>
                                  </div>                                            
                                </div>
                              </div>
                            </div>
                          </div>`
           })
           mainDiv.innerHTML = html;

          //Description read more
          document.querySelectorAll(".Discription_Readmore_Button").forEach((e, i) => {
            e.addEventListener("click", () => {

              if (e.previousSibling.children[0].style.display === "none") {
                e.previousSibling.children[0].style.display = "inline";
                e.innerHTML = "Read more";
                e.previousSibling.children[1].style.display = "none";
              } else {
                e.previousSibling.children[0].style.display = "none";
                e.innerHTML = "Read less";
                e.previousSibling.children[1].style.display = "inline";
              }
            })
            if (e.previousSibling.innerHTML.length <= 70) {
              e.previousSibling.children[0].style.display = "none";
              e.style.display = "none";
              e.previousSibling.children[1].style.display = "none";
            }
          })

          // Product cart details array
          let productList = []


          //  // Add item in to cart      
          //  cart.productitems.map(generateCartItemDetailsOnCartPage)


          // Add to Cart button onclick function
          document.querySelectorAll(".Add-to-cart-button").forEach((ele) => {
                ele.addEventListener("click", ()=> {
                      let compareColorValue;
                      let compareSizeValue;
                      const productIDDetails = ele.parentElement.children[0].innerHTML;
                      var product = item[productIDDetails - 1]
                      // user selected otion value color and size of product
                      compareColorValue = ele.parentElement.parentElement.children[0].children[0].children[1].children[0].value;
                      compareSizeValue = ele.parentElement.parentElement.children[0].children[1].children[1].children[0].value;
                      // cart item push in array
                      productList = cart.productitems;

                      //ADD to cart value check
                      function checkValue(value, productListArr) {

                              var getCartData=JSON.parse(localStorage.getItem("CartItems"))
                              var status = 'Not exist';                  
                              productListArr.map(itm => {
                                      // console.log(itm.ProductID == value, itm.ProductID, value);
                                      if (itm.ProductID == value && itm.ProductSizeDetails.size == compareSizeValue && itm.ProductColorDetails.color == compareColorValue) {
                                            alert("Product Added Successfully.")
                                            
                                            itm.Quantity++;
                                            return status = 'Exist';
                                          }
                                  })
                              if(getCartData){
                                    getCartData.map(itm => {
                                      // console.log(itm.ProductID == value, itm.ProductID, value);
                                      if (itm.ProductID == value && itm.ProductSizeDetails.size == compareSizeValue && itm.ProductColorDetails.color == compareColorValue) {
                                            
                                            itm.Quantity++;
                                            return status = 'Exist';
                                          }
                                  })
                                  localStorage.setItem("CartItems",JSON.stringify(getCartData))

                                  }
                             
                              if (status == 'Not exist') {
                                  // push item to cart.productitems json 
                                    var cartData={
                                          "ProductID": productIDDetails,
                                          "Producttitle": product.Name,
                                          "Price": product.Price,
                                          "Quantity":product.Quantity,
                                          "ProductSizeDetails": product.Product_size.find(item => {
                                                                  if (item.size == compareSizeValue) {
                                                                    return item
                                                                  }
                                                                }),
                                          "ProductColorDetails": product.variants.find(item => {
                                                                  if (item.color == compareColorValue) {
                                                                    return item
                                                                  }
                                                                }),
                                          "ProductImageDetails": product.Product_URL,
                                          "ProductTotalPriceDetails": product.Price
                                    }
                                    var cartArray;
                                    if (getCartData) {
                                      cartArray = [...getCartData,cartData]                                      
                                    }else {
                                      cartArray =[cartData]
                                    }
                                    cart.productitems.push(cartData)
                                    alert("Product Added Successfully.")
                                    
                                    localStorage.setItem("CartItems",JSON.stringify(cartArray))
                                  }
                                  
                              return status
                         }
                        checkValue(productIDDetails, productList)
                      renderCartData()
                      
                  })
           })

           
      
          //more informaation button modal
          var modal = document.getElementById("myModal");
          document.querySelectorAll('.productMoreInfo').forEach(productitem => {
              productitem.addEventListener('click', () => {
                    modal.style.display = "block";
                    const productIDDetails = productitem.parentElement.children[0].innerHTML;
                    var product = item[productIDDetails - 1]
                    var moreinfoBox = document.getElementById("moreinfoBox");
                    moreinfoBox.innerHTML = `<div>
                                                <div class="modal-body">
                                                  <div class="row"> 
                                                      <div class="col-5">
                                                        <img src="${product.Product_URL}"class="img-fluid " alt="">
                                                      </div>                                            
                                                      <div class="col-7 moreinfo_Details">
                                                          <H4><strong>${product.Name}</strong></h4>
                                                          <div class="product_Modal_Price">
                                                          <span >Rs.&nbsp;</span><h4>${product.Price}</h4>
                                                          </div> 
                                                          <div class="product_Moreinfo_Description">
                                                                <span class="card-Description-text">Description</span>
                                                                <h6 class="product_discription_box">
                                                                    <p class="card-text"> ${product.Description}</p>
                                                                </h6>
                                                          </div>
                                                          <div>
                                                              <h6 class="mt-4 card_Rating_Tag_MoreInfo ">Rating:${product.Rating_Avg}</h6>
                                                          </div>
                                                          <div class="Add-to-cart-button-Card">
                                                          <span id="product_id" style="display:none" >${product.Product_ID}</span>
                                                              <button class="btn btn-danger mt-1 More-Info-AddToCart-Button"><i class="fas fa-shopping-cart"></i> Add To Cart</button>
                                                          </div>                              
                                                      </div>
                                                  </div>
                                                </div>                                                    
                                             </div>`
                 })
            });

          // Get the <span> element that closes the modal
          var span = document.getElementsByClassName("close_modal")[0];
          span.onclick = function () {
            modal.style.display = "none";
          }
          window.onclick = function (event) {
            if (event.target == modal) {
              modal.style.display = "none";
            }
          }      
}
displayItems(1, perPage)



  // //  Cart Page, cart item genartion function
  // function generateCartItemDetailsOnCartPage(data,containerID) {

  //   // same product added by addtocart button the product total price count 
    
  //   var add_To_cart_container = document.getElementById(containerID)
  //   add_To_cart_container.innerHTML=""
  //    data.map(item=>{ 
  //     ProductTotalPriceDetails=item.Quantity*item.Price;      
      
  //   add_To_cart_container.innerHTML += `<tr class="card_table_row"> 
  //                 <td  style="display:none"  class="cartProductID" id="${item.ProductID}" >${item.ProductID}</td>
  //                 <td class="w-25">
  //                     <img src="${item.ProductImageDetails}" class="img-fluid img-thumbnail h-20" alt="NOT DISPLAY">
  //                 </td>
  //                 <td> ${item.Producttitle} </td>
  //                 <td> ${item.ProductColorDetails.color}</td>
  //                 <td> ${item.ProductSizeDetails.size}</td>
  //                 <td> ${item.Price}</td>
  //                 <td class="qty"> <button class="btn badge badge-info minusQuantityBtn" onclick="updateQuantity(this,'decrease')" type="button" data-action="decrease-item"><i class="fa fa-minus" aria-hidden="true"></i>    </button>    
  //                 <input  type="text" onchange="onQuantityChange(this)" class="form-control product_quantity" id="input1" value="${item.Quantity}"  > <button class="btn badge badge-secondary" type="button" onclick="updateQuantity(this,'increase')" data-action="increase-item"><i class="fa fa-plus" aria-hidden="true"></i></button>                         
  //                 <td class="cartProductTotalPrice"> ${ProductTotalPriceDetails}</td>
  //                 <td><a onclick="closeitem(this)" class="btn btn-danger btn-sm Product-remove"><i class="fa fa-times"></i> </a></td>
  //                 </tr>`

  // })
  // }

// cart Quantity onchange function 
 function onQuantityChange(e) {
         var product=``;
         var getCartData=JSON.parse(localStorage.getItem("CartItems"))   
         var productTotalTag = e.closest(".card_table_row").querySelector(".cartProductTotalPrice");
         var productRowId=e.closest(".card_table_row").querySelector(".cartProductID").id;
        // From Input product quantity
              var quantity=parseInt(e.value);
        // mappping product
            getCartData.map(item=>{
                  if(productRowId==item.ProductID){
                    product=item;
                  }
              })
        // calculate total price       
            productTotalPrice=quantity*product.Price;         
            product.ProductTotalPriceDetails=productTotalPrice;
            product.Quantity=quantity;
        // if quantity is 0 then given alert
            if(quantity==0){          
                return alert("Minimum 1 quantity required")         
              }
        // Display calculated price in table html
            productTotalTag.innerHTML=productTotalPrice;
        // Push price to cart item
            for (let index = 0; index < getCartData.length; index++) {             
                    if (getCartData[index].ProductID==product.ProductID && getCartData[index].ProductSizeDetails.size==product.ProductSizeDetails.size && getCartData[index].ProductColorDetails.color==product.ProductColorDetails.color) {
                      getCartData[index].ProductTotalPriceDetails=productTotalPrice;                
                      getCartData[index].Quantity=quantity;                
                    } 
              }   
            localStorage.setItem("CartItems",JSON.stringify(getCartData))
            renderCartData()   
  }

//cart item remove from cart and array object
function closeitem(e) {
      var getCartData=JSON.parse(localStorage.getItem("CartItems")) 
      var productRowId=e.closest(".card_table_row").querySelector(".cartProductID").id
      var cartProductSize=e.closest(".card_table_row").querySelector(".productSelectedSize").innerHTML
      var cartProductColor=e.closest(".card_table_row").querySelector(".productSelectedColor").innerHTML
      var totalFilterData=[]
      getCartData.map(item=>{     
                    if(item.ProductID==productRowId && item.ProductSizeDetails.size!==cartProductSize && item.ProductColorDetails.color!==cartProductColor){
                    totalFilterData.push(item)
                  } else if(item.ProductID!==productRowId ){
                    totalFilterData.push(item)
                  }
            })   
      localStorage.setItem("CartItems",JSON.stringify(totalFilterData))
      renderCartData()
}

// Reduce and Increase cart product Quantity
function updateQuantity(e,type){  
  var quantity=``
  var getCartData=JSON.parse(localStorage.getItem("CartItems"))   
  var productRowId=e.closest(".card_table_row").querySelector(".cartProductID").id;
  var cartProductSize=e.closest(".card_table_row").querySelector(".productSelectedSize").innerHTML
  var cartProductColor=e.closest(".card_table_row").querySelector(".productSelectedColor").innerHTML
  var productTotalTag = e.closest(".card_table_row").querySelector(".cartProductTotalPrice");
  var product=``;
  getCartData.map(item=>{    
    if (item.ProductID==productRowId && item.ProductSizeDetails.size==cartProductSize && item.ProductColorDetails.color==cartProductColor) {
      product=item; 
    }      
  })
  quantity=product.Quantity; 

  // condition for incress and decress
  if (type==="decrease") {
    if(quantity===1){
      return  alert("Minimum 1 Quantity Required")
    } 
    quantity--;
  } else if (type==="increase") {
    quantity++;
  }
  productTotalPrice=quantity*product.Price; 
  product.Quantity=quantity;
  product.ProductTotalPriceDetails=productTotalPrice;
  productTotalTag.innerHTML=productTotalPrice;
  for (let index = 0; index < getCartData.length; index++) {             
    if (getCartData[index].ProductID==product.ProductID && getCartData[index].ProductSizeDetails.size==product.ProductSizeDetails.size && getCartData[index].ProductColorDetails.color==product.ProductColorDetails.color) {
      getCartData[index].ProductTotalPriceDetails=productTotalPrice;                
      getCartData[index].Quantity=quantity;                
    } 
  }   
  localStorage.setItem("CartItems",JSON.stringify(getCartData))
  renderCartData()
}

// Render data in cart from local storage
function renderCartData() {
  var totalCartData=``;
  var CartTotalPrice=0;
  var finalPrice=document.querySelector(".finalCheckOutPrice")
  var insertDataCart=document.getElementById("add_To_cart_Details_container")
  var getCartData=JSON.parse(localStorage.getItem("CartItems")) 
  if (getCartData) {
    document.querySelector(".add_to_cart_ProductCount").innerHTML =getCartData.length
    // Mapping local storage data
    getCartData.map(item=>{ 
            ProductTotalPriceDetails=item.Quantity*item.Price; 
            CartTotalPrice+=ProductTotalPriceDetails;
            totalCartData +=    `<tr class="card_table_row " id=""> 
            <td  style="display:none"  class="cartProductID" id="${item.ProductID}" >${item.ProductID}</td>
            <td class="w-25">
            <img src="${item.ProductImageDetails}" class="img-fluid img-thumbnail h-20" alt="NOT DISPLAY">
            </td>
            <td>${item.Producttitle}</td>
            <td class=" productSelectedColor">${item.ProductColorDetails.color}</td>
            <td class="productSelectedSize">${item.ProductSizeDetails.size}</td>
            <td>${item.Price}</td>
            <td class="qty"> <button class="btn badge badge-info minusQuantityBtn" onclick="updateQuantity(this,'decrease')" type="button" data-action="decrease-item"><i class="fa fa-minus" aria-hidden="true"></i>    </button>    
            <input  type="text" onchange="onQuantityChange(this)" class="form-control product_quantity" id="input1" value="${item.Quantity}"  > <button class="btn badge badge-secondary" type="button" onclick="updateQuantity(this,'increase')" data-action="increase-item"><i class="fa fa-plus" aria-hidden="true"></i></button>                         
            <td class="cartProductTotalPrice"> ${ProductTotalPriceDetails}</td>
            <td><a onclick="closeitem(this)" class="btn btn-danger btn-sm Product-remove"><i class="fa fa-times"></i> </a></td>
            </tr>`
          })
        insertDataCart.innerHTML=totalCartData;
        finalPrice.innerHTML=CartTotalPrice;
  }
  
  
  
}
renderCartData()

// cart row count Display
function cartTotalProductCount(){
  var getCartData=JSON.parse(localStorage.getItem("CartItems"))     
       document.querySelector(".add_to_cart_ProductCount").innerHTML =getCartData.length
}






//   function showCartDetails(data,containerID) {
//     var container = document.getElementById(containerID)

//      container.innerHTML=""
//      data.map(item=>{ 
//       ProductTotalPriceDetails=item.Quantity*item.Price; 
//       container.innerHTML+=    `<tr class="card_table_row " id=""> 
//     <td  style="display:none"  class="cartProductID" id="${item.ProductID}" >${item.ProductID}</td>
//     <td class="w-25">
//         <img src="${item.ProductImageDetails}" class="img-fluid img-thumbnail h-20" alt="NOT DISPLAY">
//     </td>
//     <td> ${item.Producttitle} </td>
//     <td class=" productSelectedColor"> ${item.ProductColorDetails.color}</td>
//     <td class="productSelectedSize"> ${item.ProductSizeDetails.size}</td>
//     <td> ${item.Price}</td>
//     <td class="qty"> <button class="btn badge badge-info minusQuantityBtn" onclick="updateQuantity(this,'decrease')" type="button" data-action="decrease-item"><i class="fa fa-minus" aria-hidden="true"></i>    </button>    
//     <input  type="text" onchange="onQuantityChange(this)" class="form-control product_quantity" id="input1" value="${item.Quantity}"  > <button class="btn badge badge-secondary" type="button" onclick="updateQuantity(this,'increase')" data-action="increase-item"><i class="fa fa-plus" aria-hidden="true"></i></button>                         
//     <td class="cartProductTotalPrice"> ${ProductTotalPriceDetails}</td>
//     <td><a onclick="closeitem(this)" class="btn btn-danger btn-sm Product-remove"><i class="fa fa-times"></i> </a></td>
//     </tr>`
//   })  
//  }

  // function cardDetailsShowInCart() {
    // var cartdata=cart.productitems
    // var getCartData=JSON.parse(localStorage.getItem("CartItems")) 
    // showCartDetails(getCartData,"add_To_cart_Details_container")
    // generateCartItemDetailsOnCartPage(cartdata,"add_To_cart_Details_container")
  // }


 