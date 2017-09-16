$(function() {
    "use strict";
    var body = $("body"),
        active5 = $(".slider5 ol li, .slider5 .controll5"),
        controll5 = $(".slider5 .controll5"),
        playpause = $(".playstop5"),
        slider5Time = 1,
        slider5Wait = 3000,
        i = 999,
        autoRun,
        stop = false;
    // Reset
    $(".slider5 ul li:first").css("left", 0);
    // Run slider5
    function runslider5(what) {
        what.addClass("active5").siblings("li, span").removeClass("active5");
    }
    // slider5 gsap
    function gsapslider5(whose, left) {
        i++;
        if (whose.hasClass("active5")) {
            TweenMax.fromTo(
                ".slider5 ul li.active5",
                slider5Time,
                { zIndex: i, left: left },
                { left: 0 }
            );
        }
    }
    // active5
    active5.on("click", function() {
        runslider5($(this));
    });
    // Arrow left
    controll5.first().on("click", function() {
        var slide = $(".slider5 ul li.active5, .slider5 ol li.active5").is(
            ":first-of-type"
        )
            ? $(".slider5 ul li:last, .slider5 ol li:last")
            : $(".slider5 ul li.active5, .slider5 ol li.active5").prev("li");
        runslider5(slide);
        gsapslider5(slide, "100%");
    });
    // Arrow right
    controll5.last().on("click", function() {
        var slide = $(".slider5 ul li.active5, .slider5 ol li.active5").is(
            ":last-of-type"
        )
            ? $(".slider5 ul li:first, .slider5 ol li:first")
            : $(".slider5 ul li.active5, .slider5 ol li.active5").next("li");
        runslider5(slide);
        gsapslider5(slide, "-100%");
    });
    // Point
    $(".slider5 ol li").on("click", function() {
        var start = $(".slider5 ul li.active5").index();
        var slide = $(".slider5 ul li").eq($(this).index());
        runslider5(slide);
        var end = $(".slider5 ul li.active5").index();
        if (start > end) {
            gsapslider5(slide, "100%");
        }
        if (start < end) {
            gsapslider5(slide, "-100%");
        }
    });
    // Auto run slider5
    function autoRunslider5() {
        if (body.css("direction") === "ltr" && stop === false) {
            autoRun = setInterval(function() {
                controll5.last().click();
            }, slider5Wait);
        } else if (body.css("direction") === "rtl" && stop === false) {
            autoRun = setInterval(function() {
                controll5.first().click();
            }, slider5Wait);
        }
    }
    autoRunslider5();
    // When hover
    active5.on("mouseenter", function() {
        if (stop === false) {clearInterval(autoRun);}
    });
    active5.on("mouseleave", function() {
        if (stop === false) {autoRunslider5();}
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
            autoRunslider5();
            $(this).attr('title', 'pause');
        
    });


});