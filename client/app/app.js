'use strict';
// TODO best practices JQuery
function openImageModal(imageName) {
    $('<div style="{width: 80vw}"><img src="/assets/images/' + imageName  + '.jpg" class="modal-img"></div>').appendTo('body').modal({
        fadeDuration: 300,
        fadeDelay: 0.90
    });
};

$(document).ready(function () {

    var toggleButtonText = function (element) {
        var buttonText = element.html() === 'read more' ? 'close' : 'read more';
        element.html(buttonText);
    };

    $('.work').load('app/work.html', function () {
        $('.read-btn.polestar').click(function () {
            $('.project-wrap.polestar').toggleClass('expanded');
            toggleButtonText($('.read-btn.polestar'));
        });
    });

});




