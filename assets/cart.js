// quantity selector

document.querySelectorAll(".quantity-selector button").forEach((button)=>{
    button.addEventListener("click", async ()=>{
        let input = button.parentElement.querySelector("input");
        let inputValue = Number(input.value);
        let isPLus = button.classList.contains("btn-increment");
        console.log(inputValue, "inputValue")

        let key = button.closest(".main-col").getAttribute("data-key");

        if(isPLus){
            // input value 
            let newValue = inputValue + 1;
            // input value update
            input.value = newValue;

            // change item qty function
            await changeItemQuantity(key, newValue)

        }else{

            console.log("minus")

             // input value 
             let newValue = inputValue - 1;
             // input value update
             input.value = newValue;
             // change item qty function
             await changeItemQuantity(key, newValue)
        }
    })
})

// fetch method
 async function changeItemQuantity(key, quantity){
    fetch('cart/change.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
           {
            id: key,
            quantity: quantity
           }
        )
      })
      .then(response => {
        return response.json();
      })
      .then(res =>{
        console.log(res, "res here=====>")

        // get item price here
        const item = res.items.find(item => item.key === key);
        //const itemPrice = item.final_price;

        //const itemPrice = item.final_line_price;

        console.log(item, "item")


        // update item price here
        document.querySelector(`[data-key="${key} .item-price"]`).textContent = itemPrice;

      })
      .catch((error) => {
        console.error('Error:', error);
      });
}
