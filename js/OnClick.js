
window.onload = function(){

var storeClickArray = [];
var storeClickArrayCount = [];
var flag = 0;
var storeClick = 0;
var tempDevice;
	
d3.selectAll('.data').on("click", function(){


	var clickData = [];
	var deviceName = [];


	if(storeClick > 0){
		
		for(var i=0; i<storeClick; i++){
			
			if(String(d3.select(this).data().map(function(d){return d.Device})) == String(storeClickArray[i].data().map(function(d){return d.Device}))){
				
				flag = 1;
				tempDevice = i;

			}
		}

		if(flag != 1){

			storeClickArray[storeClick] = d3.select(this);
			storeClick++;
			flag = 0;

		}

		else {

			storeClickArray.splice(tempDevice,1);
			storeClick--;
			flag = 0;
		}

		
	}

	else{
		storeClickArray[storeClick] = d3.select(this);
		storeClick++;
		
	}


	
	

	d3.selectAll('.point')
		.style('opacity', 0.15);

	d3.selectAll('.point2')
		.style('opacity', 0.15);

	d3.selectAll('.point3')
		.style('opacity', 0.15);

	d3.selectAll('.point4')
		.style('opacity', 0.15);

	d3.selectAll('.point5')
		.style('opacity', 0.15);

	d3.selectAll('.point61')
		.style('opacity', 0.15);

	d3.selectAll('.point62')
		.style('opacity', 0.15);

	d3.selectAll('.point63')
		.style('opacity', 0.15);


	d3.selectAll('.point64')
		.style('opacity', 0.15);

	d3.selectAll('.point65')
		.style('opacity', 0.15);

	d3.selectAll('.point66')
		.style('opacity', 0.15);

	

	for(var i=0; i<storeClick; i++){
		
		

    clickData[i] = storeClickArray[i].data();
	
	
	clickData[i].forEach(function(d){
		deviceName[i] = d.Device;
	});



	

	d3.selectAll('.point')
		.filter(function(d){return d.Device == deviceName[i];})
		.style('opacity', 1);


	d3.selectAll('.point2')
		.filter(function(d){return d.Device == deviceName[i];})
		.style('opacity', 1);


	d3.selectAll('.point3')
		.filter(function(d){return d.Device == deviceName[i];})
		.style('opacity', 1);

	d3.selectAll('.point4')
		.filter(function(d){return d.Device == deviceName[i];})
		.style('opacity', 1); 

	d3.selectAll('.point5')
		.filter(function(d){return d.Device == deviceName[i];})
		.style('opacity', 1);

	d3.selectAll('.point61')
		.filter(function(d){return d.Device == deviceName[i];})
		.style('opacity', 1);

	d3.selectAll('.point62')
		.filter(function(d){return d.Device == deviceName[i];})
		.style('opacity', 1);

	d3.selectAll('.point63')
		.filter(function(d){return d.Device == deviceName[i];})
		.style('opacity', 1);

	d3.selectAll('.point64')
		.filter(function(d){return d.Device == deviceName[i];})
		.style('opacity', 1);

	d3.selectAll('.point65')
		.filter(function(d){return d.Device == deviceName[i];})
		.style('opacity', 1);

	d3.selectAll('.point66')
		.filter(function(d){return d.Device == deviceName[i];})
		.style('opacity', 1);

		

	}

	

});




d3.select('#reset').on('click', function(){

	location.reload();
	
	
});

d3.select('#undo').on('click', function(){

	alert('To be Added');
	
	
});

}