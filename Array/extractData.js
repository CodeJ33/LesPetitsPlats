
export function extractIngredients(recipe, encounteredIngredients) {
    const uniqueIngredients = [];

    recipe.ingredients.forEach(ingredient => {
        let quantity;


        if (ingredient.quantity !== undefined) {
            quantity = ingredient.quantity;
        } else {
            quantity = null;
        }

        const ingredientName = ingredient.ingredient.toLowerCase();

        /* Verification si l'ingrédient est déjà présent */
        if (!encounteredIngredients.has(ingredientName)) {
            encounteredIngredients.add(ingredientName);
            uniqueIngredients.push({
                name: ingredient.ingredient,
                quantity: quantity,
                unit: ingredient.unit || null,
            });
        } else {
            console.log(`Doublon trouvé: ${ingredient.ingredient}`);
        }
    });

    return uniqueIngredients;
}



export function extractUstensils(recipe, encounteredUstensils) {
    const uniqueUstensils = [];

    const ustensils = recipe.ustensils || [];

    ustensils.forEach(ustensil => {
        const ustensilName = ustensil.charAt(0).toUpperCase() + ustensil.slice(1);

        /* Verification si l'ustensile est déjà présent */
        if (!encounteredUstensils.has(ustensilName)) {
            encounteredUstensils.add(ustensilName);
            uniqueUstensils.push(ustensilName);
        }
    });

    return uniqueUstensils;
}


export function extractAppliances(recipe, encounteredAppliances) {
    const uniqueAppliances = new Set();


    if (recipe.appliance !== undefined) {
        if (Array.isArray(recipe.appliance)) {

            /* Pour un tableau */
            recipe.appliance.forEach(appliance => {
                const applianceName = appliance.toLowerCase();

                /* Verification si l'appareil est déjà présent */
                if (!encounteredAppliances.has(applianceName)) {
                    encounteredAppliances.add(applianceName);
                    uniqueAppliances.add(appliance);
                }
            });
        } else {
            /* Pour une chaîne */
            const applianceName = recipe.appliance.toLowerCase();
            if (!encounteredAppliances.has(applianceName)) {
                encounteredAppliances.add(applianceName);
                uniqueAppliances.add(recipe.appliance);
            }
        }
    }

    return Array.from(uniqueAppliances);
}


