'use strict';

$(window).on('load', function () {
    $( '.work' ).load( 'app/work.html' );

    $('.read-btn').click(function(event) {
        event.target.parent.addClass('expanded');
    });
    
});


