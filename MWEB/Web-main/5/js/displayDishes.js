document.addEventListener('DOMContentLoaded', () => {
    // Загружаем блюда и сортируем их по алфавиту
    const sortedDishes = dishes.sort((a, b) => a.name.localeCompare(b.name));

    // Контейнеры для секций с блюдами
    const soupContainer = document.querySelector('section:nth-of-type(1) .dish_block');
    const mainContainer = document.querySelector('section:nth-of-type(2) .dish_block');
    const saladsContainer = document.querySelector('section:nth-of-type(3) .dish_block');
    const drinkContainer = document.querySelector('section:nth-of-type(4) .dish_block');
    const dessertsContainer = document.querySelector('section:nth-of-type(5) .dish_block');

    const soupHeader = document.querySelector('section:nth-of-type(1) .dish_header');
    const mainHeader = document.querySelector('section:nth-of-type(2) .dish_header');
    const saladsHeader = document.querySelector('section:nth-of-type(3) .dish_header');
    const drinkHeader = document.querySelector('section:nth-of-type(4) .dish_header');
    const dessertsHeader = document.querySelector('section:nth-of-type(5) .dish_header');

    let menu = {
        soup: {
            State: '',
            Btns: ["мясной", "рыбный", "вегетарианский"]
        },
        main: {
            State: '',
            Btns: ["мясное", "рыбное", "вегетарианское"]
        },
        salads: {
            State: '',
            Btns: ["мясной", "рыбный", "вегетарианский"]
        },
        drink: {
            State: '',
            Btns: ["холодный", "горячий"],
        },
        desserts: {
            State: '',
            Btns: ["маленькая порция", "средняя порция", "большая порция"]
        }
    }

    // Функция для создания кнопок типов блюд
    const createDishKind = (kinds, category) => {
        const nav = document.createElement('nav');
        nav.className = 'dish_btns';

        const cheange_kind = (event) => {

            const buttons = nav.querySelectorAll(`.${category}`);
            buttons.forEach(button => {
                button.style.backgroundColor = ''; // Сбрасываем цвет
            });

            if (kinds.State != event.target.name) {
                kinds.State = event.target.name;
                event.target.style.backgroundColor = "#efefef"
            } else kinds.State = ''

            soupContainer.innerHTML = ""
            mainContainer.innerHTML = ""
            saladsContainer.innerHTML = ""
            drinkContainer.innerHTML = ""
            dessertsContainer.innerHTML = ""
            insert_cards();
            btn_order_update();
        }

        kinds.Btns.forEach(word => {
            const btn = document.createElement('button'); // Создаем новую кнопку для каждого слова
            btn.style.padding = "5px"
            btn.style.borderRadius = "15px"
            btn.classList.add('dish_nav_button'); // Добавляем первый класс к кнопке
            btn.classList.add(category); // Добавляем второй класс к кнопке
            btn.addEventListener('click', cheange_kind); // Добавляем обработчик события клика
            btn.name = word; // Устанавливаем имя кнопки
            btn.innerHTML = word; // Устанавливаем текст кнопки
            nav.appendChild(btn); // Добавляем кнопку в навигацию
        });

        return nav; // Возвращаем навигацию с кнопками
    };

    // Функция для создания карточки блюда
    const createDishCard = (dish) => {
        const card = document.createElement('div');
        card.className = 'dish_container';
        card.dataset.dish = dish.keyword;
        card.innerHTML = `
            <img src="${dish.image}" alt="${dish.name}" class="dish_image">
            <p class="dish_price">Цена: ${dish.price} руб.</p>
            <p class="dish_title">${dish.name}</p>
            <p class="dish_weight">Вес: ${dish.count}</p>
            <button class="dish_button">Заказать</button>
        `;
        return card;
    };

    // Разделяем блюда по категориям и добавляем в соответствующие контейнеры
    const insert_cards = () => {
        sortedDishes.forEach(dish => {
            const card = createDishCard(dish);
            if (dish.category === 'soup') {
                if ((menu.soup.State && dish.kind == menu.soup.State) || !menu.soup.State)
                    soupContainer.appendChild(card);
            } else if (dish.category === 'main_course') {
                if ((menu.main.State && dish.kind == menu.main.State) || !menu.main.State)
                    mainContainer.appendChild(card);
            } else if (dish.category === 'salads_starters') {
                if ((menu.salads.State && dish.kind == menu.salads.State) || !menu.salads.State)
                    saladsContainer.appendChild(card);
            } else if (dish.category === 'beverages') {
                if ((menu.drink.State && dish.kind == menu.drink.State) || !menu.drink.State)
                    drinkContainer.appendChild(card);
            } else if (dish.category === 'desserts') {
                if ((menu.desserts.State && dish.kind == menu.desserts.State) || !menu.desserts.State)
                    dessertsContainer.appendChild(card);
            }
        });
    }
    insert_cards();
    soupHeader.appendChild(createDishKind(menu.soup));
    mainHeader.appendChild(createDishKind(menu.main));
    saladsHeader.appendChild(createDishKind(menu.salads));
    drinkHeader.appendChild(createDishKind(menu.drink));
    dessertsHeader.appendChild(createDishKind(menu.desserts));
});
