
document.addEventListener("DOMContentLoaded", function(){
$('.pre-slider-image-container').on('click', function(){


		  var j=0;

		  var name = $(this).find('.pre-slider-image-overlay').attr('name');
		  console.log(name);
		  

		  var id =  $(this).find('.pre-slider-image-overlay').attr('id');
  		  console.log(id);


  		  // Get the modal
		  var modal = $('#myModal');

		  // Get the button that opens the modal
		  

		  // Get the <span> element that closes the modal
		  var span = $(".close-btn");

		  // When the user clicks the button, open the modal 
		 
	      //modal.style.display = "block";
	      modal.show(300);
		  

		  // When the user clicks on <span> (x), close the modal
		  span.on("click", function() {
		      //modal.style.display = "none";
		      modal.hide(100);
		  });

		  // When the user clicks anywhere outside of the modal, close it
		  $(window).on("click", function(event) {
		  		console.log(event.target.id);
		      if (event.target.id == "myModal") {
		          //modal.style.display = "none";
		          console.log("close");
		          modal.hide(100);
		      }
		  })


		 

		$('.modal-header h2').html($(this).attr('name'));
		$('.carousel-inner').html('');
		$('.carousel-indicators').html('');
		var count = 1;
		var x = parseInt(id.substr(2,3))-1;

		if(name == 'Survey'){
	  		console.log('okay7');
		  	for (var i = 1; i <4; i++)
			{ 
				$('<li data-target="#productCarousel" data-slide-to="'+count+'"></li>').appendTo('.carousel-indicators');
				count++;
				$('<div class="item"><img src="images/Project-3/survey-insight-'+i+'.jpg"></div>').appendTo('.carousel-inner');
				$('#productCarousel').carousel();
				$('.item').eq(x).addClass('active');
				$('.carousel-indicators > li').eq(x).addClass('active');
			} 
	  	};
		

		if(name == 'Empathy Maps'){
	  		console.log('okay1');

		  	for (var i = 1; i <4; i++)
			{ 
				$('<li data-target="#productCarousel" data-slide-to="'+count+'"></li>').appendTo('.carousel-indicators');
				count++;
				$('<div class="item"><img src="images/project-2-em'+i+'.jpg"></div>').appendTo('.carousel-inner');
				$('#productCarousel').carousel();
				$('.item').eq(x).addClass('active');
				$('.carousel-indicators > li').eq(x).addClass('active');
			} 
	  	};

	 	 if(name == 'Persona'){
	  		console.log('okay2');
		  	for (var i = 1; i <3; i++)
			{ 
				$('<li data-target="#productCarousel" data-slide-to="'+count+'"></li>').appendTo('.carousel-indicators');
				count++;
				$('<div class="item"><img src="images/project-2-persona-'+i+'.jpg"></div>').appendTo('.carousel-inner');
				$('#productCarousel').carousel();
				$('.item').eq(x).addClass('active');
				$('.carousel-indicators > li').eq(x).addClass('active');
			} 
	  	};


	  	if(name == 'Scenario'){
	  		console.log('okay3');
		  	for (var i = 1; i <4; i++)
			{ 
				$('<li data-target="#productCarousel" data-slide-to="'+count+'"></li>').appendTo('.carousel-indicators');
				count++;
				$('<div class="item"><img src="images/project-2-scenario-1.jpg"></div>').appendTo('.carousel-inner');
				$('#productCarousel').carousel();
				$('.item').eq(x).addClass('active');
				$('.carousel-indicators > li').eq(x).addClass('active');
			} 
	  	};

	  	if(name == 'Competition Research'){
	  		console.log('okay4');
		  	for (var i = 1; i <2; i++)
			{ 
				$('<li data-target="#productCarousel" data-slide-to="'+count+'"></li>').appendTo('.carousel-indicators');
				count++;
				$('<div class="item"><img src="images/project-2-competition.jpg"></div>').appendTo('.carousel-inner');
				$('#productCarousel').carousel();
				$('.item').eq(x).addClass('active');
				$('.carousel-indicators > li').eq(x).addClass('active');
			} 
	  	};

	  	if(name == 'Style Guide'){
	  		console.log('okay5');
		  	for (var i = 1; i <2; i++)
			{ 
				$('<li data-target="#productCarousel" data-slide-to="'+count+'"></li>').appendTo('.carousel-indicators');
				count++;
				$('<div class="item"><img src="images/project-2-vd.jpg"></div>').appendTo('.carousel-inner');
				$('#productCarousel').carousel();
				$('.item').eq(x).addClass('active');
				$('.carousel-indicators > li').eq(x).addClass('active');
			} 
	  	};

	  	if(name == 'Information Architecture'){
	  		console.log('okay6');
		  	for (var i = 1; i <2; i++)
			{ 
				$('<li data-target="#productCarousel" data-slide-to="'+count+'"></li>').appendTo('.carousel-indicators');
				count++;
				$('<div class="item"><img src="images/project-2-ia.jpg"></div>').appendTo('.carousel-inner');
				$('#productCarousel').carousel();
				$('.item').eq(x).addClass('active');
				$('.carousel-indicators > li').eq(x).addClass('active');
			} 
	  	};

	  	if(name == 'PersonaBP'){
	  		console.log('okay8');
		  	for (var i = 1; i <3; i++)
			{ 
				$('<li data-target="#productCarousel" data-slide-to="'+count+'"></li>').appendTo('.carousel-indicators');
				count++;
				$('<div class="item"><img src="images/Project-3/Persona-' + i + '.jpg"></div>').appendTo('.carousel-inner');
				$('#productCarousel').carousel();
				$('.item').eq(x).addClass('active');
				$('.carousel-indicators > li').eq(x).addClass('active');
			} 
	  	};

	  	







});

});