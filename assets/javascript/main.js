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
        fetch("./assets/data.json")
        .then(res => res.json())
        .then( (data) => {
            for (let obj of data) {
                let recipe = new Recipe(obj);
                recipe.init();
                recipies.push(recipe);
            }
            searchBar.addEventListener("input", onGeneralSearch);// if someone is typing call the  onGeneralSearch function
            inputIngredients.addEventListener("focus", onIngredientFocus); 
            inputIngredients.addEventListener("focusout", onIngredientFocusOut);
            ingredientsListIcon.addEventListener("click", onIngredientClick);

            inputAppliances.addEventListener("focus", onAppliancesFocus);
            inputAppliances.addEventListener("focusout", onAppliancesFocusOut);
            appliancesListIcon.addEventListener("click", onAppliancesClick);

            inputUtensils.addEventListener("focus", onUtensilsFocus);
            inputUtensils.addEventListener("focusout", onUtensilsFocusOut);
            utensilsListIcon.addEventListener("click", onUtensilsClick);

            inputIngredients.addEventListener("input", onIngredientSearch);
            inputAppliances.addEventListener("input", onApplianceSearch);
            inputUtensils.addEventListener("input", onUtensilSearch);
            setFiltersList();
        })
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

// setttings lists section
function setIngredientsList() {

    ingredientsList = [];

    for (let recipe of filteredRecipies) {
        for (let list of recipe.ingredients) {
            if (!isFilterAlreadyDisplayed(ingredientsList, list.ingredient)) {
                let ingredientFilter = document.createElement('p');
                ingredientFilter.classList.add("filter", "isIngredient");
                ingredientFilter.innerText = list.ingredient;
                ingredientFilter.name = list.ingredient.toLowerCase();
                ingredientsList.push(ingredientFilter);
            }
        }
    }

    for (const ingredient of ingredientsList) {
        document.getElementById("ingredients").appendChild(ingredient);
    }
}

function setAppliancesList() {
    appliancesList = [];

    for (let recipe of filteredRecipies) {
        if (!isFilterAlreadyDisplayed(appliancesList, recipe.appliance)) {
            let applianceFilter = document.createElement('p');
            applianceFilter.classList.add("filter", "isAppliance");
            applianceFilter.innerText = recipe.appliance;
            applianceFilter.name = recipe.appliance.toLowerCase();
            appliancesList.push(applianceFilter);
        }
    }

    for (const applianceFilter of appliancesList) {
        document.getElementById("appliances").appendChild(applianceFilter);
    }
}

function setUtensilsList() {
    utensilsList = [];

    for (let recipe of filteredRecipies) {
        for (let ustensil of recipe.ustensils) {
            if (!isFilterAlreadyDisplayed(utensilsList, ustensil)) {
                let utensilFilter = document.createElement('p');
                utensilFilter.classList.add("filter", "isUtensil");
                utensilFilter.innerText = ustensil;
                utensilFilter.name = ustensil.toLowerCase();
                utensilsList.push(utensilFilter);
            }
        }
    }

    for (const utensilFilter of utensilsList) {
        document.getElementById("utensils").appendChild(utensilFilter);
    }
}

function setFiltersList() {
    if (filteredByTagsRecipies.length > 0) filteredRecipies = filteredByTagsRecipies;
    else if (searchedRecipies.length > 0) filteredRecipies = searchedRecipies;
    else filteredRecipies = recipies;

    document.getElementById("ingredients").innerHTML = '';
    document.getElementById("appliances").innerHTML = '';
    document.getElementById("utensils").innerHTML = '';

    setIngredientsList();
    setAppliancesList();
    setUtensilsList();

    for (let filter of filtersList) {
        filter.addEventListener("click", hasTagAlreadyBeenSelected);
    }
}
// *** end of settings lists

// ****** Beginning of filter functions 
// General search
function onGeneralSearch(event) {

    document.getElementById("ingredients").innerHTML = '';
    document.getElementById("appliances").innerHTML = '';
    document.getElementById("utensils").innerHTML = '';

    deleteAllTags();

    for (let recipe of recipies) {
        if (recipiesContainer.contains(recipe.recipe)) {
            recipe.searched = false;
            recipe.removeChild();
        }
    }

    if (searchReg.test(event.target.value)) {
        for (let recipe of recipies) {
            if (isWordInTitle(recipe, event.target.value) || isWordInIngredients(recipe, event.target.value) || isWordInDescription(recipe, event.target.value)) {
                recipe.searched = true;
                recipe.appendChild();
                searchedRecipies.push(recipe)
            }
        }
        setFiltersList();
    } else {
        for (let recipe of recipies) recipe.appendChild();
        filteredRecipies = [];
        searchedRecipies = [];
        filteredByTagsRecipies = [];
        setFiltersList();
    }

    recipiesContainer.hasChildNodes() ? message.style.display = "none" : message.style.display = "flex";
}

