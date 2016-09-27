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

function setCloseIconVisible(parentElement, stateVisible) {
    if(stateVisible) {
        parentElement.find('.close-icon').addClass('visible');
    } else {
        parentElement.find('.close-icon').removeClass('visible');
    }
}

function collapseOpenProjects() {
    $('.project-main').each(function () {
        if ($(this).hasClass('expanded')) {
            $(this).removeClass('expanded');
            setCollapseButtonText($(this).parent().find('.read-btn'), true);
            setCloseIconVisible($(this).parent(), false);
        }
    })
}

function navigate(section) {

    $('.main').load('app/' + section + '.html', function () {
        if (section === 'work') {
            $('.read-btn').click(function (event) {
                var project = $(event.target).data('project');
                var collapseButton = $('.read-btn.' + project);
                var projectMain = $('.project-main.' + project);
                if (projectMain.hasClass('expanded')) {
                    projectMain.removeClass('expanded');
                    setCollapseButtonText($(this), true);
                    setCloseIconVisible(projectMain.parent(), false);
                } else {
                    collapseOpenProjects();
                    projectMain.addClass('expanded');
                    setCollapseButtonText($(this), false);
                    setCloseIconVisible(projectMain.parent(), true);
                }
            });

            $('.close-icon').click(function() {
                collapseOpenProjects();
            });
        }


    });

}

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
            console.log('from top: ' + fromTop + 'direction: ' + scrollDirection );
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
        if (section !== 'contact') {
            navigate(section);
        }
    });


    var paperfold = $('.paperfold').paperfold({
        duration: 800,
        folds: 1,
        //maxFoldHeight: 40,
        isOpen: true,
        topShadow: 'linear-gradient(transparent, rgba(169 ,169, 169, 0.4)',
        bottomShadow: 'linear-gradient(rgba(169 ,169, 169, 0.4), transparent)'
    });

    $('.paperfold').click(paperfold.toggle);


});




