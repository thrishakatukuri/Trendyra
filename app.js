
async function data() {
    let response = await fetch('https://fakestoreapi.com/products');
    let products = await response.json();
    console.log(products);

    let Products = document.getElementById('Products');
    Products.innerHTML = "";

         products.map((item) => {
        let shortTitle = item.title.length > 10 ? item.title.slice(0, 11) + '...' : item.title;
        let shortDescription = item.description.split(' ').slice(0, 20).join(' ') + '...';
        
            Products.innerHTML += `
        <div id=products>
        <div>
        <img src=${item.image} >
        </div>
        <h1><span>${shortTitle}</span></h1> 
        <div> <p>${shortDescription}..</p></div>
            <div class="divider"></div>
        <h2>£${item.price}/-</h2>
            <div class="divider"></div>
         <div id="cartbtn">
                <button class="btn btn-dark">Details</button>
                <button class="btn btn-dark">Add to Cart</button>
            </div>
       </div> `

    })
}data()
