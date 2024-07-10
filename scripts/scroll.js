window.onscroll = function () {
    stickyMenu(), stickyBasket(), activeMenu()
};

function stickyMenu() {
    let header = document.getElementById("menuHeader");
    if (window.pageYOffset > 506) {
        header.classList.add("stickyMenu");
    } else {
        header.classList.remove("stickyMenu");
    }
}

function stickyBasket() {
    let header = document.getElementById("basketContainer");
    if (window.pageYOffset > 80) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
}

function activeMenu() {
    let fav = document.getElementById('catFav');
    let spec = document.getElementById('catSpec');
    let drink = document.getElementById('catDrink');
    if (window.pageYOffset >= 506) {
        fav.classList.add("darkCategory");
        spec.classList.remove("darkCategory");
        if (window.pageYOffset >= 1230) {
            spec.classList.add("darkCategory");
            fav.classList.remove("darkCategory");
            drink.classList.remove("darkCategory");
            if (window.pageYOffset >= 1500) {
                spec.classList.remove("darkCategory");
                drink.classList.add("darkCategory");
            }
        }
    }
    else {
        fav.classList.remove("darkCategory");
    }
}
