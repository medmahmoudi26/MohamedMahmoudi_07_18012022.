import Recipe from './recipe.js'

var data = [];

const recipiesContainer = document.getElementById("recipies");
const message = document.getElementById("message");

const searchBar = document.getElementById("searchBar");
const searchReg = new RegExp(/[a-zA-Z]{3,}/);

const inputIngredients = document.getElementById("inputIngredients");
const ingredientContainer = document.getElementById("ingredientContainer");
const ingredientsListIcon = document.getElementById("ingredientsListIcon");

const inputAppliances = document.getElementById("inputAppliances");
const appliancesContainer = document.getElementById("appliancesContainer");
const appliancesListIcon = document.getElementById("appliancesListIcon");

const inputUtensils = document.getElementById("inputUtensils");
const utensilsContainer = document.getElementById("utensilsContainer");
const utensilsListIcon = document.getElementById("utensilsListIcon");

const tagsContainer = document.getElementsByClassName("search__tags")[0];
let ingredientTags;
let applianceTags;
let utensilTags;

let recipies = [];
let filteredRecipies = [];

let searchedRecipies = [];
let filteredByTagsRecipies = [];

let filtersList = document.getElementsByClassName("filter");
let tagsList = [];

let ingredientsList = [];
let appliancesList = [];
let utensilsList = [];

function loadData() {
    try {
        fetch("/assets/data.json")
        .then(res => res.json())
        .then( (data) => {
             data.forEach(function(obj){
                let recipe = new Recipe(obj);
                recipe.init();
                recipies.push(recipe);
            });//
            searchBar.addEventListener("input", onGeneralSearch);// if someone is typing call the  onGeneralSearch function
            setFiltersList();
        })
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

function setFiltersList() {
    if (filteredByTagsRecipies.length > 0) filteredRecipies = filteredByTagsRecipies;
    else filteredRecipies = recipies;
}
// *** end of settings lists

// ****** Beginning of filter functions 
// General search
function onGeneralSearch(event) {

    for (let recipe of recipies) {
        if (recipiesContainer.contains(recipe.recipe)) {
            recipe.searched = false;
            recipe.removeChild();
        }
    }

    if (searchReg.test(event.target.value)) {
        recipies.forEach(function(recipe) {
            if (isWordInTitle(recipe, event.target.value) || isWordInIngredients(recipe, event.target.value) || isWordInDescription(recipe, event.target.value)) {
                recipe.searched = true;
                recipe.appendChild();
                searchedRecipies.push(recipe)
            }
        })
        setFiltersList();
    } else {
        recipies.forEach(function(recipe) {
            recipe.appendChild();
        })
        filteredRecipies = [];
        searchedRecipies = [];
        filteredByTagsRecipies = [];
        setFiltersList();
    }

    recipiesContainer.hasChildNodes() ? message.style.display = "none" : message.style.display = "flex";
}


loadData();



// is wordintitle functions
function isWordInTitle(recipe, word) {
    return recipe.name.toLowerCase().includes(word.toLowerCase());
}

function isWordInDescription(recipe, word) {
    return recipe.description.toLowerCase().split(/[\s,\?\,\.!]+/).some(string => string === word.toLowerCase());
}

function isWordInIngredients(recipe, word) {
    for (let list of recipe.ingredients) {
        if (list.ingredient.toLowerCase().includes(word.toLowerCase())) return true;
    }
}

function toggleIcon(listIcon) {
    if (listIcon.style.transform == "rotate(180deg)") {
        listIcon.style.transform = "rotate(0deg)";
    } else {
        listIcon.style.transform = "rotate(180deg)";
    }
}