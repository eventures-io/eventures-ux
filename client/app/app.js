'use strict';
// TODO best practices JQuery
function openImageModal(imageName) {
    $('<div><img src="/assets/images/' + imageName + '.jpg" class="modal-img"></div>').appendTo('body').modal({
        fadeDuration: 300,
        fadeDelay: 0.90
    });
};

function setCollapseButtonText(element, stateClosed) {
    if (stateClosed) {
        element.html('read more');
    } else {
        element.html('close');
    }
};

function collapseOpenProjects() {
    $('.project-wrap').each(function () {
        if ($(this).hasClass('expanded')) {
            $(this).removeClass('expanded');
            setCollapseButtonText($(this).parent().find('.read-btn'), true);
        }
    })
}

function navigate(section) {

    $('.main').load('app/' + section + '.html', function () {
        if (section === 'work') {
            $('.read-btn').click(function (event) {
                var project = $(event.target).data('project');
                var collapseButton = $('.read-btn.' + project);
                var projectWrap = $('.project-wrap.' + project);
                if (projectWrap.hasClass('expanded')) {
                    projectWrap.removeClass('expanded');
                    setCollapseButtonText($(this), true);
                } else {
                    collapseOpenProjects();
                    projectWrap.addClass('expanded');
                    setCollapseButtonText($(this), false);
                }
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




