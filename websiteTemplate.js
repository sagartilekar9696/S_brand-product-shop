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
//nav bar responsive

function responsiveToggelFunction() {
  var myTopnavBar = document.getElementById("myTopnav");
  console.log(myTopnavBar.className);
  if (myTopnavBar.className === "topnav") {
    myTopnavBar.classList += " responsive";
  } else {
    myTopnavBar.className = "topnav";
  }
}
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

//Pagination
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

var cart = {
  productitems: []
}

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



  const slicedItems = item.slice(index, offSet)
  // console.log(item);
  let html = ``;
  //Mapping product   
  slicedItems.map(elem => {
    let colorOption = ``;
    let SizeOption = ``;
    elem.variants.forEach(e => {
      colorOption += `<option value="${e.color}">  ${e.color}  </option>`
    })
    elem.Product_size.forEach(e => {
      SizeOption += `<option  value="${e.size}">  ${e.size}  </option>`
    })
    html += `                              
                                    <div class="col-lg-3 col-md-4 col-12 ">
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
                                                  <button class="btn btn-danger mt-1 Add-to-cart-button"><i class="fas fa-shopping-cart"></i> Add To Cart</button>
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


  let productList = []
  document.querySelectorAll(".Add-to-cart-button").forEach((ele, index) => {
    ele.addEventListener("click", () => {
            let compareColorValue;
            let compareSizeValue;

            const productIDDetails = ele.parentElement.children[0].innerHTML;
            var product = item[productIDDetails - 1]
            compareColorValue = ele.parentElement.parentElement.children[0].children[0].children[1].children[0].value;
            compareSizeValue = ele.parentElement.parentElement.children[0].children[1].children[1].children[0].value;
            productList = cart.productitems
            // console.log(productList);

            //ADD to cart value check
            function checkValue(value, productListArr) {
              var status = 'Not exist';
        
              productListArr.map(itm => {
                      // console.log(itm.ProductID == value, itm.ProductID, value);
                      if (itm.ProductID == value && itm.ProductSizeDetails.size == compareSizeValue && itm.ProductColorDetails.color == compareColorValue) {
                            // alert("Product Added Successfully.")
                            itm.Quantity++;
                            return status = 'Exist';
                          }
              })
              var getCartData=JSON.parse(localStorage.getItem("CartItems"))
                console.log(getCartData);

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
                    var cartArray=[cartData]
                    cart.productitems.push(cartData)
                    localStorage.setItem("CartItems",JSON.stringify(cartArray))
                  // alert("Product Added Successfully.")

              }

              getTotalCartPrice();

              return status;

            }
             console.warn('status : ' + checkValue(productIDDetails, productList));
         


            // Add item in to cart            
            var add_To_cart_container = ``
            cart.productitems.map(generateCartItemDetailsOnCartPage)

              // Cart Page cart item genartion function
            function generateCartItemDetailsOnCartPage(item) {
                          ProductTotalPriceDetails=item.Quantity*item.Price;
                             
                    add_To_cart_container += `<tr class="card_table_row"> 
                                        <td  style="display:none"  class="cartProductID" id="${item.ProductID}" >${item.ProductID}</td>
                                        <td class="w-25">
                                            <img src="${item.ProductImageDetails}" class="img-fluid img-thumbnail h-20" alt="NOT DISPLAY">
                                        </td>
                                        <td> ${item.Producttitle} </td>
                                        <td> ${item.ProductColorDetails.color}</td>
                                        <td> ${item.ProductSizeDetails.size}</td>
                                        <td> ${item.Price}</td>
                                        <td class="qty"> <button class="btn badge badge-info" type="button" data-action="decrease-item"><i class="fa fa-minus" aria-hidden="true"></i>    </button>    
                                        <input  type="text" onchange="onQuantityChange(this)" class="form-control product_quantity" id="input1" value="${item.Quantity}" > <button class="btn badge badge-secondary" type="button" data-action="increase-item"><i class="fa fa-plus" aria-hidden="true"></i></button>                         
                                        <td class="cartProductTotalPrice"> ${ProductTotalPriceDetails}</td>
                                        <td><a onclick="closeitem()" class="btn btn-danger btn-sm Product-remove"><i class="fa fa-times"></i> </a></td>
                                        </tr>`
              }
              document.querySelector(".add_To_cart_Details_container").innerHTML = add_To_cart_container;
              document.querySelector(".add_to_cart_ProductCount").innerHTML =cart.productitems.length;
        })

        
      })
      
      //more info modal
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
                                                <button class="btn btn-danger mt-1 Add-to-cart-button"><i class="fas fa-shopping-cart"></i> Add To Cart</button>
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

// cart Quantity onchange function 
 function onQuantityChange(e) {
         var product=``;
        var productTotalTag = e.closest(".card_table_row").querySelector(".cartProductTotalPrice");
        // From Input product quantity
        var Quantity=parseInt(e.value);
        var productRowId=e.closest(".card_table_row").querySelector(".cartProductID").id;
        console.log(productRowId);

        // mappping product
        cart.productitems.map(item=>{
              if(productRowId==item.ProductID){
                product=item;
              }
          })

        // calculate total price
        productTotalPrice=Quantity*product.Price; 
        product.ProductTotalPriceDetails=productTotalPrice;

        // Display calculated price in table html
        productTotalTag.innerHTML=productTotalPrice;

        console.log( product);
        // Push price to cart item
            for (let index = 0; index < cart.productitems.length; index++) {             
                  if (cart.productitems.ProductID==productRowId) {
                    cart.productitems[index].ProductTotalPriceDetails=productTotalPrice;                
                  }              
            }    
            getTotalCartPrice();
            
        

  }

//cart item remove from cart and array object
function closeitem(e) {
  document.querySelector(".card_table_row").remove()
  cart.productitems.pop(e)
  document.querySelector(".add_to_cart_ProductCount").innerHTML =cart.productitems.length

}

// final checkout price
function getTotalCartPrice(){

  var finalPrice=document.querySelector(".finalCheckOutPrice")
  var totalCartPrice=0;
    for (let item of cart.productitems) {
      totalCartPrice+=item.ProductTotalPriceDetails; 
  }           
  finalPrice.innerHTML= totalCartPrice;
}

// Reduce Quantity

// function minusQuantity(e) {
//   if()
// }




