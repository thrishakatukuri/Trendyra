let allProducts = []; 

async function data() {
    let response = await fetch('https://fakestoreapi.com/products');
    let products = await response.json();
    allProducts = products;
    console.log(allProducts);
    renderProducts(allProducts); 
}

    function renderProducts(products) {
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
                <button class="btn btn-dark  add-to-cart">Add to Cart</button>
            </div>
       </div> `

    });
}
    
    document.addEventListener('DOMContentLoaded', () => {
        data(); 
    
        document.getElementById('all').addEventListener('click', () => {
            renderProducts(allProducts);
        });
    
        document.getElementById('men').addEventListener('click', () => {
            const filtered  = allProducts.filter(item => item.category === "men's clothing");
            renderProducts(filtered );
        });
        document.getElementById('women').addEventListener('click', () => {
            const filtered  = allProducts.filter(item => item.category === "women's clothing");
            renderProducts(filtered );
        });
         document.getElementById('jewelery').addEventListener('click', () => {
            const filtered  = allProducts.filter(item => item.category === "jewelery");
            renderProducts(filtered );
        }); 
        document.getElementById('electronics').addEventListener('click', () => {
            const filtered  = allProducts.filter(item => item.category === "electronics");
            renderProducts(filtered );
        });
    })

