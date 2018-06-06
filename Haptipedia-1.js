window.onload = function(){

$('.viz1').show();
$('.viz2').hide();
$('.viz3').hide()

document.getElementById('tab1').addEventListener('click', function(){


	$('.viz1').show();
	$('.viz2').hide();
	$('.viz3').hide();

});

document.getElementById('tab2').addEventListener('click', function(){


	$('.viz2').show();
	$('.viz1').hide();
	$('.viz3').hide();

});

document.getElementById('tab3').addEventListener('click', function(){


	$('.viz3').show();
	$('.viz2').hide();
	$('.viz1').hide();

});



var margin = {top: 100, right: 20, bottom: 40, left:300};
var width = 1200 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

var svg = d3.select('.viz1')
	.append('svg')
	.attr('width', width + margin.left + margin.right)
	.attr('height', height + margin.top + margin.bottom)
	.append('g')
	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

var svg2 = d3.select('.viz2')
	.append('svg')
	.attr('width', width + margin.left + margin.right)
	.attr('height', height + margin.top + margin.bottom)
	.append('g')
	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

var svg3 = d3.select('.viz3')
	.append('svg')
	.attr('width', width + margin.left + margin.right)
	.attr('height', height + margin.top + margin.bottom)
	.append('g')
	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

//defining scale

var xScale = d3.scaleLinear()
	.range([0, width]);

var xScale2 = d3.scaleLinear()
	.range([0, width]);

var xScale3 = d3.scaleLinear()
	.range([0, width]);

// Constructing Y-axis

var yScale = d3.scaleLinear()
	.range([height,0]); 

var yScale2 = d3.scaleLinear()
	.range([height,0]);

var yScale3 = d3.scaleBand()
	.rangeRound([0, height]);  


// will ook into it later..may be use it for citations
var radius = d3.scaleSqrt()
	.range([0,50]);

// the axes 
var xAxis = d3.axisBottom()
.scale(xScale);

var xAxis2 = d3.axisBottom()
.scale(xScale2);

var xAxis3 = d3.axisBottom()
.scale(xScale3);

var yAxis = d3.axisLeft()
.scale(yScale);

var yAxis2 = d3.axisLeft()
.scale(yScale2);

var yAxis3 = d3.axisLeft()
.scale(yScale3);


//trial

const yValue = d => d.Device;

// Venue Data

var venue = [" ", "ARKCG", "Eurohaptics", "HAPTICS",
				"ICRA","IEEE Transactions on Education","IEEE Transactions on Haptics","IEEE VR","IROS","IFAC Volumes","Webpage","World Haptics"];


// Number of DoF

var dofArray = [1, 2, 3, 4, 6, 7];



// again scaleOrdinal
var color = d3.scaleOrdinal(d3.schemeCategory20);

	
//Binding Data

d3.csv('DataBase.csv', function(error, data){
	

	data.forEach(function(d){
		 d.Year = +d.Year; // to convert strings to integers
		 d.NumberOfDoF = +d.NumberOfDoF;
		 d.VenueIndex = +d.VenueIndex;
		 d.NumMotors = +d.NumMotors;
		 d.NumLinks = +d.NumLinks;


	});


    //----------- Start of Viz 1------------------------------------- Start of Viz 1 ------------------------------------

		xScale.domain([1990,2017]).nice();

		
		yScale.domain([0,11]).nice();


		// adding axes is also simpler now, just translate x-axis to (0,height) and it's alread defined to be a bottom axis. 
		svg.append('g')
			.attr('transform', 'translate(0,' + height + ')')
			.attr('class', 'x axis')
			.call(xAxis);

		// y-axis is translated to (0,0)
		svg.append('g')
			.attr('transform', 'translate(0,0)')
			.attr('class', 'y axis')
			.call(yAxis);

			

		// Defining labels for y-Axis

		svg.select('.y')
			.selectAll('.tick')
			.select("text")
			.data(venue)
				.text(function(d,i){ return venue[i];});


	
		var shapeCircle = d3.symbol().size(200).type(d3.symbolCircle);
		var shapeTriangle = d3.symbol().size(200).type(d3.symbolTriangle);


		svg.selectAll(".point")
		    .data(data)
		    .enter().append("path")
		    .attr("class", "point")
		    .attr('id', function(d){return 'id' + d.NumberOfDoF + d.ProductType.substring(0,1);})
		    .attr('fill', function(d){return DoF(d.NumberOfDoF)})
		   	.attr('d', function(d) {

	   			if(d.ProductType == "Commercial Product"){
	   				return shapeTriangle();
	   			}

	   			else {return shapeCircle();}


	   		})
		    .attr("transform", function(d) { return "translate(" + xScale(d.Year) + "," + yScale(d.VenueIndex) + ")"; });



		// Hover Dialog Box


		var hoverBox = d3.select(".hoverBox").style("visibility", "hidden");



	    // For Hover

	    

	    d3.selectAll('.point').on("mouseover", function(d){

	    	d3.select(this)
	    		.attr('r', 10)
	    		.style('stroke-width', '2')
	    		.style('stroke', 'black');

 

			hoverBox.style("visibility", "visible")
						.html("<p> Device Name: <b>" + d.Device + "</b></p>" + "<p> Year: <b>" + d.Year + "</b></p>");



		})

		
		d3.selectAll('.point').on("mousemove", function(){return hoverBox.style("top",
		    (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})

		

		d3.selectAll('.point').on("mouseout", function(){


			d3.select(this)
				.attr('r', 8)
				.style('stroke', 'none');



			 hoverBox.style("visibility", "hidden");

		});
	 


	// adding label. For x-axis, it's at (10, 10), and for y-axis at (width, height-10).
	svg.append('text')
		.attr('x', 10)
		.attr('y', 10)
		.attr('class', 'label')
		.text('Venue');


	svg.append('text')
		.attr('x', width)
		.attr('y', height - 10)
		.attr('text-anchor', 'end')
		.attr('class', 'label')
		.text('Publication Year');

	//Legends
	
	 var legend = svg.selectAll('legend')
		.data(dofArray)
		.enter().append('g')
		.attr('class', 'legend')
		.attr('transform', function(d,i){ return 'translate(0,' + i * 20 + ')'; });

	// give x value equal to the legend elements. 

	legend.append('rect')
		.attr('x', width)
		.attr('width', 18)
		.attr('height', 18)
		.style('fill', function(d,i){return DoF(dofArray[i]);});

	// add text to the legend elements.
	// rects are defined at x value equal to width, we define text at width - 6, this will print name of the legends before the rects.
	legend.append('text')
		.attr('x', width - 6)
		.attr('y', 9)
		.attr('dy', '.35em')
		.style('text-anchor', 'end')
		.text(function(d){ return d; });

//----------- End of of Viz 1------------------------------------- End  of Viz 1 ------------------------------------

//----------- Start of of Viz 2------------------------------------- Start  of Viz 2 ------------------------------------

		xScale2.domain([0,16]).nice();
		yScale2.domain([-2,9]).nice();


		// adding axes is also simpler now, just translate x-axis to (0,height) and it's alread defined to be a bottom axis. 
		svg2.append('g')
			.attr('transform', 'translate(0,' + height + ')')
			.attr('class', 'x axis')
			.call(xAxis2);

		// y-axis is translated to (0,0)
		svg2.append('g')
			.attr('transform', 'translate(0,0)')
			.attr('class', 'y axis')
			.call(yAxis2);




		svg2.selectAll(".point2")
		    .data(data)
		    .enter().append("path")
		    .attr("class", "point2")
		    .attr('id', function(d){return 'id' + d.NumberOfDoF + d.ProductType.substring(0,1);})
		    .attr('fill', function(d){return DoF(d.NumberOfDoF)})
		   	.attr('d', function(d) {

	   			if(d.ProductType == "Commercial Product"){
	   				return shapeTriangle();
	   			}

	   			else {return shapeCircle();}


	   		})
		    .attr("transform", function(d) { return "translate(" + xScale2(d.NumLinks) + "," + yScale2(d.NumMotors) + ")"; });




	    // For Hover

	    

	    d3.selectAll('.point2').on("mouseover", function(d){

	    	d3.select(this)
	    		.attr('r', 10)
	    		.style('stroke-width', '2')
	    		.style('stroke', 'black');

 

			hoverBox.style("visibility", "visible")
						.html("<p> Device Name: <b>" + d.Device + "</b></p>" + "<p> Number of Motors: <b>" + d.NumMotors + "</b></p>");



		})

		
		d3.selectAll('.point2').on("mousemove", function(){return hoverBox.style("top",
		    (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})

		

		d3.selectAll('.point2').on("mouseout", function(){


			d3.select(this)
				.attr('r', 8)
				.style('stroke', 'none');



			 hoverBox.style("visibility", "hidden");

		}); 
	 


	// adding label. For x-axis, it's at (10, 10), and for y-axis at (width, height-10).
	svg2.append('text')
		.attr('x', 10)
		.attr('y', 10)
		.attr('class', 'label')
		.text('Num of Motors');


	svg2.append('text')
		.attr('x', width)
		.attr('y', height - 10)
		.attr('text-anchor', 'end')
		.attr('class', 'label')
		.text('Num of Links');

	//Legends
	
	 var legend2 = svg2.selectAll('legend')
		.data(dofArray)
		.enter().append('g')
		.attr('class', 'legend')
		.attr('transform', function(d,i){ return 'translate(0,' + i * 20 + ')'; });

	// give x value equal to the legend elements. 

	legend2.append('rect')
		.attr('x', width)
		.attr('width', 18)
		.attr('height', 18)
		.style('fill', function(d,i){return DoF(dofArray[i]);});

	// add text to the legend elements.
	// rects are defined at x value equal to width, we define text at width - 6, this will print name of the legends before the rects.
	legend2.append('text')
		.attr('x', width - 6)
		.attr('y', 9)
		.attr('dy', '.35em')
		.style('text-anchor', 'end')
		.text(function(d){ return d; }); 

// -------------------------------------- End of Viz 2 ---------------------------------------------


//----------- Start of Viz 3------------------------------------- Start of Viz  ------------------------------------

	xScale3.domain([0,7]).nice();

	
	yScale3.domain(data.map(function (d) { return d.Device; }));

	console.log('devicedata=' + data.map(function (d) { return d.Device; }));
	// adding axes is also simpler now, just translate x-axis to (0,height) and it's alread defined to be a bottom axis. 
	svg3.append('g')
		.attr('transform', 'translate(0,' + height + ')')
		.attr('class', 'x axis')
		.call(xAxis3);

	// y-axis is translated to (0,0)
	svg3.append('g')
		.attr('transform', 'translate(0,0)')
		.attr('class', 'y axis')
		.call(yAxis3);

		

	// Defining labels for y-Axis

	/* svg.select('.y')
		.selectAll('.tick')
		.select("text")
		.data(venue)
			.text(function(d,i){ return venue[i];}); */


	

	svg3.selectAll(".point3")
	    .data(data)
	    .enter().append("path")
	    .attr("class", "point3")
	    //.attr('id', function(d){return 'id' + d.NumberOfDoF + d.ProductType.substring(0,1);})
	    .attr('fill', function(d){return DoF(d.NumberOfDoF)})
	   	.attr('d', function(d) {

   			if(d.ProductType == "Commercial Product"){
   				return shapeTriangle();
   			}

   			else {return shapeCircle();}


   		})
	    .attr("transform", function(d) { return "translate(" + xScale3(d.WorkspaceClassificationIndex) + "," + yScale3(d.Device) + ")"; });





    // For Hover

    

    d3.selectAll('.point3').on("mouseover", function(d){

    	d3.select(this)
    		.attr('r', 10)
    		.style('stroke-width', '2')
    		.style('stroke', 'black');



		hoverBox.style("visibility", "visible")
					.html("<p> Device Name: <b>" + d.Device + "</b></p>" + "<p> Workspace Classification: <b>" + d.WorkspaceClassification + "</b></p>");



	})

	
	d3.selectAll('.point3').on("mousemove", function(){return hoverBox.style("top",
	    (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})

	

	d3.selectAll('.point3').on("mouseout", function(){


		d3.select(this)
			.attr('r', 8)
			.style('stroke', 'none');



		 hoverBox.style("visibility", "hidden");

	});
 


	// adding label. For x-axis, it's at (10, 10), and for y-axis at (width, height-10).
	svg3.append('text')
		.attr('x', 10)
		.attr('y', 10)
		.attr('class', 'label')
		.text('Workspace Classification');


	svg3.append('text')
		.attr('x', width)
		.attr('y', height - 10)
		.attr('text-anchor', 'end')
		.attr('class', 'label')
		.text('Device');

	//Legends

	 var legend3 = svg3.selectAll('legend')
		.data(dofArray)
		.enter().append('g')
		.attr('class', 'legend')
		.attr('transform', function(d,i){ return 'translate(0,' + i * 20 + ')'; });

	// give x value equal to the legend elements. 

	legend3.append('rect')
		.attr('x', width)
		.attr('width', 18)
		.attr('height', 18)
		.style('fill', function(d,i){return DoF(dofArray[i]);});

	// add text to the legend elements.
	// rects are defined at x value equal to width, we define text at width - 6, this will print name of the legends before the rects.
	legend3.append('text')
		.attr('x', width - 6)
		.attr('y', 9)
		.attr('dy', '.35em')
		.style('text-anchor', 'end')
		.text(function(d){ return d; });

//----------- End of of Viz 3------------------------------------- End  of Viz 3 ------------------------------------

	

	
//Filters 

	var fill = 1;
	var noFill = 0;
	var idArray = [];
	var idDoF = [];
	var idPT = [];

	// Pulling elements from class 'point'

	
	var classArray = document.getElementsByClassName('point');
	var classArray2 = document.getElementsByClassName('point2');
	var classArray3 = document.getElementsByClassName('point3');
	
	for(var i=0; i<32; i++)
	{
		// Fetching ID of of elements
		idArray[i] = document.getElementsByClassName('point')[i].id;
		//Fetching DoF from ID
		idDoF[i] = idArray[i].substring(2,3);
		//Fetching Product Type from ID
		idPT[i] = idArray[i].substring(3,4);
	}
	
	
	
	// On change of checkbox
	
	
	d3.selectAll(".check").on("change",function(d){

		// Defining Matrix of devices (rows) and filters (columns)

		var matrix = [];

		var H = 32;
		var W = 2;

		for(var i=0; i<H; i++){
			matrix[i] = [];
			for(var j=0; j<W; j++)
			{
				matrix[i][j] = 0;
			}
		}



		//Filter for Number of DoF

		var x1=0;
		var checked1 = [];



		for(var i=1; i<7; i++){

			var y = parseInt($('#f1' + i).val());

			if($('#f1' + i).is(':checked')){

				
				checked1[x1] = y;
				x1++;
				
				
	

			}

		} 
		
		for(var i=0; i<32; i++){

			

			for(var j=0; j<checked1.length; j++){

				if(idDoF[i] == checked1[j]){

					//console.log(classArray[j]);
					matrix[i][0]=1;
					
				

				}

				 

			}

			

			

		}


		// End of Filter for Number of DoF



    	// Filter for Product Type

		var x2=0;
		var checked2 = [];

		for(var i=1; i<7; i++){

			var y = $('#f2' + i).val();

			console.log('y=' + y);

			if($('#f2' + i).is(':checked')){

				
				checked2[x2] = y;
				x2++;
				
				
	

			}

		} 
		
		for(var i=0; i<32; i++){

			

			for(var j=0; j<checked2.length; j++){

				if(idPT[i] == checked2[j]){

					//console.log(classArray[j]);
					matrix[i][1]=1;
					
				

				}

				 

			}

			

			

		}


		// End of Filter for Product Type

		// Final Filter


		for(var i=0; i<64; i++){

			var flag = 0;

			for(var j=0; j<W; j++){

				if(matrix[i][j] == 0){
					flag = 1;
				}

			}

			if(flag == 1){

				d3.select(classArray[i]).style('opacity', noFill);

				d3.select(classArray2[i]).style('opacity', noFill);
				d3.select(classArray3[i]).style('opacity', noFill);


			}

			else {

				d3.select(classArray[i]).style('opacity', fill);
				d3.select(classArray2[i]).style('opacity', fill);
				d3.select(classArray3[i]).style('opacity', fill);

			}	


		}

	});

	// End of All Filters
		


});




// DoF function for color

function DoF(n){

	switch(n) {
    case 1:
        return '#e96187';
        break;
    case 2:
        return '#6d5b97';
        break;
    case 3:
        return '#f6c4c7';
        break;
    case 4:
        return '#ee9661';
        break;
    case 6:
    	return '#ca4433';
        break;
    case 7:
        return '#89C7B6';
        break;
    default:
    	return 'black';
        
	}
}


}

		
		
		
		
		
		
		



















