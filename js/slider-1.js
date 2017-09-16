$(function() {
    "use strict";
    var body = $("body"),
        active1 = $(".slider1 ol li, .slider1 .controll1"),
        controll1 = $(".slider1 .controll1"),
        playpause = $(".playstop1"),
        slider1Time = 1,
        slider1Wait = 3000,
        i = 999,
        autoRun,
        stop = false;
    // Reset
    $(".slider1 ul li:first").css("left", 0);
    // Run slider1
    function runslider1(what) {
        what.addClass("active1").siblings("li, span").removeClass("active1");
    }
    // slider1 gsap
    function gsapslider1(whose, left) {
        i++;
        if (whose.hasClass("active1")) {
            TweenMax.fromTo(
                ".slider1 ul li.active1",
                slider1Time,
                { zIndex: i, left: left },
                { left: 0 }
            );
        }
    }
    // active1
    active1.on("click", function() {
        runslider1($(this));
    });
    // Arrow left
    controll1.first().on("click", function() {
        var slide = $(".slider1 ul li.active1, .slider1 ol li.active1").is(
            ":first-of-type"
        )
            ? $(".slider1 ul li:last, .slider1 ol li:last")
            : $(".slider1 ul li.active1, .slider1 ol li.active1").prev("li");
        runslider1(slide);
        gsapslider1(slide, "100%");
    });
    // Arrow right
    controll1.last().on("click", function() {
        var slide = $(".slider1 ul li.active1, .slider1 ol li.active1").is(
            ":last-of-type"
        )
            ? $(".slider1 ul li:first, .slider1 ol li:first")
            : $(".slider1 ul li.active1, .slider1 ol li.active1").next("li");
        runslider1(slide);
        gsapslider1(slide, "-100%");
    });
    // Point
    $(".slider1 ol li").on("click", function() {
        var start = $(".slider1 ul li.active1").index();
        var slide = $(".slider1 ul li").eq($(this).index());
        runslider1(slide);
        var end = $(".slider1 ul li.active1").index();
        if (start > end) {
            gsapslider1(slide, "100%");
        }
        if (start < end) {
            gsapslider1(slide, "-100%");
        }
    });
    // Auto run slider1
    function autoRunslider1() {
        if (body.css("direction") === "ltr" && stop === false) {
            autoRun = setInterval(function() {
                controll1.last().click();
            }, slider1Wait);
        } else if (body.css("direction") === "rtl" && stop === false) {
            autoRun = setInterval(function() {
                controll1.first().click();
            }, slider1Wait);
        }
    }
    autoRunslider1();
    // When hover
    active1.on("mouseenter", function() {
        if (stop === false) {clearInterval(autoRun);}
    });
    active1.on("mouseleave", function() {
        if (stop === false) {autoRunslider1();}
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
            autoRunslider1();
            $(this).attr('title', 'pause');
        
    });


});