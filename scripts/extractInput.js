import fetchData from './fetchData.js';
import createRecipeCard from './cardFactory.js';

document.addEventListener('DOMContentLoaded', async function () {
    let recipes = await fetchData();
    const originalRecipes = [...recipes];
    const cardContainer = document.querySelector(".cardsSelection");
    const dropDownsAll = document.querySelectorAll('.dropdown');
    const ingredientsDropdown = document.querySelector("#dropDownUl-1");
    const appliancesDropdown = document.querySelector("#dropDownUl-2");
    const ustensilsDropdown = document.querySelector("#dropDownUl-3");
    const inputUser = document.getElementById('search');
    const numberofRecipes = document.querySelector('.recipeField');
    const optionsZoneRecipe = document.querySelector('.optionZoneRecipe');

    const selectedOptionsMap = new Map();
    const ingredientsSet = new Set();
    const ustensilsSet = new Set();
    const appliancesSet = new Set();

    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => ingredientsSet.add(ingredient.ingredient));
        recipe.ustensils.forEach(ustensil => ustensilsSet.add(ustensil));
        appliancesSet.add(recipe.appliance);
    });

    /**
     * @function filterRecipesByDropdowns
     * @param {*} originalRecipes 
     * @returns 
     */
    function filterRecipesByDropdowns(originalRecipes) {
        let filteredRecipes = originalRecipes;

        selectedOptionsMap.forEach((selectedOptionsSet, dropdown) => {
            if (selectedOptionsSet.size > 0) {
                filteredRecipes = filteredRecipes.filter(recipe => {
                    const selectedOptionsLower = Array.from(selectedOptionsSet).map(option => option.toLowerCase());

                    return selectedOptionsLower.every(option => {
                        if (dropdown === ingredientsDropdown) {
                            return recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase() === option);
                        } else if (dropdown === ustensilsDropdown) {
                            return recipe.ustensils.some(ustensil => ustensil.toLowerCase() === option);
                        } else if (dropdown === appliancesDropdown) {
                            return recipe.appliance.toLowerCase() === option;
                        }
                    });
                });
            }
        });

        return filteredRecipes;
    }

    /**
     * @function filterRecipesBySearch
     * @param {*} originalRecipes 
     * @returns 
     */
    function filterRecipesBySearch(originalRecipes) {
        const inputUserValue = inputUser.value.trim().toLowerCase();
        const errorDiv = document.querySelector('.divError');

        if (inputUserValue.length < 3) {
            removeErrorDiv();
            return originalRecipes;
        }

        const filteredRecipes = [];

        let foundMatch = false;

        for (let i = 0; i < originalRecipes.length; i++) {
            const recipe = originalRecipes[i];
            const title = recipe.name.toLowerCase();
            const description = recipe.description.toLowerCase();

            /*  Recherche dans le titre */
            if (title.includes(inputUserValue)) {
                filteredRecipes.push(recipe);
                foundMatch = true;
                continue;
            }

            /* Recherche dans les ingrédients */
            let ingredientsMatch = false;
            for (let j = 0; j < recipe.ingredients.length; j++) {
                const ingredientName = recipe.ingredients[j].ingredient.toLowerCase();
                if (ingredientName.includes(inputUserValue)) {
                    ingredientsMatch = true;
                    foundMatch = true;
                    break;
                }
            }

            if (ingredientsMatch) {
                filteredRecipes.push(recipe);
                continue;
            }

            /* Recherche dans la description */
            if (description.includes(inputUserValue)) {
                filteredRecipes.push(recipe);
                foundMatch = true;
            }
        }

        /* Si aucune corespondance n'est trouvée dans la database */
        if (!foundMatch) {
            displayErrorDiv();


        } else {
            removeErrorDiv();

        }

        return filteredRecipes;
    }



    /**
     * @function displayErrorDiv
     * 
     */
    function displayErrorDiv() {
        const main = document.querySelector("main");

        const divError = document.createElement('div');
        divError.classList.add("divError");
        const pError = document.createElement('p');
        pError.classList.add('pError');
        pError.textContent = `Aucun résultat trouvé pour la recherche : ${inputUser.value}, veuillez essayer avec limonade ou tarte par exemple`;
        divError.appendChild(pError);
        main.appendChild(divError);

    }

    /**
     * @function removeErrorDiv
     * 
     */
    function removeErrorDiv() {
        const errorDiv = document.querySelector('.divError');
        if (errorDiv) {
            errorDiv.remove();
        }
    }




    /**
     * @function updateFiltersAndDOM
     */
    function updateFiltersAndDOM() {
        let filteredRecipes = filterRecipesByDropdowns(originalRecipes);
        filteredRecipes = filterRecipesBySearch(filteredRecipes);

        updateDropdownCascade(filteredRecipes);
        displayFilterButtons();
    }

    /**
     * @function updateDropdown
     * @param {*} items 
     * @param {*} dropdown 
     */
    function updateDropdown(items, dropdown) {
        dropdown.innerHTML = "";

        items.forEach(item => {
            const buttonLi = document.createElement("button");
            const li = document.createElement("li");
            li.setAttribute("class", "dropdown-item");

            const formattedItem = item.charAt(0).toUpperCase() + item.slice(1);

            buttonLi.textContent = `${formattedItem} `;
            li.appendChild(buttonLi);
            dropdown.appendChild(li);

            buttonLi.addEventListener('click', function () {
                const selectedOptionsSet = selectedOptionsMap.get(dropdown) || new Set();
                selectedOptionsSet.add(item.toLowerCase());
                selectedOptionsMap.set(dropdown, selectedOptionsSet);

                updateFiltersAndDOM();
            });
        });
    }

    /**
     * @function updateDropdownCascade
     * @param {*} filteredRecipes 
     */
    function updateDropdownCascade(filteredRecipes) {
        const updatedIngredientsSet = new Set();
        const updatedUstensilsSet = new Set();
        const updatedAppliancesSet = new Set();

        filteredRecipes.forEach(recipe => {
            recipe.ingredients.forEach(ingredient => updatedIngredientsSet.add(ingredient.ingredient));
            recipe.ustensils.forEach(ustensil => updatedUstensilsSet.add(ustensil));
            updatedAppliancesSet.add(recipe.appliance);
        });

        updateDropdown(updatedIngredientsSet, ingredientsDropdown);
        updateDropdown(updatedUstensilsSet, ustensilsDropdown);
        updateDropdown(updatedAppliancesSet, appliancesDropdown);

        cardContainer.innerHTML = "";
        filteredRecipes.forEach(recipe => {
            const anchor = createRecipeAnchor(recipe);
            cardContainer.appendChild(anchor);
        });

        numberofRecipes.innerHTML = `${filteredRecipes.length} RECETTES`;
    }

    /**
     * @function resetDom
     */
    function resetDOM() {
        selectedOptionsMap.clear();
        inputUser.value = "";
        updateFiltersAndDOM();
    }

    /**
     * @function displayFilterButtons
     */
    function displayFilterButtons() {
        optionsZoneRecipe.innerHTML = "";

        selectedOptionsMap.forEach((selectedOptionsSet, dropdown) => {
            if (selectedOptionsSet.size > 0) {
                selectedOptionsSet.forEach(option => {
                    const div = document.createElement("div");
                    const crossOption = document.createElement("button");

                    crossOption.setAttribute("class", "fa-solid fa-xmark");
                    crossOption.setAttribute("id", "crossOptions");
                    div.setAttribute("class", "optionRecipe");
                    div.textContent = `${option.charAt(0).toUpperCase() + option.slice(1)} `;
                    div.appendChild(crossOption);
                    optionsZoneRecipe.appendChild(div);

                    crossOption.addEventListener('click', function (event) {
                        const clickedWord = option.trim();
                        selectedOptionsSet.delete(clickedWord);
                        optionsZoneRecipe.removeChild(div);
                        event.stopPropagation();
                        updateFiltersAndDOM();
                    });
                });
            }
        });
    }

    inputUser.addEventListener('input', function () {
        updateFiltersAndDOM();
    });

    for (let i = 1; i <= 3; i++) {
        const arrowTurn = document.getElementById(`buttondropDown-${i}`);
        arrowTurn.addEventListener('click', function (event) {
            dropToggle(event, i);
        });
    }

    updateDropdown(ingredientsSet, ingredientsDropdown);
    updateDropdown(ustensilsSet, ustensilsDropdown);
    updateDropdown(appliancesSet, appliancesDropdown);

    cardContainer.innerHTML = "";
    originalRecipes.forEach(recipe => {
        const anchor = createRecipeAnchor(recipe);
        cardContainer.appendChild(anchor);
    });

    numberofRecipes.innerHTML = `${originalRecipes.length} RECETTES`;
});


