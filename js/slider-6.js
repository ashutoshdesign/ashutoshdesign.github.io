$(function() {
    "use strict";
    var body = $("body"),
        active6 = $(".slider6 ol li, .slider6 .controll6"),
        controll6 = $(".slider6 .controll6"),
        playpause = $(".playstop6"),
        slider6Time = 1,
        slider6Wait = 3000,
        i = 999,
        autoRun,
        stop = false;
    // Reset
    $(".slider6 ul li:first").css("left", 0);
    // Run slider6
    function runslider6(what) {
        what.addClass("active6").siblings("li, span").removeClass("active6");
    }
    // slider6 gsap
    function gsapslider6(whose, left) {
        i++;
        if (whose.hasClass("active6")) {
            TweenMax.fromTo(
                ".slider6 ul li.active6",
                slider6Time,
                { zIndex: i, left: left },
                { left: 0 }
            );
        }
    }
    // active6
    active6.on("click", function() {
        runslider6($(this));
    });
    // Arrow left
    controll6.first().on("click", function() {
        var slide = $(".slider6 ul li.active6, .slider6 ol li.active6").is(
            ":first-of-type"
        )
            ? $(".slider6 ul li:last, .slider6 ol li:last")
            : $(".slider6 ul li.active6, .slider6 ol li.active6").prev("li");
        runslider6(slide);
        gsapslider6(slide, "100%");
    });
    // Arrow right
    controll6.last().on("click", function() {
        var slide = $(".slider6 ul li.active6, .slider6 ol li.active6").is(
            ":last-of-type"
        )
            ? $(".slider6 ul li:first, .slider6 ol li:first")
            : $(".slider6 ul li.active6, .slider6 ol li.active6").next("li");
        runslider6(slide);
        gsapslider6(slide, "-100%");
    });
    // Point
    $(".slider6 ol li").on("click", function() {
        var start = $(".slider6 ul li.active6").index();
        var slide = $(".slider6 ul li").eq($(this).index());
        runslider6(slide);
        var end = $(".slider6 ul li.active6").index();
        if (start > end) {
            gsapslider6(slide, "100%");
        }
        if (start < end) {
            gsapslider6(slide, "-100%");
        }
    });
    // Auto run slider6
    function autoRunslider6() {
        if (body.css("direction") === "ltr" && stop === false) {
            autoRun = setInterval(function() {
                controll6.last().click();
            }, slider6Wait);
        } else if (body.css("direction") === "rtl" && stop === false) {
            autoRun = setInterval(function() {
                controll6.first().click();
            }, slider6Wait);
        }
    }
    autoRunslider6();
    // When hover
    active6.on("mouseenter", function() {
        if (stop === false) {clearInterval(autoRun);}
    });
    active6.on("mouseleave", function() {
        if (stop === false) {autoRunslider6();}
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
            autoRunslider6();
            $(this).attr('title', 'pause');
        
    });


});