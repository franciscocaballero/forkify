import uniqid from 'uniqid';

export default class List {
    constructor() {
        this.items = [];
    }

    addItem(count, unit, ingredient) {
        const item = {
            id: uniqid(),
            count,
            unit,
            ingredient
        }
        this.items.push(item);
        return item;
    }

    deleteItem(id) {
        const index = this.items.findIndex(el => el.id === id);
        // Checks to see if the id passed in matches

        this.items.splice(index, 1);
        // [2,4,6].splice(1, 2) -> returns [4,6] , original array is [2]; 
    }

    updateCount(id, newCount) {
        this.items.find(el => el.id === id).count = newCount;
    }
}