$(function() {
    "use strict";
    var body = $("body"),
        active2 = $(".slider2 ol li, .slider2 .controll2"),
        controll2 = $(".slider2 .controll2"),
        playpause = $(".playstop2"),
        slider2Time = 1,
        slider2Wait = 3000,
        i = 999,
        autoRun,
        stop = false;
    // Reset
    $(".slider2 ul li:first").css("left", 0);
    // Run slider2
    function runslider2(what) {
        what.addClass("active2").siblings("li, span").removeClass("active2");
    }
    // slider2 gsap
    function gsapslider2(whose, left) {
        i++;
        if (whose.hasClass("active2")) {
            TweenMax.fromTo(
                ".slider2 ul li.active2",
                slider2Time,
                { zIndex: i, left: left },
                { left: 0 }
            );
        }
    }
    // active2
    active2.on("click", function() {
        runslider2($(this));
    });
    // Arrow left
    controll2.first().on("click", function() {
        var slide = $(".slider2 ul li.active2, .slider2 ol li.active2").is(
            ":first-of-type"
        )
            ? $(".slider2 ul li:last, .slider2 ol li:last")
            : $(".slider2 ul li.active2, .slider2 ol li.active2").prev("li");
        runslider2(slide);
        gsapslider2(slide, "100%");
    });
    // Arrow right
    controll2.last().on("click", function() {
        var slide = $(".slider2 ul li.active2, .slider2 ol li.active2").is(
            ":last-of-type"
        )
            ? $(".slider2 ul li:first, .slider2 ol li:first")
            : $(".slider2 ul li.active2, .slider2 ol li.active2").next("li");
        runslider2(slide);
        gsapslider2(slide, "-100%");
    });
    // Point
    $(".slider2 ol li").on("click", function() {
        var start = $(".slider2 ul li.active2").index();
        var slide = $(".slider2 ul li").eq($(this).index());
        runslider2(slide);
        var end = $(".slider2 ul li.active2").index();
        if (start > end) {
            gsapslider2(slide, "100%");
        }
        if (start < end) {
            gsapslider2(slide, "-100%");
        }
    });
    // Auto run slider2
    function autoRunslider2() {
        if (body.css("direction") === "ltr" && stop === false) {
            autoRun = setInterval(function() {
                controll2.last().click();
            }, slider2Wait);
        } else if (body.css("direction") === "rtl" && stop === false) {
            autoRun = setInterval(function() {
                controll2.first().click();
            }, slider2Wait);
        }
    }
    autoRunslider2();
    // When hover
    active2.on("mouseenter", function() {
        if (stop === false) {clearInterval(autoRun);}
    });
    active2.on("mouseleave", function() {
        if (stop === false) {autoRunslider2();}
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
            autoRunslider2();
            $(this).attr('title', 'pause');
        
    });


});