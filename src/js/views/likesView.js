import { elements } from './base';

export const toggleLikeBtn = isLiked => {
    let iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
    document.querySelector('.recipe__love use').setAttribute('href',`img/icons.svg#${iconString}`);
    //icons.svg#icon-heart
    //href="img/icons.svg#icon-heart-outlined
}

export const toggleLikeMenu = numLikes => {
    elements.likesMenu.getElementsByClassName.visibility = numLikes > 0 ? 'visible' : 'hidden';
}