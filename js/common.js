function ready() {
    var windowWidth = window.innerWidth;

    if ( windowWidth < 768) {
        var $textForSwap = document.querySelectorAll('.about__text')[2];

        $textForSwap.remove();
        document.querySelector('.about .container').appendChild($textForSwap);
    }
}

document.addEventListener("DOMContentLoaded", ready);
