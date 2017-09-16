$(function() {
    "use strict";
    var body = $("body"),
        active7 = $(".slider7 ol li, .slider7 .controll7"),
        controll7 = $(".slider7 .controll7"),
        playpause = $(".playstop7"),
        slider7Time = 1,
        slider7Wait = 3000,
        i = 999,
        autoRun,
        stop = false;
    // Reset
    $(".slider7 ul li:first").css("left", 0);
    // Run slider7
    function runslider7(what) {
        what.addClass("active7").siblings("li, span").removeClass("active7");
    }
    // slider7 gsap
    function gsapslider7(whose, left) {
        i++;
        if (whose.hasClass("active7")) {
            TweenMax.fromTo(
                ".slider7 ul li.active7",
                slider7Time,
                { zIndex: i, left: left },
                { left: 0 }
            );
        }
    }
    // active7
    active7.on("click", function() {
        runslider7($(this));
    });
    // Arrow left
    controll7.first().on("click", function() {
        var slide = $(".slider7 ul li.active7, .slider7 ol li.active7").is(
            ":first-of-type"
        )
            ? $(".slider7 ul li:last, .slider7 ol li:last")
            : $(".slider7 ul li.active7, .slider7 ol li.active7").prev("li");
        runslider7(slide);
        gsapslider7(slide, "100%");
    });
    // Arrow right
    controll7.last().on("click", function() {
        var slide = $(".slider7 ul li.active7, .slider7 ol li.active7").is(
            ":last-of-type"
        )
            ? $(".slider7 ul li:first, .slider7 ol li:first")
            : $(".slider7 ul li.active7, .slider7 ol li.active7").next("li");
        runslider7(slide);
        gsapslider7(slide, "-100%");
    });
    // Point
    $(".slider7 ol li").on("click", function() {
        var start = $(".slider7 ul li.active7").index();
        var slide = $(".slider7 ul li").eq($(this).index());
        runslider7(slide);
        var end = $(".slider7 ul li.active7").index();
        if (start > end) {
            gsapslider7(slide, "100%");
        }
        if (start < end) {
            gsapslider7(slide, "-100%");
        }
    });
    // Auto run slider7
    function autoRunslider7() {
        if (body.css("direction") === "ltr" && stop === false) {
            autoRun = setInterval(function() {
                controll7.last().click();
            }, slider7Wait);
        } else if (body.css("direction") === "rtl" && stop === false) {
            autoRun = setInterval(function() {
                controll7.first().click();
            }, slider7Wait);
        }
    }
    autoRunslider7();
    // When hover
    active7.on("mouseenter", function() {
        if (stop === false) {clearInterval(autoRun);}
    });
    active7.on("mouseleave", function() {
        if (stop === false) {autoRunslider7();}
    });
    // play pause click
    playpause.mouseover(function() {
        //$(this).toggleClass("fa-play-circle-o fa-pause-circle-o");
        //if (playpause.hasClass("fa-play-circle-o")) {
            stop = true;
            clearInterval(autoRun);
            $(this).attr('title', 'play');
        });

    playpause.mouseout(function(){
        //if (playpause.hasClass("fa-pause-circle-o")) {
            stop = false;
            autoRunslider7();
            $(this).attr('title', 'pause');
        
    });


});