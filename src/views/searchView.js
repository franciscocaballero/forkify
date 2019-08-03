import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
}

export const clearResults = () => {
    elements.searchResList.innerHTML = ''
}

const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if(title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length; //update acc
        }, 0);

        //return the result 
        return `${newTitle.join(' ')}...`;
    }
    return title; // else return title 
}

const renderRecipe = recipe => {
    const markup = ` 
    <li>
    <a class="results__link" href="#${recipe.recipe_id}">
    <figure class="results__fig">
    <img src="${recipe.image_url}" alt="${recipe.title}">
    </figure>
    <div class="results__data">
    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
    <p class="results__author">${recipe.publisher}</p>
    </div>
    </a>
    </li>
    `
    console.log(elements.searchResList)
    // console.log(markUp);
elements.searchResList.insertAdjacentHTML('beforeend', markup);

}


//type: prev or next
const createButton = (page, type) => `
<button class="btn-inline results__btn--prev">
<svg class="search__icon">
    <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
</svg>
<span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
</button>




<button class="btn-inline results__btn--next">
<span>Page 3</span>
<svg class="search__icon">
    <use href="img/icons.svg#icon-triangle-right"></use>
</svg>
</button>
`;

const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage); // Round pages to the nearest whole Num 

    if(page === 1 && pages > 1){
        // ONLY btn to go to the next page.
    } else if(page < pages) {
        // Both btns
    } else if (page === pages && pages > 1) {
        // ONLY btn to got to previous page.
    } 
};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    const start = (page -1) * resPerPage;
    const end = page * resPerPage;



    // console.log(recipes);
    recipes.slice(start, end).forEach(renderRecipe);
}