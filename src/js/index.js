import Search from '../models/Search';
import * as searchView from '../views/searchView';
import { elements } from '../views/base';
//Global State of the App
/**
 - Search Object
 - Current recipe object
 - Shopping list object
 - Liked recipes
 */

const state = {};

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
        //4) search for recipes

         await state.search.getResults();

        //5) Render the results on UI
        searchView.renderResults(state.search.result);
        
    }
}


elements.searchForm.addEventListener('submit',e => {
    e.preventDefault();
    controlSearch();
});


// const search = new Search('pizza');
// console.log(search);

// search.getResults();