function sortMeals(meals) {
    const categorizedMeals = {};

    meals.forEach(meal => {
        if (!categorizedMeals[meal.category]) {
            categorizedMeals[meal.category] = [];
        }
        categorizedMeals[meal.category].push(meal);
    });

    for (const category in categorizedMeals) {
        categorizedMeals[category].sort((a, b) => a.name.localeCompare(b.name));
    }

    return categorizedMeals;
}

function displayMeals(categorizedMeals) {
    for (const category in categorizedMeals) {
        const section = document.getElementById(category);
        const menuGrid = section.querySelector('.menu-grid');
        menuGrid.innerHTML = '';

        categorizedMeals[category].forEach(meal => {
            const mealItem = document.createElement('div');
            mealItem.className = 'dish';
            mealItem.innerHTML = `
                <img src="${meal.image}" alt="${meal.name}">
                <p class="price">${meal.price}₽</p>
                <p class="name">${meal.name}</p>
                <p class="weight">${meal.count}</p>
                <button data-name="${meal.name}" data-price="${meal.price}">Добавить</button>
            `;
            menuGrid.appendChild(mealItem);
        });

        menuGrid.style.display = 'grid';
    }
}

const sortedMeals = sortMeals(meals);
displayMeals(sortedMeals);