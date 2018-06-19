

console.log('ToggleTabs');

	$('.viz1').show();
	$('#tab1').addClass('tab-active');
	$('.viz2').hide();
	$('.viz3').hide()

	document.getElementById('tab1').addEventListener('click', function(){


		$('.viz1').show();
		$('#tab1').addClass('tab-active');
		$('.viz2').hide();
		$('#tab2').removeClass('tab-active');
		$('.viz3').hide();
		$('#tab3').removeClass('tab-active');

	});

	document.getElementById('tab2').addEventListener('click', function(){


		$('.viz2').show();
		$('#tab2').addClass('tab-active');
		$('.viz1').hide();
		$('#tab1').removeClass('tab-active');
		$('.viz3').hide();
		$('#tab3').removeClass('tab-active');

	});

	document.getElementById('tab3').addEventListener('click', function(){


		$('.viz3').show();
		$('#tab3').addClass('tab-active');
		$('.viz2').hide();
		$('#tab2').removeClass('tab-active');
		$('.viz1').hide();
		$('#tab1').removeClass('tab-active');

	});






