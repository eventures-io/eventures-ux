'use strict';


window.addEventListener('load', function() {
    var paperfold = $('.paperfold').paperfold({
        folds: 1,
        maxFoldHeight: 40,
        isOpen: true,
        topShadow: 'linear-gradient(black, rgba(white,.3))',
        bottomShadow:'linear-gradient(rgba(white,.3), black)'
    });

    $('.paperfold-toggle').click(paperfold.toggle);
});