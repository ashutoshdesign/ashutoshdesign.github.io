$(document).ready(function(){




	var h = $(".profile-pic-sub").height();

	if($(window).width() >= 768)
	{
		$(".one-liner-text").css("height", h + "px");
	}
	
   
	check();
	
	

	function check()
	{
		if($(window).width() >= 768)
		{

			if($(".profile-pic-sub").height() != h)
			{   
			    
				h = $(".profile-pic-sub").height();

				
				
				$(".one-liner-text").css("height", h + "px");
			}

		}

		if($(window).width() < 768)
		{
			$(".one-liner-text").css("height", "20%");
		}

		setTimeout(check,100);
	}


	
    function checkAgain()
    {
			if($(window).width() > 992)
			{   
				$(".highlight:eq(0)").css("background-color", "rgba(239,83,80, 0)");
				$(".highlight:eq(0)").html("ello!<br>");
				$(".highlight:eq(1)").css("background-color", "rgba(239,83,80, 0)"); 
				$(".highlight-null:eq(0)").html("<br> a prefinal year undergraduate design student at");

			}

			if($(window).width() < 992)
			{   
				$(".highlight:eq(0)").css("background-color", "rgba(239,83,80, 0.75)");
				$(".highlight:eq(0)").html("ello!"); 
				$(".highlight:eq(1)").css("background-color", "rgba(239,83,80, 0.75)");
				$(".highlight-null:eq(0)").html("<br> a prefinal year undergraduate design student at");

			}

			setTimeout(checkAgain,210);
	}

		

		

});