const recipes = document.getElementById("recipies");

export default class Recipe {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.servings = data.servings;
        this.ingredients = data.ingredients;
        this.ingredientsList = setIngredientsList(data.ingredients);
        this.time = data.time;
        this.description = data.description;
        this.appliance = data.appliance;
        this.ustensils = data.ustensils;
        this.utensilsList = setUtensilsList(data.ustensils);
        this.image = "poke.jpg";
        this.onScreen;
        this.searched;
        this.selectedByTags;
        this.recipe = document.createElement('div');
    }

    init () {
        this.recipe.className = "recipe";
        this.recipe.id = this.id;
        this.recipe.innerHTML = `
        <div class="recipe__preview">
        </div>
        <div class="recipe__informations">
            <div class="recipe__informations__header">
                <p>${this.name}</p>
                <p class="recipe__informations__header--time"><i class="far fa-clock"></i><span class="recipe__time">${this.time} min</span></p>
            </div>
            <div class="recipe__informations__ingredients">
                <div class="recipe__informations__ingredients__list">
                    ${setIngredients(this.ingredients)}
                </div>
                <div class="recipe__informations__ingredients__text${isTitleTakingTwoLines(this.name)}">
                    <p>${this.description}</p>
                </div>
            </div>
        </div>
    `;
        recipes.appendChild(this.recipe);
    }

    appendChild() {
        recipes.appendChild(this.recipe);
    }

    setIngredients() {
        // walk through the list and append it
    }

    setUtentilist() {
        // walk through the list of utentilslist and append
    }

    removeChild() {
        recipies.removeChild(this.recipe);
    }
}

function setIngredients(ingredients) {
    let html = '';

    for (const ingredient of ingredients) {
        html += '<p>' + ingredient.ingredient;
        if (ingredient.quantity) html += ' : ' + ingredient.quantity;
        if (ingredient.unit) html += '' + ingredient.unit;
        html += '</p>';
    }

    return html;
}

function isTitleTakingTwoLines(name) {
    if (name.length > 27) return ' recipe__informations__ingredients__text--shorter';
    else return '';
}

function setIngredientsList(ingredients) {
    const array = [];
    for (const list of ingredients) {
        array.push(list.ingredient.toLowerCase());
    }
    return array;
}

function setUtensilsList(utensils) {
    const array = [];
    for (const utensil of utensils) {
        array.push(utensil.toLowerCase());
    }
    return array;
}