'use strict';
// TODO best practices JQuery
function openImageModal(imageName) {
    $('<div><img src="/assets/images/' + imageName + '.jpg" class="modal-img"></div>').appendTo('body').modal({
        fadeDuration: 300,
        fadeDelay: 0.90
    });
};

function toggleButtonText(element) {
    var buttonText = element.html() === 'read more' ? 'close' : 'read more';
    element.html(buttonText);
};

function navigate(section) {

    $('.main').load('app/' + section + '.html', function () {
        if (section === 'work') {
            $('.read-btn.polestar').click(function () {
                $('.project-wrap.polestar').toggleClass('expanded');
                toggleButtonText($('.read-btn.polestar'));
            });
        }
    });

}

$(document).ready(function () {

    navigate('work');

    $('.menu-link').on('click', function (event) {
        event.preventDefault();
        var section = $(event.target).data('section');
        if (section !== 'contact') {
            navigate(section);
        }
    });

    var paperfold = $('.paperfold').paperfold({
        duration: 300,
        folds: 1,
        //maxFoldHeight: 40,
        isOpen: true,
        topShadow: 'linear-gradient(transparent, rgba(169 ,169, 169, 0.4)',
        bottomShadow: 'linear-gradient(rgba(169 ,169, 169, 0.4), transparent)'
    });

    $('.paperfold').click(paperfold.toggle);


});




