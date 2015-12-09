/**
 * Created by cz on 2015/12/8.
 */
$(document).ready(function () {
    // Cache the Window object
    $window = $(window);

    $('section[data-title="pic"]').each(function () {
        var $bgobj = $(this); // assigning the object

        $(window).scroll(function () {

            // Scroll the background at var speed
            // the yPos is a negative value because we're scrolling it UP!

            var yPos = -($window.scrollTop() / $bgobj.attr('data-speed'))+$window.scrollTop();
            if ($bgobj.data('height')) {
                yPos -= $bgobj.data('height');
            }
            // Put together our final background position
            var coords = '50% ' + yPos + 'px';

            // Move the background
            $bgobj.css({
                backgroundPosition: coords
        });
    }); // window scroll Ends
});
});