function onIngredientSearch(event) {

    if ((event.target.value == '' || event.target.value == ' ') && (tagsList.length == 0) && (searchedRecipies.length == 0)) {
        for (const ingredientFilter of ingredientsList) {
            if (document.getElementById("ingredients").contains(ingredientFilter)) document.getElementById("ingredients").removeChild(ingredientFilter);
        }
    } else {
        for (const ingredientFilter of ingredientsList) {
            document.getElementById("ingredients").appendChild(ingredientFilter);
            if (!ingredientFilter.name.toLowerCase().includes(event.target.value)) document.getElementById("ingredients").removeChild(ingredientFilter);
        }
    }

    let offsetHeight = document.getElementById("ingredients").offsetHeight;
    ingredientContainer.style.height = (23 + offsetHeight) + "px";
}

function onApplianceSearch(event) {

    if ((event.target.value == '' || event.target.value == ' ') && (tagsList.length == 0) && (searchedRecipies.length == 0)) {
        for (const applianceFilter of appliancesList) {
            if (document.getElementById("appliances").contains(applianceFilter)) document.getElementById("appliances").removeChild(applianceFilter);
        }
    } else {
        for (const applianceFilter of appliancesList) {
            document.getElementById("appliances").appendChild(applianceFilter);
            if (!applianceFilter.name.toLowerCase().includes(event.target.value)) document.getElementById("appliances").removeChild(applianceFilter);
        }
    }

    let offsetHeight = document.getElementById("appliances").offsetHeight;
    appliancesContainer.style.height = (23 + offsetHeight) + "px";
}

function onUtensilSearch(event) {

    if ((event.target.value == '' || event.target.value == ' ') && (tagsList.length == 0) && (searchedRecipies.length == 0)) {
        for (const utensilFilter of utensilsList) {
            if (document.getElementById("utensils").contains(utensilFilter)) document.getElementById("utensils").removeChild(utensilFilter);
        }
    } else {
        for (const utensilFilter of utensilsList) {
            document.getElementById("utensils").appendChild(utensilFilter);
            if (!utensilFilter.name.toLowerCase().includes(event.target.value)) document.getElementById("utensils").removeChild(utensilFilter);
        }
    }

    let offsetHeight = document.getElementById("utensils").offsetHeight;
    utensilsContainer.style.height = (23 + offsetHeight) + "px";
}
// end of search functions


// ****** On Focus and click events}
function onIngredientClick(event) {
    inputIngredients.focus();
}

function onIngredientFocus(event) {

    ingredientsListIcon.removeEventListener("click", onIngredientClick);

    if ((searchedRecipies.length == 0) && (tagsList.length == 0)) {
        for (const ingredient of ingredientsList) {
            if (document.getElementById("ingredients").contains(ingredient)) document.getElementById("ingredients").removeChild(ingredient);
        }
        document.getElementById("ingredients").style.gridTemplateColumns = "1fr";
    }

    setTimeout(function () {
        inputIngredients.setAttribute("placeholder", "Rechercher un ingrédient");
    }, 250);

    let filteredIngredientsWidth = document.getElementById("ingredients").clientWidth;
    if (filteredIngredientsWidth > 200) ingredientContainer.style.width = filteredIngredientsWidth + "px";
    else ingredientContainer.style.width = "300px";

    let filteredIngredientsHeight = document.getElementById("ingredients").offsetHeight;
    ingredientContainer.style.height = (23 + filteredIngredientsHeight) + "px";
    document.getElementById("ingredients").style.opacity = "1";

    toggleIcon(ingredientsListIcon);
}

function onIngredientFocusOut(event) {

    setTimeout(function () {
        document.getElementById("ingredients").style.gridTemplateColumns = "max-content max-content max-content";
        ingredientsListIcon.addEventListener("click", onIngredientClick);
    }, 500);

    setTimeout(function () {
        inputIngredients.setAttribute("placeholder", "Ingrédients");
        inputIngredients.value = '';
    }, 250);

    setTimeout(function () {
        document.getElementById("ingredients").style.opacity = "0";
        ingredientContainer.style.width = "150px";
        ingredientContainer.style.height = "23px";
    }, 100);

    toggleIcon(ingredientsListIcon);
}

