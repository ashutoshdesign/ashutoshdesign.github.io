$(function() {
    "use strict";
    var body = $("body"),
        active3 = $(".slider3 ol li, .slider3 .controll3"),
        controll3 = $(".slider3 .controll3"),
        playpause = $(".playstop3"),
        slider3Time = 1,
        slider3Wait = 5000,
        i = 999,
        autoRun,
        stop = false;
    // Reset
    $(".slider3 ul li:first").css("left", 0);
    // Run slider3
    function runslider3(what) {
        what.addClass("active3").siblings("li, span").removeClass("active3");
    }
    // slider3 gsap
    function gsapslider3(whose, left) {
        i++;
        if (whose.hasClass("active3")) {
            TweenMax.fromTo(
                ".slider3 ul li.active3",
                slider3Time,
                { zIndex: i, left: left },
                { left: 0 }
            );
        }
    }
    // active3
    active3.on("click", function() {
        runslider3($(this));
    });
    // Arrow left
    controll3.first().on("click", function() {
        var slide = $(".slider3 ul li.active3, .slider3 ol li.active3").is(
            ":first-of-type"
        )
            ? $(".slider3 ul li:last, .slider3 ol li:last")
            : $(".slider3 ul li.active3, .slider3 ol li.active3").prev("li");
        runslider3(slide);
        gsapslider3(slide, "100%");
    });
    // Arrow right
    controll3.last().on("click", function() {
        var slide = $(".slider3 ul li.active3, .slider3 ol li.active3").is(
            ":last-of-type"
        )
            ? $(".slider3 ul li:first, .slider3 ol li:first")
            : $(".slider3 ul li.active3, .slider3 ol li.active3").next("li");
        runslider3(slide);
        gsapslider3(slide, "-100%");
    });
    // Point
    $(".slider3 ol li").on("click", function() {
        var start = $(".slider3 ul li.active3").index();
        var slide = $(".slider3 ul li").eq($(this).index());
        runslider3(slide);
        var end = $(".slider3 ul li.active3").index();
        if (start > end) {
            gsapslider3(slide, "100%");
        }
        if (start < end) {
            gsapslider3(slide, "-100%");
        }
    });
    // Auto run slider3
    function autoRunslider3() {
        if (body.css("direction") === "ltr" && stop === false) {
            autoRun = setInterval(function() {
                controll3.last().click();
            }, slider3Wait);
        } else if (body.css("direction") === "rtl" && stop === false) {
            autoRun = setInterval(function() {
                controll3.first().click();
            }, slider3Wait);
        }
    }
    autoRunslider3();
    // When hover
    active3.on("mouseenter", function() {
        if (stop === false) {clearInterval(autoRun);}
    });
    active3.on("mouseleave", function() {
        if (stop === false) {autoRunslider3();}
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
            autoRunslider3();
            $(this).attr('title', 'pause');
        
    });


});