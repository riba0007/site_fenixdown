var bg_cover = '';
var sticky_nav = '';
var aboutImg = '';
var aboutDetails = '';
var cards = '';
var apoiase = '';
var patreon = '';
var contatos = '';
var anchor = '';

var sections = '';
var menuItems = '';
var minAnimation = 800;

$(document).ready(function(){
    bg_cover = $('.bg-cover');
    sticky_nav = $('header nav');
    aboutImg = $('#sobre img');
    aboutDetails = $('#sobre .details');
    cards = $('.card');
    apoiase = $('#h_apoiase');
    patreon = $('#h_patreon');
    contatos = $('.contato');
    
    sections = $('section');
    menuItems = $('nav a');
    
    checkInitial();
    checkSize();
});

$(window).resize(function() {
    checkSize();
});


function checkInitial(){
    
    $('nav a').click(menuClick);
    
    if ($(window).width() > minAnimation ) {
        $('.load').each(function(i, el){
            $(el).removeClass('load');
        });
    }
}

function checkSize(){
    if ($(window).width() > minAnimation) {
        $(window).scroll(scrollHandler);
    }else{
        $(window).off('scroll', scrollHandler);
        bg_cover.css({'background-position':'center'});
        sticky_nav.removeClass('sticky-nav');
        
        //about
        if (!aboutImg.hasClass('load')){
            aboutImg.addClass('load'); 
        }
        if (!aboutDetails.hasClass('load')){
            aboutDetails.addClass('load'); 
        }
        
        //projects
        cards.each(function(i, el){
            if (!$(el).hasClass('load')){
                $(el).addClass('load');
            }
        });
        
        //help
        if (!apoiase.hasClass('load')){
            apoiase.addClass('load'); 
        }
        if (!patreon.hasClass('load')){
            patreon.addClass('load'); 
        }
        
        //contact
        contatos.each(function(i, el) {
        if (!$(el).hasClass('load')){
            $(el).addClass('load');
        }
    });
    }
}

function menuClick(){
    anchor = $($(this).attr('href')).offset();
    if ($(window).width() > minAnimation) {
        menuItems.removeClass('active');
        $(this).addClass('active');
    }
    $('body').animate({ scrollTop: anchor.top });
    return false;
};

function scrollHandler(){
    var st = $(window).scrollTop();
    var sb = st + $(window).height();
    //parallax
    bg_cover.css({'background-position':'center '+(st*.5)+'px'});

    //sticky menu
    if(st >= (bg_cover.height()-60)){
        sticky_nav.addClass('sticky-nav');
    }else{
        sticky_nav.removeClass('sticky-nav');
    }
    
    //menu active
    sections.each(function(i, el){
        if(!$(menuItems[i]).hasClass('active') && $(el).offset().top <= st + bg_cover.height()-(bg_cover.height()/2) ){
            menuItems.removeClass('active');
            $(menuItems[i]).addClass('active');
        }
    });
    
    //about
    if (!aboutImg.hasClass('load')){
        if (aboutImg.offset().top <= (sb)){
            aboutImg.addClass('load');
            setTimeout(function(){
                if (!aboutDetails.hasClass('load')){
                    if (aboutDetails.offset().top <= (sb)){
                        aboutDetails.addClass('load'); 
                    }
                }
            }, 300);
        }
    }
    
    //projects
    cards.each(function(i, el) {
        if (!$(el).hasClass('load')){
            if ($(el).offset().top <= sb){
                $(el).addClass('load'); 
            }
        }
    });
    
    //help
    if (!apoiase.hasClass('load')){
        if (apoiase.offset().top <= (sb)){
            apoiase.addClass('load'); 
            setTimeout(function(){
                if (!patreon.hasClass('load')){
                    if (patreon.offset().top <= (sb)){
                        patreon.addClass('load'); 
                    }
                }
            }, 300);
        }
    }
    
    //contact
    contatos.each(function(i, el) {
        if (!$(el).hasClass('load')){
            if ($(el).offset().top <= sb){
                $(el).addClass('load'); 
            }
        }
    });
}