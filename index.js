let result = document.getElementById('result');


let searchBtn = document.getElementById('search-button');

let url = 'https://thecocktaildb.com/api/json/v1/1/search.php?s=';



let getInfo = () => {
    let userInput = document.getElementById('user-input').value;

        if (userInput == 0) {
            result.innerHTML = `<h3 class="message">The input field cannot be empty</h3>`;
        }
        else {
        
            fetch(url + userInput)
                .then(resp => resp.json())
                .then(data => {
                   

                    let myDrink = data.drinks[0];
                    
                    let count = 1;
                    let ingredients = [];
                    for (let i in myDrink) {
                        let ingredient = "";
                        let measure = "";
                        if (i.startsWith('strIngredient') && myDrink[i]) {
                            ingredient = myDrink[i];
                            if (myDrink[`strMeasure` + count]) {
                                measure = myDrink[`strMeasure` + count];
                            }
                            else {
                                measure = "";
                            }
                            count += 1;
                            ingredients.push(`${measure} ${ingredient}`);
                        }
                    }
                    result.innerHTML = `
            <img src = ${myDrink.strDrinkThumb}>
            <h2>${myDrink.strDrink}</h2>
            <h3>Ingredients:</h3>
            <ul class='ingredients's></ul>
            <h3>Instructions:</h3>
            <p>${myDrink.strInstructions}</p>

            `;
                    let ingredientsContainer = document.querySelector('.ingredients');

                    ingredients.forEach(item => {
                        let listItem = document.createElement('li');
                        listItem.textContent = item;
                        ingredientsContainer.appendChild(listItem)
                    });
                     
                        
    

                })
                .catch(() => {
            
                    result.innerHTML = `<h3 class='message'>Please enter a valid input</h3>

            `
                });
        }

}


window.addEventListener('load', getInfo)
searchBtn.addEventListener('click', getInfo)
