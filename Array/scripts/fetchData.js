// fetchData.js
async function fetchData() {
    try {
        const response = await fetch('recipe.json');
        const data = await response.json();
        return data.recipes;
    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
        throw error; // Propagez l'erreur pour la gestion ultérieure si nécessaire
    }
}

export default fetchData;