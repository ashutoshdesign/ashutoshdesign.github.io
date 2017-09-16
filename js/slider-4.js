$(function() {
    "use strict";
    var body = $("body"),
        active4 = $(".slider4 ol li, .slider4 .controll4"),
        controll4 = $(".slider4 .controll4"),
        playpause = $(".playstop4"),
        slider4Time = 1,
        slider4Wait = 3000,
        i = 999,
        autoRun,
        stop = false;
    // Reset
    $(".slider4 ul li:first").css("left", 0);
    // Run slider4
    function runslider4(what) {
        what.addClass("active4").siblings("li, span").removeClass("active4");
    }
    // slider4 gsap
    function gsapslider4(whose, left) {
        i++;
        if (whose.hasClass("active4")) {
            TweenMax.fromTo(
                ".slider4 ul li.active4",
                slider4Time,
                { zIndex: i, left: left },
                { left: 0 }
            );
        }
    }
    // active4
    active4.on("click", function() {
        runslider4($(this));
    });
    // Arrow left
    controll4.first().on("click", function() {
        var slide = $(".slider4 ul li.active4, .slider4 ol li.active4").is(
            ":first-of-type"
        )
            ? $(".slider4 ul li:last, .slider4 ol li:last")
            : $(".slider4 ul li.active4, .slider4 ol li.active4").prev("li");
        runslider4(slide);
        gsapslider4(slide, "100%");
    });
    // Arrow right
    controll4.last().on("click", function() {
        var slide = $(".slider4 ul li.active4, .slider4 ol li.active4").is(
            ":last-of-type"
        )
            ? $(".slider4 ul li:first, .slider4 ol li:first")
            : $(".slider4 ul li.active4, .slider4 ol li.active4").next("li");
        runslider4(slide);
        gsapslider4(slide, "-100%");
    });
    // Point
    $(".slider4 ol li").on("click", function() {
        var start = $(".slider4 ul li.active4").index();
        var slide = $(".slider4 ul li").eq($(this).index());
        runslider4(slide);
        var end = $(".slider4 ul li.active4").index();
        if (start > end) {
            gsapslider4(slide, "100%");
        }
        if (start < end) {
            gsapslider4(slide, "-100%");
        }
    });
    // Auto run slider4
    function autoRunslider4() {
        if (body.css("direction") === "ltr" && stop === false) {
            autoRun = setInterval(function() {
                controll4.last().click();
            }, slider4Wait);
        } else if (body.css("direction") === "rtl" && stop === false) {
            autoRun = setInterval(function() {
                controll4.first().click();
            }, slider4Wait);
        }
    }
    autoRunslider4();
    // When hover
    active4.on("mouseenter", function() {
        if (stop === false) {clearInterval(autoRun);}
    });
    active4.on("mouseleave", function() {
        if (stop === false) {autoRunslider4();}
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
            autoRunslider4();
            $(this).attr('title', 'pause');
        
    });


});