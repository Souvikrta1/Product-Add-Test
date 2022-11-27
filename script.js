const inputForm = document.getElementById("input-form");
const inputURL = document.getElementById("input-data");
const priorityForm = document.getElementById("priority-form");

const products = document.getElementById("products");

let productItems = JSON.parse(localStorage.getItem("addedProducts"));
if(!productItems) productItems = [];
renderProducts(productItems);


let currentFilter = "All";

priorityForm.addEventListener("change", (e)=>{
    currentFilter = e.target.value;

    let check = productItems;
    if(currentFilter === "Laptops"){
        check = check.filter((addedProducts) => addedProducts.priority === "Laptops")
    } else if(currentFilter === "Headphones"){
        check = check.filter((addedProducts) => addedProducts.priority === "Headphones")
    } else if(currentFilter === "Mobiles"){
        check = check.filter((addedProducts) => addedProducts.priority === "Mobiles")
    }

    renderProducts(check);
})

products.addEventListener("click",(e)=>{
    if(e.target.classList.contains("Delete")){
        const targetDiv = e.target.parentNode;
        targetDiv.remove();
        productItems.splice(e.target.parentNode , 1);
        localStorage.setItem("addedProducts",JSON.stringify(productItems));
    }
})

inputForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const priority = e.target.priority.value;
    const URL = inputURL.value;


    productItems.push({
        priority,
        URL
    })
    localStorage.setItem("addedProducts",JSON.stringify(productItems));
    
    renderProducts(productItems);
})

function renderProducts(productItems){
    products.innerHTML = "";
    if(!productItems) return;

    productItems.map(
        (addedProducts) => 
        (products.innerHTML += `
        <div class="${addedProducts.priority}"><img src="${addedProducts.URL}">
        <button class="Delete">Delete</button>
        </div>
                `)
    );
}