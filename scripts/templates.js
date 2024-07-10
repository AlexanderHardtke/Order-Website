let menus = [
    {
        'menu': 'Pizza Salami',
        'description': 'Der Klassiker mit scharfer Salami',
        'pic': 'img/salamiPizza.jpg',
        'price': 11.90,
        'amount': '',
    },
    {
        'menu': 'Pizza Mozarella',
        'description': 'Tomatenpizza mit Büffelmozzarella',
        'pic': 'img/mozarellaPizza.jpg',
        'price': 9.90,
        'amount': '',
    },
    {
        'menu': 'Pizza Prosciutto',
        'description': 'Pizza mit Schinken und Tomatensauce',
        'pic': 'img/hamPizza.jpg',
        'price': 10.90,
        'amount': '',
    },
    {
        'menu': 'Pizza Spinat',
        'description': 'Spinatpizza mit Ziegenkäse',
        'pic': 'img/spinachPizza.jpg',
        'price': 10.50,
        'amount': '',
    }
]

let specials = [
    {
        'menu': 'Pizzaherz',
        'description': 'Für alle Verliebten unsere Spezialpizza mit Belag nach Wunsch.',
        'pic': 'img/heartPizza.jpg',
        'price': 14.90,
        'amount': '',
    }
]

let drinks = [
    {
        'menu': 'Softdrink 0,33L(nach Wahl)',
        'description': 'Außwahl an Softdrinks in der Dose',
        'pic': 'img/drincCan.jpg',
        'price': 2.25,
        'amount': '',
    },
    {
        'menu': 'Fruchtsäfte 0,33L(nach Wahl)',
        'description': 'Außwahl an Fruchtsäften in der Glasflasche',
        'pic': 'img/fruchtsaft.png',
        'price': 2.85,
        'amount': '',
    }
]

let ratings = [
    {
        'user': 'Anonym',
        'comments': 'Super leckere Pizza aber haben leider etwas länger auf die Lieferung warten müssen',
    },
    {
        'user': 'Alex',
        'comments': 'Beste Pizzaladen in der Stadt!!!',
    }
]

function evaluation() {
    document.getElementById('infoBox').innerHTML = /*html*/`
        <div class="dFlexAlignCent infoBoxTitle">
            <h6>Bewertungen:</h6>
            <a><img onclick="hideOverlay()" class="closeX" src="./img/icons/x.png"></a>
        </div>
        <div class="users" id="users"></div>
    `;
}

function showAccount() {
    document.getElementById('infoBox').innerHTML = /*html*/`
        <div class="dFlexAlignCent infoBoxTitle">
            <h6>Mein Account</h6>
            <a><img onclick="hideOverlay()" class="closeX" src="./img/icons/x.png"></a>
        </div>
        <div class="accountButtons">
            <button class="myAccountButton">Anmelden</button>
            <button class="createAccountButton">Account erstellen</button>
        </div>
    `
}

function postRating(ratings, user) {
    user.innerHTML += /*html*/`
    <div class="ratingBox">
        <h5>${ratings['user']}</h5>
        <div class="ratingComment">${ratings['comments']}</div>
    </div>
    `
}

function loadMenu() {
    document.getElementById('recipees').innerHTML = /*html*/`
        
        <div class="offsetBox" id="offsetFav"></div>
        <div id="favourite" class="recipees">
            <div class="recipeeHead">
                Beliebt<img class="favHeart" src="./img/icons/heart.png">
            </div>
        </div>
        
        <div class="offsetBox" id="offsetSpec"></div>
        <div id="special" class="recipees">
            <div class="recipeeHead">
                Spezial
            </div>
        </div>
        
        <div class="offsetBox" id="offsetDrink"></div>
        <div id="drink" class="recipees">
            <div class="recipeeHead">
                Getränke
            </div>
        </div>
    `
}

function postMenu(menu, name, price, post, i) {
    post.innerHTML += /*html*/`
    <div class="postBox" id="postBox${i}">
        <h5>${menu['menu']}</h5>
        <img onclick="addToBasket('${name}',${menu['price']})" class="addButton" src="./img/icons/orangeX.png">
        <div class="description">${menu['description']}</div>
        <div class="price">${price}€</div>
        <img class="menuPic" src="${menu['pic']}">
    </div>
    `
}

function loadBasketContainer() {
    document.getElementById('basketContainer').innerHTML = /*html*/`
            <div class="verticalSeperator"></div>
            <h4>Warenkorb</h4>
            <img onclick="hideBasketResponsive()" id="closeBasket" class="closeBasketBtn dNone" src="./img/icons/x.png">
            <div class="sliderBox">
                <input onchange="loadBasket()" id="checkBox" type="checkbox" checked />
                <div class="slider"></div>
                <div class="sliderLeft"><img src="./img/icons/mtb-bike.png" class="symbol">Lieferung<br>25-45 min</div>
                <div class="sliderRight"><img src="./img/icons/bag.png" class="symbol">Abholung<br>20-25 min</div>
            </div>
            <div class="basket" id="basket"></div>
            `;
}

function showEmptyBasket() {
    document.getElementById('basket').innerHTML = /*html*/`
        <h4>Fülle deinen Warenkorb</h4>
        <div>Füge leckere Pizzen aus der Speisekarte hinzu und bestelle dein Essen.</div>
    `
}

function showBasketItem(i) {
    document.getElementById('basket').innerHTML += /*html*/`
        <div class="basketLine">
            <b>${basketAmount[i]} x ${shoppingBasket[i]}</b>
            <i>${numberToEuro(priceInBasket[i])}€</i>
        </div>
        <div class="dFlexEnd">
            <button onclick="subtractToBasket('${shoppingBasket[i]}')" class="basketButton">-</button>
            <button onclick="addToBasket('${shoppingBasket[i]}',${basketAmount[i]})" class="basketButton">+</button>
        </div>
        `
}

function showSubTotal(subTotal) {
    document.getElementById('basket').innerHTML += /*html*/`
        <div class="basketLine">
        <ins>Zwischensumme: </ins>
        <b>${numberToEuro(subTotal)}€</b>
        </div>
    `
}

function showTotal(total, delivery) {
    document.getElementById('basket').innerHTML += /*html*/`
        <div class="basketLine">
            <ins>Lieferkosten: </ins>
            <b>${numberToEuro(delivery)}€</b>
        </div>
        <div class="basketLine">
            <ins><b>Gesamt</b></ins>
            <ins><b>${numberToEuro(total)}€</b></ins>
        </div>
        <button onclick="payment()" class="buyButton">Bezahlen (${numberToEuro(total)}€)</button>
    `
}

function showEmptyResponsive() {
    document.getElementById('basketButtonResponsive').innerHTML = /*html*/`
    Warenkorb`;
}

function showTotalResponsive(total, amounts) {
    document.getElementById('basketButtonResponsive').innerHTML = /*html*/`
    <div>
        <div onclick="payment()" class="countAmounts">${amounts}</div>
        Warenkorb(${numberToEuro(total)}€)
    </div>
    `;
}