function onAppliancesClick(event) {
    inputAppliances.focus();
}

function onAppliancesFocus(event) {

    appliancesListIcon.removeEventListener("click", onAppliancesClick);

    if ((searchedRecipies.length == 0) && (tagsList.length == 0)) {
        for (const applianceFilter of appliancesList) {
            if (document.getElementById("appliances").contains(applianceFilter)) document.getElementById("appliances").removeChild(applianceFilter);
        }
        document.getElementById("appliances").style.gridTemplateColumns = "1fr";
    }

    setTimeout(function () {
        inputAppliances.setAttribute("placeholder", "Rechercher un appareil");
    }, 250);

    let filteredAppliancesWidth = document.getElementById("appliances").clientWidth;
    if (filteredAppliancesWidth > 200) appliancesContainer.style.width = filteredAppliancesWidth + "px";
    else appliancesContainer.style.width = "300px";

    let filteredIngredientsHeight = document.getElementById("appliances").offsetHeight;
    appliancesContainer.style.height = (23 + filteredIngredientsHeight) + "px";
    document.getElementById("appliances").style.opacity = "1";
    toggleIcon(appliancesListIcon);
}

function onAppliancesFocusOut(event) {

    setTimeout(function () {
        document.getElementById("appliances").style.gridTemplateColumns = "max-content max-content max-content";
        appliancesListIcon.addEventListener("click", onAppliancesClick);
    }, 500);

    setTimeout(function () {
        inputAppliances.setAttribute("placeholder", "Appareils");
        inputAppliances.value = '';
    }, 250);

    setTimeout(function () {
        document.getElementById("appliances").style.opacity = "0";
        appliancesContainer.style.width = "150px";
        appliancesContainer.style.height = "23px";
    }, 100);

    toggleIcon(appliancesListIcon);
}

function onUtensilsClick(event) {
    inputUtensils.focus();
}

function onUtensilsFocus(event) {

    utensilsListIcon.removeEventListener("click", onUtensilsClick);

    if ((searchedRecipies.length == 0) && (tagsList.length == 0)) {
        for (const utensilFilter of utensilsList) {
            if (document.getElementById("utensils").contains(utensilFilter)) document.getElementById("utensils").removeChild(utensilFilter);
        }
        document.getElementById("utensils").style.gridTemplateColumns = "1fr";
    }

    setTimeout(function () {
        inputUtensils.setAttribute("placeholder", "Rechercher un ustensile");
    }, 250);

    let filteredUtensilsWidth = document.getElementById("utensils").clientWidth;
    if (filteredUtensilsWidth > 200) utensilsContainer.style.width = filteredUtensilsWidth + "px";
    else utensilsContainer.style.width = "300px";

    let filteredIngredientsHeight = document.getElementById("utensils").offsetHeight;
    utensilsContainer.style.height = (23 + filteredIngredientsHeight) + "px";
    document.getElementById("utensils").style.opacity = "1";
    toggleIcon(utensilsListIcon);
}

function onUtensilsFocusOut(event) {

    setTimeout(function () {
        document.getElementById("utensils").style.gridTemplateColumns = "max-content max-content max-content";
        utensilsListIcon.addEventListener("click", onUtensilsClick);
    }, 500);

    setTimeout(function () {
        inputUtensils.setAttribute("placeholder", "Ustensiles");
        inputUtensils.value = '';
    }, 250);

    setTimeout(function () {
        document.getElementById("utensils").style.opacity = "0";
        utensilsContainer.style.width = "150px";
        utensilsContainer.style.height = "23px";
    }, 100);

    toggleIcon(utensilsListIcon);
}

// ****** End of click and focus events

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

function deleteAllTags() {

    for (const tag of tagsList) {
        tagsContainer.removeChild(tag);
    }

    tagsList = [];
    filteredByTagsRecipies = [];
    tagsContainer.style.height = "0px";
}

function toggleIcon(listIcon) {
    if (listIcon.style.transform == "rotate(180deg)") {
        listIcon.style.transform = "rotate(0deg)";
    } else {
        listIcon.style.transform = "rotate(180deg)";
    }
}

