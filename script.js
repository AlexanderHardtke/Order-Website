let shoppingBasket = [];
let priceInBasket = [];
let basketAmount = [];
let liked = [0];

load();

function render() {
    loadLike();
    loadMenu();
    loadDishes();
    loadBasketContainer();
    loadBasket();
}

function loadDishes() {
    let favourite = document.getElementById('favourite');
    let special = document.getElementById('special');
    let drink = document.getElementById('drink');
    for (let i = 0; i < menus.length; i++) {
        const menu = menus[i];
        let price = numberToEuro(menu['price']);
        let name = menu['menu'];
        postMenu(menu, name, price, favourite, i);
    }
    for (let i = 0; i < specials.length; i++) {
        const menu = specials[i];
        let price = numberToEuro(menu['price']);
        let name = menu['menu'];
        postMenu(menu, name, price, special, i);
    }
    for (let i = 0; i < drinks.length; i++) {
        const menu = drinks[i];
        let price = numberToEuro(menu['price']);
        let name = menu['menu'];
        postMenu(menu, name, price, drink, i);
    }
}

function loadBasket() {
    if (shoppingBasket.length === 0) {
        showEmptyBasket();
    }
    else {
        showBasket();
    }
}

function showBasket() {
    document.getElementById('basket').innerHTML = ``
    for (let i = 0; i < shoppingBasket.length; i++) {
        showBasketItem(i);
    }
    showSubTotal(calcSubTotal());
    showTotal(calcTotal(deliveryCost()), deliveryCost());
    showTotalResponsive(calcTotal(deliveryCost()), itemAmount());
}

function showBasketResponsive() {
    document.getElementById('basketContainer').classList.remove('hideBasketResponsive');
    document.getElementById('closeBasket').classList.remove('dNone');
}

function hideBasketResponsive() {
    document.getElementById('basketContainer').classList.add('hideBasketResponsive');
    document.getElementById('closeBasket').classList.add('dNone');
    render();
}

function calcSubTotal() {
    let subTotal = 0;
    for (let i = 0; i < priceInBasket.length; i++) {
        let x = basketAmount[i];
        let y = priceInBasket[i];
        let amount = x * y;
        subTotal += amount;
    }
    return subTotal;
}

function deliveryCost() {
    let subTotal = calcSubTotal();
    let check = checkBox();
    if (check === 0) {
        return 0;
    }
    if (subTotal <= 19.99) {
        return 4.5;
    }
    return 0;

}

function calcTotal(delivery) {
    let subTotal = calcSubTotal()
    let total = delivery + subTotal;
    return total;
}

function itemAmount() {
    let sum = 0;
    for (let i = 0; i < basketAmount.length; i++) {
        sum += basketAmount[i];
    }
    return sum;
}

function addToBasket(name, price) {
    let i = getMenuIndex(name);
    if (i === -1) {
        shoppingBasket.push(name);
        priceInBasket.push(price);
        basketAmount.push(1);
        save();
        showBasket();
    }
    if (basketAmount >= 19) {
        alert("Maximal 20 Stück gestattet!");
    }
    else {
        basketAmount[i]++;
        save();
        showBasket();
    }
}

function subtractToBasket(name) {
    let i = getMenuIndex(name);
    if (basketAmount[i] === 1) {
        shoppingBasket.splice(i, 1);
        priceInBasket.splice(i, 1);
        basketAmount.splice(i, 1);
        basketAmount.filter(function (i) { return i });
        if (shoppingBasket.length === 0) {
            save();
            showEmptyBasket();
            showEmptyResponsive()
            return;
        }
        else {
            save();
            showBasket();
            return;
        }
    }
    else {
        basketAmount[i]--;
        save();
        showBasket();
    }
}

function getMenuIndex(menu) {
    let index = shoppingBasket.indexOf(menu);
    return index;
}

function numberToEuro(euro) {
    return euro.toFixed(2).replace(".", ",");
}

function checkBox() {
    let checkBox = document.getElementById('checkBox');
    if (checkBox.checked == true) {
        return 1;
    }
    return 0;
}

function payment() {
    let check = checkBox();
    if (check === 0) {
        alert('Vielen Dank für deine Bestellung, in 20-25 Minuten kannst du diese bei uns abholen.')
        clearBasket();
    }
    else {
        alert('Vielen Dank für deine Bestellung, unser Fahrer ist in 25-45 Minuten bei dir.')
        clearBasket();
    }
}

function clearBasket() {
    shoppingBasket = [];
    priceInBasket = [];
    basketAmount = [];
    save();
    showEmptyBasket();
    showEmptyResponsive()
}

function save() {
    let likedAsText = JSON.stringify(liked);
    let basketAsText = JSON.stringify(shoppingBasket);
    let priceAsText = JSON.stringify(priceInBasket);
    let amountAsText = JSON.stringify(basketAmount);
    localStorage.setItem('liked', likedAsText);
    localStorage.setItem('shoppingBasket', basketAsText);
    localStorage.setItem('priceInBasket', priceAsText);
    localStorage.setItem('basketAmount', amountAsText);
}

function load() {
    let likedAsText = localStorage.getItem('liked')
    let basketAsText = localStorage.getItem('shoppingBasket');
    let priceAsText = localStorage.getItem('priceInBasket');
    let amountAsText = localStorage.getItem('basketAmount');
    if (basketAsText && priceAsText && amountAsText && likedAsText) {
        liked = JSON.parse(likedAsText);
        shoppingBasket = JSON.parse(basketAsText);
        priceInBasket = JSON.parse(priceAsText);
        basketAmount = JSON.parse(amountAsText);
    }
}