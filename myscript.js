var fastkeys_array = [0,1,2,3,4,5,6,7,8,9];
var googleLinkSelector = 'h3.r a';

$(window).on('DOMContentLoaded load resize scroll', function () {
    refreshFastkeys();
}); 

$(document).ready(function() {
    refreshFastkeys();
});

function refreshFastkeys() 
{
    refreshElsInViewport(false);
    refreshElsInViewport(true);
}

function refreshElsInViewport(inViewPort)
{
    $(googleLinkSelector).each(function() {
        if ( isElementInViewport($(this)) == inViewPort )
            if (!inViewPort)
                remove_fastkey($(this));
            else
                addFastKey($(this));
    })
}

function isElementInViewport (el) {

    if (typeof jQuery === "function" && el instanceof jQuery) 
        el = el[0];

    var rect = el.getBoundingClientRect();

    return (
        rect.bottom >= 0 &&
        rect.left >= 0 &&
        rect.bottom<= (window.innerHeight || document.documentElement.clientHeight) && 
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) 
    );
}

function elementHasFastKey(element)
{
    if ( element.prev().hasClass("fastkey") )
        return true;
    return false;
}

function addFastKey(element)
{
    if (elementHasFastKey(element))
        return;

    var fastkey_l = fastkeys_array.shift();
    if (fastkey_l != null){
        element.before(
            $('<span />',{
                'class':'fastkey',
                'id':'idfk'+fastkey_l,
                'style':'font-size:12px;color:grey;padding-right:5px',
                'html':fastkey_l } )
            );
    }
}

function remove_fastkey(element)
{
    if ( elementHasFastKey(element) ){
        var fastkey_l = element.prev().html();
        fastkeys_array.push(fastkey_l);
        element.prev().remove();
    }
}

$(document).keydown(function(e) {
    var key_number = e.which-48;
    if (e.metaKey && key_number >= 0 && key_number <= 9 ) {
        // 0-9 keys
        if ( $("#idfk"+key_number).length ){
            var new_tab_href = $("#idfk"+key_number).next().attr("href");
            var win = window.open(new_tab_href, '_blank');
            if (win) {
                win.focus();
            } else {
                alert('Please allow popups if you want to enable fast googling.');
            }
        }
    }
});

