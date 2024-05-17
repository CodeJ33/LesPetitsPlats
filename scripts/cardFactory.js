
/**
 * @function createRecipeCard
 * @description factory pour les cartes de recette
 * @param {*} recipe 
 * @returns 
 */
export default function createRecipeCard(recipe) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.id = `recipe-${recipe.id}`;

    const image = document.createElement("img");
    image.src = `assets/images/${recipe.image}`;
    image.classList.add("cardImg");
    image.alt = recipe.name;

    const timeRecipe = document.createElement("span");
    timeRecipe.classList.add("timeCard");
    timeRecipe.textContent = `${recipe.time} minutes`;

    const titleCard = document.createElement("h2");
    titleCard.textContent = recipe.name;
    titleCard.classList.add("titleCard");

    const description = document.createElement("p");
    description.textContent = recipe.description;
    description.classList.add("descriptionCard");

    const recipeTitle = document.createElement("h3");
    recipeTitle.classList.add("titleCardH3");
    recipeTitle.textContent = "RECETTE";

    const ingredientsTitle = document.createElement("h3");
    ingredientsTitle.classList.add("titleCardH3");
    ingredientsTitle.textContent = "INGREDIENTS";

    const ingredientsContainer = document.createElement("div");
    ingredientsContainer.classList.add("ingredientsContainer");

    const ingredientZone = document.createElement("div");
    ingredientZone.classList.add("ingredientZone");

    recipe.ingredients.forEach(ingredient => {
        const currentingredientZone = document.createElement("div");
        currentingredientZone.classList.add("ingredientZone");

        const divIngredients = document.createElement('div');
        divIngredients.classList.add("divIngredients");

        const ingredientName = document.createElement("span");
        ingredientName.classList.add('ingredientName');
        ingredientName.textContent = `${ingredient.ingredient}`;

        const ingredientItem = document.createElement("span");
        ingredientItem.classList.add("ingredientsQuantity");
        ingredientItem.textContent = ` ${ingredient.quantity || ''} ${ingredient.unit || ''} `.trim();

        divIngredients.appendChild(ingredientName);
        divIngredients.appendChild(ingredientItem);
        ingredientZone.appendChild(divIngredients);


        ingredientsContainer.appendChild(ingredientZone);
    });

    const servings = document.createElement("li");
    servings.textContent = `Servings: ${recipe.servings}`;

    const time = document.createElement("li");
    time.textContent = `Time: ${recipe.time} minutes`;

    const appliance = document.createElement("li");
    appliance.textContent = `Appliance: ${recipe.appliance}`;

    card.appendChild(image);
    card.appendChild(timeRecipe);
    card.appendChild(titleCard);
    card.appendChild(recipeTitle);
    card.appendChild(description);
    card.appendChild(ingredientsTitle);
    ingredientsContainer.appendChild(ingredientZone);
    card.appendChild(ingredientsContainer);

    return card;
}