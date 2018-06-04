var margin = {top: 100, right: 20, bottom: 40, left:300};
	var width = 1200 - margin.left - margin.right;
	var height = 500 - margin.top - margin.bottom;

	var svg = d3.select('body')
		.append('svg')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom)
	.append('g')
		.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

	//defining scale

	var xScale = d3.scaleLinear()
		.range([0, width]);

	// Constructing Y-axis

	var yScale = d3.scaleLinear()
		.range([height,0]); 

	//var yScale = d3.scaleOrdinal()
		//.range(["black", "#ccc", "#ccc"]);

	// will ook into it later..may be use it for citations
	var radius = d3.scaleSqrt()
		.range([0,50]);

	// the axes 
	var xAxis = d3.axisBottom()
	.scale(xScale);

	var yAxis = d3.axisLeft()
	.scale(yScale);


	// Venue Data

	var venue = [" ", "ARKCG", "Eurohaptics", "HAPTICS",
					"ICRA","IEEE Transactions on Education","IEEE Transactions on Haptics","IEEE VR","IROS","IFAC Volumes","Webpage","World Haptics"];

	

	// again scaleOrdinal
	var color = d3.scaleOrdinal(d3.schemeCategory20);

	
	//Binding Data

	d3.csv('DataBase.csv', function(error, data){
		data.forEach(function(d){
			 d.Year = +d.Year; // to convert strings to integers
			 d.NumberOfDoF = +d.NumberOfDoF;
			 d.VenueIndex = +d.VenueIndex;

		});

		

		xScale.domain([1990,2017]).nice();

		
		yScale.domain([0,11]).nice();


		/* radius.domain(d3.extent(data, function(d){
			return d.PetalLength;
		})).nice(); */

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

		// Mapping Data to Arrays 

		var product = data.map(function(i){return i.ProductType;});
		var year = data.map(function(i){return i.Year;});
		var venueIndex = data.map(function(i){return i.VenueIndex;});
		var numberOfDoF = data.map(function(i){return i.NumberOfDoF;});
		var device = data.map(function(i){return i.Device;});


		// Commercial vs Research Product

		
		for(var i=0; i<32; i++)
		{
			if(product[i] == "Commercial Product") {

				var bubble = svg.append('circle')
					.attr('class','bubble')
					.attr('cx', xScale(year[i]))
					.attr('cy', yScale(venueIndex[i]))
					.attr('r','8')
					.style('fill', DoF(numberOfDoF[i]));


				// Adding Text to devices

				bubble.append('title')
					.attr('x', xScale(year[i]))
					.attr('y', yScale(venueIndex[i]))
						.append('text')
						.text(device[i]); 

			}

			else{

				var square = svg.append('rect')
					.attr('class','square')
					.attr('x', xScale(year[i]))
					.attr('y', yScale(venueIndex[i]))
					.attr('width','16')
					.attr('height','16')
					.style('fill', DoF(numberOfDoF[i]));

				// Adding Text to Devices

				square.append('title')
					.attr('x', xScale(year[i]))
					.attr('y', yScale(venueIndex[i]))
						.append('text')
						.text(device[i]); 


			}

		}
	

		



		/* bubble.append('title')
			.attr('x', function(d){ return radius(d.PetalLength); })
			.text(function(d){
				return d.Species;
			}); */

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

		// I feel I understand legends much better now.
		// define a group element for each color i, and translate it to (0, i * 20). 
		/* var legend = svg.selectAll('legend')
			.data(numberOfDoF)
			.enter().append('g')
			.attr('class', 'legend')
			.attr('transform', function(d,i){ return 'translate(0,' + i * 20 + ')'; });

		// give x value equal to the legend elements. 
		// no need to define a function for fill, this is automatically fill by color.
		legend.append('rect')
			.attr('x', width)
			.attr('width', 18)
			.attr('height', 18);

		// add text to the legend elements.
		// rects are defined at x value equal to width, we define text at width - 6, this will print name of the legends before the rects.
		legend.append('text')
			.attr('x', width - 6)
			.attr('y', 9)
			.attr('dy', '.35em')
			.style('text-anchor', 'end')
			.text(function(d){ return d; });


		// d3 has a filter fnction similar to filter function in JS. Here it is used to filter d3 components.
		legend.on('click', function(type){
			d3.selectAll('.bubble')
				.style('opacity', 0.15)
				.filter(function(d){
					return d.Species == type;
				})
				.style('opacity', 1);
		}) */


	});




function DoF(dof){

	switch(dof) {
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

		
		
		
		
		
		
		



















