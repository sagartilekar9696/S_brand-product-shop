const getJson = async () => {
  const res = await fetch("");
  const data = await res.json();
  return data;
};
// getJson();
     console.log(getJson);

const renderItems = async () => {
  const mainDiv = document.querySelector(".main-container");
  let card = "";
  const item = await getJson();
    console.log(item);
  item.forEach((elem) => {
    card += `<div class="card">
              <div class="top-div">
                <img src="https://random.imagecdn.app/300/300" alt="" />
              </div>
            <div class="buttom-div">
              <h1>Title:${elem.title}</h1>
              <h2>
                Description:${elem.description}
              </h2>
              <div class="innerdiv">
                <h3>Rating:${elem.rating}</h3>
                <h3>Price:$${elem.price}</h3>
              </div>
              <button class="btn">Add cart</button>
            </div>
          </div>`
     });
  // console.log(card);
  mainDiv.innerHTML = card;
};
renderItems();


