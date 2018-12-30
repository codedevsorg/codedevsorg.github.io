/* Reacts to petitions to show/hide Menu/Nav Window */
function barHandler() {
    // Show/Hide Mobile Navigation (because of flex
    // the class uses transform to put window outside of view
    $(".nav-mobile").toggleClass("hide-outside");
    // UI with  "Bar" or "Close" icons
    $(".mobile-bar-icon").toggleClass("hide");
    $(".mobile-bar-icon-close").toggleClass("hide");
}

function navMobileSelected() {
    ;  
}

function isMobile() {
    // this must be refactored to have the correct
    // CSS counterpart
    return false;
    /*
    if(window.innerWidth < 992)
        return true; // mobile
    else
        return false; // desktop
    */
}

/* updates the image logo at the top from main page to others */
function updateLogo() {
    var curHash = location.hash;
    // checking in other languages or if #home is /
    if(curHash.length == 0 || curHash.includes("#home")
    || curHash.includes("#inicio")) {
        if(isMobile()) {
            $('.codedevs-engineer-color').addClass('hide');
        } else {        
            $('.codedevs-engineer-color').addClass('hide');        
            $('.codedevs-engineer-silver').removeClass('hide');
        }    
    } else {
        $('.codedevs-engineer-color').removeClass('hide');        
        $('.codedevs-engineer-silver').addClass('hide');
    }
}


/* paths have the format /eng/#section */
function switchLang() {
    var newLang = $('#language-selector').val();
    var curLang = $(location).attr('pathname').split('/')[1];  
    if(curLang == '') {
        curLang = 'en';
    }

    $.ajax({
        method: 'GET',
        url: '/assets/json/routing.json',
        success: function(data) {           
            var href = $(location).attr('href').split('/');
            var curPath = href[href.length - 1].slice(1); // Ex: if:/#section then: section
            curPath = (curPath.length > 0) ? curPath : 'home';
            var navigation = data[curLang].navigation;
            var newPath = '';
            for(item in navigation){
                if(encodeURI(navigation[item].url) == curPath) {
                    try {
                        newPath = data[newLang].navigation[item].url;
                        var newRoute = (newLang == 'en') ? '/#' + newPath : '/' + newLang + '/#' + newPath;
                        window.location.href = newRoute;
                    } catch {
                        console.log("Language item not available");
                    }
                    break;
                }
            }
        },
        error: function() {
            console.log('API not supported');
        }
    });
}


function convertRem2Pixel(rem) {    
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

$(document).ready(function() {
    
    var paddingTop = '';
    if($(window).width() < 479 ) {
        paddingTop = '8vh';
    } else {
        var desktopPadding = convertRem2Pixel(4.6) + 20; // engineer + padding
        paddingTop = desktopPadding.toString() + 'px';
    }
    /* This sets one page slide feature */
    $('#fullpage').fullpage({
        // Options        
        scrollingSpeed: 550,
        //scrollBar: true,
        paddingTop: paddingTop,
        //paddingBottom: 0,
        //navigation: true,
        //navigationPosition: "left",
        slidesNavigation: true,
        slidesNavPosition: 'bottom'
    });

    /* Shows/Hides Menu Bar Window by using CSS*/
    $(".mobile-bar-icon").click(barHandler);
    $(".mobile-bar-icon-close").click(barHandler);
    $(".nav-mobile-list > li").click(barHandler);

    $('#language-selector').change(switchLang);
    
    updateLogo();
    window.addEventListener("hashchange", updateLogo, false);
});