/**
 * @function createRecipeAnchor
 */
function createRecipeAnchor(recipe) {
    const anchor = document.createElement("a");
    anchor.href = "#";
    const recipeCard = createRecipeCard(recipe);
    anchor.appendChild(recipeCard);
    anchor.id = `recipe-${recipe.id}`;
    return anchor;
}




/**
 * @function dropToggle
 * @param {*} event 
 * @param {*} index 
 */
function dropToggle(event, index) {
    const dropdownSearch = document.getElementById(`dropDownSearchbar-${index}`);
    const arrowTurn = document.getElementById(`buttondropDown-${index}`);
    const dropdownUl = document.getElementById(`dropDownUl-${index}`);
    const spanError = document.querySelector(`#dropDownSearchbar-${index} .spanError`);
    let dropdownSearchInput = document.querySelector(`#dropDownSearchbar-${index} input`);


    document.querySelectorAll('.dropdown').forEach(function (dropdown) {
        dropdown.classList.remove('show');
    });

    document.querySelectorAll('.dropdown .searchInput').forEach(function (searchInput) {
        searchInput.addEventListener('click', function (event) {
            event.stopPropagation();
        });
    });

    dropdownSearch.addEventListener('click', function (event) {
        event.stopPropagation();
    });

    if (!dropdownSearchInput) {
        dropdownSearchInput = document.createElement('input');
        dropdownSearchInput.classList.add('searchInput');
        dropdownSearchInput.setAttribute('placeholder', 'Rechercher');
        dropdownSearch.appendChild(dropdownSearchInput);

        dropdownSearchInput.addEventListener('input', function () {
            const value = dropdownSearchInput.value.toLowerCase();
            const items = dropdownUl.querySelectorAll('.dropdown-item');
            items.forEach(item => {
                const itemText = item.textContent.toLowerCase();
                if (itemText.includes(value)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    if (dropdownUl.style.display === 'block') {
        dropdownUl.style.display = 'none';
        arrowTurn.classList.remove('open');

    } else {
        dropdownUl.style.display = 'block';
        arrowTurn.classList.add('open');
        dropdownSearchInput.value = '';
    }
}
