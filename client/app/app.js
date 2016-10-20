'use strict';
// TODO follow best practices JQuery
var activePage = 'work';
var paperfold;

function openImageModal(imageName) {
    $('<div><img src="/assets/images/' + imageName + '" class="modal-img"></div>').appendTo('body').modal({
        closeClass: 'icon-remove',
        closeText: 'x',
        fadeDuration: 300,
        fadeDelay: 0.90
    });
};


function openContentModal(contentId) {
    var content = createVRTPersonasElement();
    content.appendTo('body').modal({
        closeClass: 'icon-remove',
        closeText: 'x',
        fadeDuration: 300,
        fadeDelay: 0.90
    });

    content.slick({
        'dots': true,
        prevArrow:"<img class='a-left control-c prev slick-prev' src='../assets/icons/previous.png'>",
        nextArrow:"<img class='a-right control-c next slick-next' src='../assets/icons/next.png'>"
    });

};

function createVRTPersonasElement() {
    return $(
        '<div class="img-carousel" id="vrt-personas">' +
        '<img src="assets/images/vrt/persona-1.png">' +
        '<img src="assets/images/vrt/persona-2.png">' +
        '<img src="assets/images/vrt/persona-3.png">' +
        '</div>'
    )
}


function setCollapseButtonText(element, stateClosed) {
    if (stateClosed) {
        element.html('read more');
    } else {
        element.html('close');
    }
};

function setCloseIconVisible(element, stateVisible) {
    if (stateVisible) {
        element.addClass('visible');
    } else {
        element.removeClass('visible');
    }
};

function collapseOpenProjects() {
    $('.project-content').each(function () {
        if ($(this).hasClass('expanded')) {
            $(this).removeClass('expanded');
            setCollapseButtonText($(this).parent().find('.read-more'), true);
            setCloseIconVisible($(this).parent().find('.close-icon'), false);
        }
    })
};

function navigate(section) {
    window.scrollTo(0, 0);
    $('.main').load('app/' + section + '.html', function () {
        activePage = section;
        if (section === 'work') {
            $('.read-more').click(function (event) {
                toggleProject(event);
            });
            $('.project-title').click(function (event) {
                toggleProject(event);
            });

        }
    });
};

function toggleProject(event) {
    var article = $(event.target).closest('article');
    var project = article.data('project');
    var closeIcon = article.find('.close-icon');
    var projectContent = article.find('.project-content');
    if (projectContent.hasClass('expanded')) {
        projectContent.removeClass('expanded');
        setCollapseButtonText(article.find('.read-more'), true);
        setCloseIconVisible(closeIcon, false);
    } else {
        collapseOpenProjects();
        projectContent.addClass('expanded');
        setCollapseButtonText(article.find('.read-more'), false);
        setCloseIconVisible(closeIcon, true);
    }
}

$(document).ready(function () {

    navigate('work');


    var didScroll = false;
    var lastFromTop = 0;
    var isPaperfoldClosed = false;

    $(window).scroll(function () {
        didScroll = true;
    });

    setInterval(function (event) {
        if (didScroll) {
            didScroll = false;
            var fromTop = $(this).scrollTop();

            var scrollDirection = lastFromTop - fromTop < 0 ? 'up' : 'down';
            lastFromTop = fromTop;
            //console.log('from top: ' + fromTop + 'direction: ' + scrollDirection );
            if (fromTop <= 30 && scrollDirection === 'down' && isPaperfoldClosed) {
                paperfold.open();
                isPaperfoldClosed = false;
                $('.main').removeClass('fold-closed');
                return false;
            }

            if (fromTop > 0 && scrollDirection === 'up' && !isPaperfoldClosed) {
                paperfold.close();
                $('.main').addClass('fold-closed');
                isPaperfoldClosed = true;
            }

        }
    }, 450);

    $('.menu-link').on('click', function (event) {
        event.preventDefault();
        $('.menu-link').removeClass('active');
        $(event.target).addClass('active');
        var section = $(event.target).data('section');
        navigate(section);
    });

    paperfold = $('.paperfold').paperfold({
        duration: 400,
        folds: 1,
        //maxFoldHeight: 40,
        isOpen: true,
        topShadow: 'linear-gradient(transparent, rgba(169 ,169, 169, 0.4)',
        bottomShadow: 'linear-gradient(rgba(169 ,169, 169, 0.4), transparent)'
    });



});