function isRecipeNotSelectedByTags(recipe) {
    return (tagsList.length > 0) && !(isRecipeSelectedByIngredientTags(recipe.ingredientsList) && isRecipeSelectedByApplianceTags(recipe.appliance) && isRecipeSelectedByUtensilTags(recipe.utensilsList));
}

function isRecipeSelectedByIngredientTags(recipeIngredients) {
    ingredientTags = tagsList.filter(tag => tag.type == "ingredient");
    if (ingredientTags.length == 0) return true;
    for (const ingredientTag of ingredientTags) {
        if (!recipeIngredients.includes(ingredientTag.name.toLowerCase())) return false;
    }
    return true;
}

function isRecipeSelectedByApplianceTags(recipeAppliance) {
    applianceTags = tagsList.filter(tag => tag.type == "appliance");
    if (applianceTags.length == 0) return true;
    for (const applianceTag of applianceTags) {
        if (recipeAppliance.toLowerCase() == applianceTag.name.toLowerCase()) {
            return true;
        }
    }
    return false;
}

function isRecipeSelectedByUtensilTags(recipeUtensils) {
    utensilTags = tagsList.filter(tag => tag.type == "utensil");
    if (utensilTags.length == 0) return true;
    for (const utensilTag of utensilTags) {
        if (!recipeUtensils.includes(utensilTag.name.toLowerCase())) return false;
    }
    return true;
}

function isTagsListEmpty() {
    if (!tagsContainer.hasChildNodes()) tagsContainer.style.height = "0px";
}

function isFilterAlreadyDisplayed(filtersList, recipeFilter) {
    for (const filter of filtersList) {
        if (filter.name == recipeFilter.toLowerCase()) return true;
    }
    return false;
}

function deleteTags(event) {
    let tagDiv = event.target.closest('div');

    // new list of tags without the deleted one
    tagsList = tagsList.filter(tag => tag.name != tagDiv.innerText);

    tagsContainer.removeChild(tagDiv);
    onFilterSearch();
    setFiltersList();
    isTagsListEmpty();
}


function hasTagAlreadyBeenSelected(event) {

    for (const tag of tagsList) {
        if (tag.name == event.target.innerText) {
            tag.classList.add("alreadySelected");
            setTimeout(function () {
                tag.classList.remove("alreadySelected");
            }, 1500);
            return;
        }
    }

    generateNewTag(event);
}

function generateNewTag(event) {
    let tag = document.createElement('div');
    let tagName = event.target.innerText;
    tag.className = "tag";

    if (event.target.classList.contains("isIngredient")) {
        tag.innerHTML = '<p><span class="search__tags__name">' + tagName + '</span><i class="far fa-times-circle"></i></p>';
        tag.type = "ingredient";
        tag.name = tagName;
    } else if (event.target.classList.contains("isAppliance")) {
        tag.innerHTML = '<p><span class="search__tags__name">' + tagName + '</span><i class="far fa-times-circle"></i></p>';
        tag.type = "appliance";
        tag.name = tagName;
    } else if (event.target.classList.contains("isUtensil")) {
        tag.innerHTML = '<p><span class="search__tags__name">' + tagName + '</span><i class="far fa-times-circle"></i></p>';
        tag.type = "utensil";
        tag.name = tagName;
    }

    tag.classList.add("animationTag");
    setTimeout(function () {
        tag.classList.remove("animationTag");
    }, 1500);
    tag.querySelector('i').addEventListener("click", deleteTags);
    tagsList.push(tag);

    onFilterSearch();

    setTimeout(function () {
        setFiltersList();
    }, 500);

    if (tagsContainer.style.height < "54px") {
        tagsContainer.style.height = "54px";
        setTimeout(function () {
            tagsContainer.appendChild(tag);
        }, 250);
    } else tagsContainer.appendChild(tag);
}

function onFilterSearch() {

    if (searchedRecipies.length > 0) filteredRecipies = searchedRecipies;
    else filteredRecipies = recipies;

    for (const recipe of filteredRecipies) {

        recipe.selectedByTags = true;
        recipe.appendChild();
        if (isRecipeNotSelectedByTags(recipe)) {
            recipe.selectedByTags = false;
            recipe.removeChild();
        }
    }

    filteredByTagsRecipies = filteredRecipies.filter(recipe => recipe.selectedByTags);
    recipiesContainer.hasChildNodes() ? message.style.display = "none" : message.style.display = "flex";
}
