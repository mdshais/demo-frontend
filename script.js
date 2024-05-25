let btn = document.getElementById("btn")
let ulEl = document.getElementById("products");
let formEl = document.getElementById("addProductForm");

// btn.addEventListener("click", () => {
//     alert("Hello World");
// })


formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    let formData = e.target;
    let product = {
        title: formData.title.value,
        price: Number(formData.price.value),
    }
    saveProduct(product);
    return false;
})


function displayProducts(products) {
    ulEl.innerHTML="";
    products.map((product) => {
        let liEl = document.createElement("li");
        liEl.innerHTML = `${product.title} ${product.price}`;
        ulEl.appendChild(liEl);
    })
}


async function getProducts() {
    try {
        let response = await fetch("http://localhost:3000/products");
        response = await response.json();
        displayProducts(response);
    } catch (error) {
        console.log(error);
    }
}

getProducts();


async function saveProduct(product) {
    try {
        let response = await fetch("http://localhost:3000/products", {
            method: "POST",
            body: JSON.stringify(product),
            headers: { 
                "Content-type": "application/json; charset=UTF-8"
            } 
        });
        response = await response.json();
        displayProducts(response);
    } catch (error) {
        console.log(error);
    }
}