function rating() {
    showOverlay();
    loadRating();
}

function pizzaInfo() {
    showOverlay();
    showInfo();
}

function review() {
    blackHeart();
    showOverlay();
}

function burgerMenu() {
    showOverlay();
    showAccount();
}

function like() {
    if (liked == 0) {
        liked++;
        save();
        loadLike();
    }
    else {
        liked--;
        save();
        loadLike();
    }
}

function loadRating() {
    evaluation();
    let user = document.getElementById('users');
    for (let i = 0; i < ratings.length; i++) {
        const rating = ratings[i];
        postRating(rating, user);
    }
}

function showInfo() {
    document.getElementById('infoBox').innerHTML = /*html*/`
        <div class="dFlexAlignCent infoBoxTitle">
            <h6>Über uns</h6>
            <a><img onclick="hideOverlay()" class="closeX" src="./img/icons/x.png"></a>
        </div>
        <iframe class="maps" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1317.2621264445095!2d10.151976753199774!3d48.67634063003771!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47991675b49c8681%3A0xb9f8c8b940729a63!2sRathaus%20Heidenheim%20an%20der%20Brenz!5e0!3m2!1sde!2sde!4v1720409174897!5m2!1sde!2sde" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        <b><img src="./img/icons/clock.png" class="clockSymbol">Lieferzeiten</b>
        <b><ins>Montag - Sonntag</ins></b>
        <ins>14:00 - 23:30 Uhr</ins>
    `
}

function loadLike() {
    if (liked == 1) {
        document.getElementById('blackHeart').classList.add('dNone');
        document.getElementById('redHeart').classList.remove('dNone');
    }
    else {
        document.getElementById('redHeart').classList.add('dNone');
        document.getElementById('blackHeart').classList.remove('dNone');
    }
}

function showOverlay() {
    document.getElementById('overlay').classList.add('dFlexAlignCent');
}

function hideOverlay() {
    document.getElementById('overlay').classList.remove('dFlexAlignCent');
}