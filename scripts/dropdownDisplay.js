

import fetchData from './fetchData.js';
import { extractIngredients, extractUstensils, extractAppliances } from './extractData.js';

async function main() {
    try {
        const recipes = await fetchData();
        const encounteredIngredients = new Set();
        const encounteredUstensils = new Set();
        const encounteredAppliances = new Set();

        /* Récupération de l'Ul pour les ingrédients */
        const ingredientsDropdown = document.querySelector("#dropDownUl-1");

        /* Récupération de l'Ul pour les apareils */
        const appliancesDropdown = document.querySelector("#dropDownUl-2");

        /* Récupération de l'Ul pour les ustensils */
        const ustensilsDropdown = document.querySelector("#dropDownUl-3");

        /* Récupératon du champ du nombre de recettes affichées */

        const recipeField = document.querySelector(".recipeField");



        recipes.forEach((recipe, index) => {
            console.log(`Recette ${index + 1}: ${recipe.name}`);

            const ingredients = extractIngredients(recipe, encounteredIngredients);
            const ustensils = extractUstensils(recipe, encounteredUstensils);
            const appliances = extractAppliances(recipe, encounteredAppliances);

            /* Nombre de recettes */
            const numberOfRecipes = recipes.length;
            recipeField.innerHTML = `${numberOfRecipes} RECETTES`;

            /* Ajout de chaque ingrédient dans l'ul correspondant */
            ingredients.forEach(ingredient => {
                const li = document.createElement("li");
                const buttonLi = document.createElement("button");
                li.setAttribute("class", "dropdown-item");
                buttonLi.textContent = `${ingredient.name} `;
                ingredientsDropdown.appendChild(li);
                li.appendChild(buttonLi);
            });

            /* Ajout de chaque ustensile dans l'ul correspondant */
            ustensils.forEach(ustensil => {
                const li = document.createElement("li");
                const buttonLi = document.createElement("button");
                li.setAttribute("class", "dropdown-item");
                buttonLi.textContent = `${ustensil} `;
                ustensilsDropdown.appendChild(li);
                li.appendChild(buttonLi);
            });

            /* Ajout de chaque appareil dans l'ul correspondant */
            appliances.forEach(appliance => {
                const li = document.createElement("li");
                const buttonLi = document.createElement("button");
                li.setAttribute("class", "dropdown-item");
                buttonLi.textContent = `${appliance} `;
                appliancesDropdown.appendChild(li);
                li.appendChild(buttonLi);
            });

        });


    } catch (error) {
        console.error('Erreur :', error);
    }
}

main();
