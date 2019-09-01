import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import {
    elements,
    renderLoader,
    clearLoader
} from './views/base';


//GLOBAL STATE OF THE APP
/**
 - Search Object
 - Current recipe object
 - Shopping list object
 - Liked recipes
 */

const state = {};
window.state = state;

//SEARCH CONTROLLER 
const controlSearch = async () => {
    //1) Get query from View 
    const query = searchView.getInput(); //TODO
    // const query = 'pizza'; //TESTING 
    // console.log(query)

    if (query) {
        //2) New Search object and add to state 
        state.search = new Search(query);

        // 3) Prepare the UI for the results 
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);
        //4) search for recipes
        try {
            await state.search.getResults();

            //5) Render the results on UI
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch (err) {
            alert("ERROR processing result");
            clearLoader();
        }
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

// FOR TESTING 
// window.addEventListener('load', e => {
//     e.preventDefault();
//     controlSearch();
// });

elements.searchResPages.addEventListener('click', e => {

    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
        console.log(goToPage);
    }
});

//Recipe CONTROLLER 

const r = new Recipe(47025);
r.getRecipe();
console.log(r);

const controlRecipe = async () => {
    // Get ID from URL 
    const id = window.location.hash.replace('#', ''); //Entire URL "removing the hash sign"
    console.log(id);

    if (id) {
        // Prepare UI for Changes 
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        //Highlight the selected search item
        if (state.search) searchView.highlightSelected(id);
        // Create a new recipe object 
        state.recipe = new Recipe(id);

        // //TESTING 
        // window.r = state.recipe;
        try {

            // Get recipe data and parse Ingredients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();


            // Calculate servings and time 
            state.recipe.calcTime();
            state.recipe.calcServings();

            // Render recipe

            clearLoader();
            recipeView.renderRecipe(
                state.recipe,
                state.likes.isLiked(id)
                );
        } catch (err) {
            // alert('ERROR processing recipe');

            console.log(err);
        }

    }

};

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);
// ^^^^ Cuts down amount of lines 

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

//******* LIST CONTROLLER ************

const controlList = () => {
    //Create a new list IF there is none yet
    if (!state.list) state.list = new List();


    // Add each ingredients to the list and UI
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    });

}

//Handle Delete and update list item events 
elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    // handle the delete button
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        // Delete from state 
        state.list.deleteItem(id);

        // Delete from user UI
        listView.deleteItem(id);

        //Handel the count update
    } else if (e.target.matches('.shopping__count-value')) {
        const val = parseFloat(e.target.value, 10);
        state.list.updateCount(id, val);
    }
});

//******* LIKES CONTROLLER ************
// TESTING
state.likes = new Likes();
likesView.toggleLikeMenu(state.likes.getNumLikes());

const controlLike = () => {
    if(!state.likes) state.likes = new Likes();
    const currentID = state.recipe.id;

    // User has not yet liked current recipe
    if (!state.likes.isLiked(currentID)){
        //Add like to the state
        const newLike = state.likes.addLike(
            currentID,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
        );
        // Toggle the like button 
            likesView.toggleLikeBtn(true);
        // Add like to UI list 
            likesView.renderLike(newLike);
            console.log(state.likes);
        // User has Liked current recipe
    } else {
        //Remove like to the state
        state.likes.deleteLike(currentID);
        // Toggle the like button 
        likesView.toggleLikeBtn(false);
        // Remove like to UI list 
        likesView.deleteLike(currentID);
        console.log(state.likes);
    }
    likesView.toggleLikeMenu(state.likes.getNumLikes());
};



//Handling recipe button clicks 
elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        // Decrease btn is clicked
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);

        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        // Increase btn is clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        //Add to list
        controlList();
    } else if (e.target.matches('.recipe__love, .recipe__love')) {
        // Likes conmtroller 
        controlLike();
    }
    // console.log(state.recipe);
});


window.l = new List();