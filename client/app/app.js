'use strict';
// TODO follow best practices JQuery
function openImageModal(imageName) {
    $('<div><img src="/assets/images/' + imageName + '.jpg" class="modal-img"></div>').appendTo('body').modal({
        fadeDuration: 300,
        fadeDelay: 0.90
    });
};


function openContentModal(contentId) {
    var content = createVRTPersonasElement();
        content.appendTo('body').modal({
        fadeDuration: 300,
        fadeDelay: 0.90
    });

    content.slick({
        'dots': true
    });

};

function createVRTPersonasElement() {
    return $(
        '<div class="img-carousel" id="vrt-personas">' +
        '<img src="assets/images/vrt/persona-1.png">' +
        '<img src="assets/images/vrt/persona-2.png">' +
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
    if(stateVisible) {
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

    $('.main').load('app/' + section + '.html', function () {
        if (section === 'work') {
            $('.read-more').click(function (event) {
                var project = $(event.target).data('project');
                var article = $('article[data-project="' +  project  +  '"]');
                var closeIcon =  article.find('.close-icon');
                var projectContent = article.find('.project-content');
                if (projectContent.hasClass('expanded')) {
                    projectContent.removeClass('expanded');
                    setCollapseButtonText($(this), true);
                    setCloseIconVisible(closeIcon, false);
                } else {
                    collapseOpenProjects();
                    projectContent.addClass('expanded');
                    setCollapseButtonText($(this), false);
                    setCloseIconVisible(closeIcon, true);
                }
            });

            $('.close-icon').click(function() {
                collapseOpenProjects();
            });
        }
    });
};

$(document).ready(function () {

    navigate('work');

    var didScroll = false;
    var lastFromTop =  0;
    var isPaperfoldClosed = false;

    $(window).scroll(function() {
        didScroll = true;
    });

    setInterval(function(event) {
        if ( didScroll ) {
            didScroll = false;
            var fromTop = $(this).scrollTop();

            var scrollDirection = lastFromTop - fromTop < 0 ? 'up' : 'down';
            lastFromTop = fromTop;
            //console.log('from top: ' + fromTop + 'direction: ' + scrollDirection );
            if(fromTop <= 30 && scrollDirection === 'down' && isPaperfoldClosed) {
                paperfold.open();
                isPaperfoldClosed = false;
                $('.main').removeClass('fold-closed');
                return false;
            }

            if (fromTop > 30 && scrollDirection ===  'up' && !isPaperfoldClosed) {
                paperfold.close();
                $('.main').addClass('fold-closed');
                isPaperfoldClosed = true;
            }

        }
    }, 250);

    $('.menu-link').on('click', function (event) {
        event.preventDefault();
        var section = $(event.target).data('section');
        navigate(section);
    });


    var paperfold = $('.paperfold').paperfold({
        duration: 600,
        folds: 1,
        //maxFoldHeight: 40,
        isOpen: true,
        topShadow: 'linear-gradient(transparent, rgba(169 ,169, 169, 0.4)',
        bottomShadow: 'linear-gradient(rgba(169 ,169, 169, 0.4), transparent)'
    });

    $('.paperfold').click(paperfold.toggle);


    //$(window).resize(function() {
    //    if(screen.width == window.innerWidth){
    //        alert("you are on normal page with 100% zoom");
    //    } else if(screen.width > window.innerWidth){
    //        alert("you have zoomed in the page i.e more than 100%");
    //    } else {
    //        alert("you have zoomed out i.e less than 100%")
    //    }
    //});


});




