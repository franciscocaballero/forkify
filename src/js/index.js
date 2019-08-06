import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';
//Global State of the App
/**
 - Search Object
 - Current recipe object
 - Shopping list object
 - Liked recipes
 */

const state = {};

//Search CONTROLLER 
const controlSearch = async () => {
    //1) Get query from View 
    const query = searchView.getInput(); //TODO
    console.log(query)

    if (query) {
        //2) New Search object and add to state 
        state.search = new Search(query);

        // 3) Prepare the UI for the results 
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);
        //4) search for recipes
        
         await state.search.getResults();
         
         //5) Render the results on UI
        clearLoader();
        searchView.renderResults(state.search.result);
    }
}






elements.searchForm.addEventListener('submit',e => {
    e.preventDefault();
    controlSearch();
});

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





// const search = new Search('pizza');
// console.log(search);

// search.getResults();