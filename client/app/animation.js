'use strict';


window.addEventListener('load', function () {
    var paperfold = $('.paperfold').paperfold({
        duration: 300,
        folds: 1,
        maxFoldHeight: 40,
        isOpen: true,
        topShadow: 'linear-gradient(transparent, rgba(169 ,169, 169, 0.4)',
        bottomShadow: 'linear-gradient(rgba(169 ,169, 169, 0.4), transparent)'
    });

    $('.menu').click(paperfold.toggle);
});