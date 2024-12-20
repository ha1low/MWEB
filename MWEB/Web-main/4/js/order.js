const order = {
    soup: null,
    mainDish: null,
    drink: null,
    totalPrice: 0,
};

function updateOrder() {
    document.querySelector('#soup-name').textContent = '';
    document.querySelector('#main-name').textContent = '';
    document.querySelector('#drink-name').textContent = '';

    document.querySelector('#soup-title').style.display = 'none';
    document.querySelector('#main-title').style.display = 'none';
    document.querySelector('#drink-title').style.display = 'none';

    if (order.soup) {
        document.querySelector('#soup-name').textContent = `Суп: ${order.soup.name} (${order.soup.price}₽)`;
        document.querySelector('#soup-title').style.display = 'block';
    }

    if (order.mainDish) {
        document.querySelector('#main-name').textContent = `Основное блюдо: ${order.mainDish.name} (${order.mainDish.price}₽)`;
        document.querySelector('#main-title').style.display = 'block';
    }

    if (order.drink) {
        document.querySelector('#drink-name').textContent = `Напиток: ${order.drink.name} (${order.drink.price}₽)`;
        document.querySelector('#drink-title').style.display = 'block';
    }

    order.totalPrice = (order.soup?.price || 0) + (order.mainDish?.price || 0) + (order.drink?.price || 0);
    
    document.querySelector('#order-total span').textContent = `${order.totalPrice}₽`;
    
    document.querySelector('#order-total').style.display = order.totalPrice > 0 ? 'block' : 'none';

    const isAnyDishSelected = order.soup || order.mainDish || order.drink;
    document.querySelector('#order-summary').style.display = isAnyDishSelected ? 'block' : 'none';
    document.querySelector('#nothing-selected').style.display = isAnyDishSelected ? 'none' : 'block';
    document.querySelector('#hidden-total').value = `${order.totalPrice}₽`;

    document.querySelector('#order-soup').style.display = order.soup ? 'block' : 'none';
    document.querySelector('#order-main').style.display = order.mainDish ? 'block' : 'none';
    document.querySelector('#order-drink').style.display = order.drink ? 'block' : 'none';
}

function addDish(type, name, price) {
    order[type] = { name, price };
    updateOrder();
}

document.querySelectorAll('#soups .dish button').forEach(button => {
    button.addEventListener('click', (e) => {
        const dish = e.target.closest('.dish');
        const name = dish.querySelector('.name').textContent;
        const price = parseInt(dish.querySelector('.price').textContent);
        addDish('soup', name, price);
    });
});

document.querySelectorAll('#main-dishes .dish button').forEach(button => {
    button.addEventListener('click', (e) => {
        const dish = e.target.closest('.dish');
        const name = dish.querySelector('.name').textContent;
        const price = parseInt(dish.querySelector('.price').textContent);
        addDish('mainDish', name, price);
    });
});

document.querySelectorAll('#drinks .dish button').forEach(button => {
    button.addEventListener('click', (e) => {
        const dish = e.target.closest('.dish');
        const name = dish.querySelector('.name').textContent;
        const price = parseInt(dish.querySelector('.price').textContent);
        addDish('drink', name, price);
    });
});

document.querySelector('button[type="reset"]').addEventListener('click', () => {
    order.soup = null;
    order.mainDish = null;
    order.drink = null;
    order.totalPrice = 0;
    
    updateOrder();
});
