import recipes from "./recipes.mjs";

function randomNum(num) {
    return Math.floor(Math.random() * num);
}

function getRandomRecipe(list) {
    let listLength = list.length;
    let randomIndex = randomNum(listLength);
    return list[randomIndex];
}

function generateTags(tags) {
    return tags.map(tag => `<span class="tag">${tag}</span>`).join(", ");
}

function generateRatingStars(rating) {
    const fullStar = `<span aria-hidden="true" class="icon-star">⭐</span>`;
    const emptyStar = `<span aria-hidden="true" class="icon-star-empty">☆</span>`;
    
    let stars = '';
    for (let i = 0; i < 5; i++) {
        stars += i < rating ? fullStar : emptyStar;
    }

    return `
        <span class="rating" role="img" aria-label="Rating: ${rating} out of 5 stars">
            ${stars}
        </span>
    `;
}

function createRecipeCard(recipe) {
    return `
        <div class="recipe-card">
            <img src="${recipe.image}" alt="${recipe.name}" class="recipe-image">
            <div class="recipe-details">
                <span class="category">${recipe.tags.join(", ")}</span>
                <h2 class="recipe-title">${recipe.name}</h2>
                ${generateRatingStars(recipe.rating)}
                <p class="recipe-description">
                    ${recipe.description}
                </p>
                <div class="recipe-tags">
                    ${generateTags(recipe.tags)}
                </div>
            </div>
        </div>
    `;
}

function init() {
    const randomRecipe = getRandomRecipe(recipes);
    const recipeCardHTML = createRecipeCard(randomRecipe);
    
    const mainElement = document.querySelector('main');
    mainElement.innerHTML = recipeCardHTML;
}

document.addEventListener('DOMContentLoaded', init);

function filterRecipes(query) {
    let lowerCaseQuery = query.toLowerCase();
    return recipes.filter(recipe => {
        return recipe.name.toLowerCase().includes(lowerCaseQuery) ||
               recipe.description.toLowerCase().includes(lowerCaseQuery) ||
               (Array.isArray(recipe.tags) && recipe.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery))) ||
               (Array.isArray(recipe.ingredients) && recipe.ingredients.some(ingredient => ingredient.name.toLowerCase().includes(lowerCaseQuery))); // Adjusted for ingredient objects
    }).sort((a, b) => a.name.localeCompare(b.name));
}

function renderRecipes(recipeList) {
    const mainElement = document.querySelector('main');
    mainElement.innerHTML = recipeList.map(createRecipeCard).join('');
}

function searchHandler(event) {
    event.preventDefault();
    const query = document.querySelector('#search-input').value.toLowerCase();
    const filteredRecipes = filterRecipes(query);
    renderRecipes(filteredRecipes);
}

document.querySelector('#search-button').addEventListener('click', searchHandler);




