////////////////////////////////////////////////////////////
//////////////////////// Set-Up ////////////////////////////
////////////////////////////////////////////////////////////

var margin = {left:40, top:40, right:40, bottom:0},
	width= 530,
	height = 530,
	/*width = Math.min(window.innerWidth, 700) - margin.left - margin.right,
    height = Math.min(window.innerWidth, 700) - margin.top - margin.bottom,*/
    innerRadius = Math.min(width, height) * .39,
    outerRadius = innerRadius * 1.1;
	
var Names = ["Adolescents","Teachers","Parents","Internet","Peers","Society","Social Media","Video Content"],
	colors = ["#ab4776","#ef9a9a","#ef5350","#e57373","#e53935","#c62828","#d32f2f","#b71c1c"],
	opacityDefault = 0.8;


var matrix = [
	[0,10,6,10,6,4,6,13], //Adolescents
	[6,0,0,0,0,0,0,0], //Teachers
	[8,0,0,0,0,0,0,0], //Parents
	[10,0,0,0,0,0,0,0], //Internet
	[12,0,0,0,0,0,0,0], //Peers
	[14,0,0,0,0,0,0,0], //Society
	[14,0,0,0,0,0,0,0], //Social Media
	[16,0,0,0,0,0,0,0], //Video
];

////////////////////////////////////////////////////////////
/////////// Create scale and layout functions //////////////
////////////////////////////////////////////////////////////

var colors = d3.scale.ordinal()
    .domain(d3.range(Names.length))
	.range(colors);

//A "custom" d3 chord function that automatically sorts the order of the chords in such a manner to reduce overlap	
var chord = customChordLayout()
    .padding(.15)
    .sortChords(d3.descending) //which chord should be shown on top when chords cross. Now the biggest chord is at the bottom
	.matrix(matrix);
		
var arc = d3.svg.arc()
    .innerRadius(innerRadius*1.01)
    .outerRadius(outerRadius);

var path = d3.svg.chord()
	.radius(innerRadius);
	
////////////////////////////////////////////////////////////
////////////////////// Create SVG //////////////////////////
////////////////////////////////////////////////////////////
	
var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
	.append("g")
    .attr("transform", "translate(" + (width/2 + margin.left) + "," + (height/2 + margin.top) + ")");

////////////////////////////////////////////////////////////
/////////////// Create the gradient fills //////////////////
////////////////////////////////////////////////////////////

//Function to create the id for each chord gradient
function getGradID(d){ return "linkGrad-" + d.source.index + "-" + d.target.index; }

//Create the gradients definitions for each chord
var grads = svg.append("defs").selectAll("linearGradient")
	.data(chord.chords())
   .enter().append("linearGradient")
	.attr("id", getGradID)
	.attr("gradientUnits", "userSpaceOnUse")
	.attr("x1", function(d,i) { return innerRadius * Math.cos((d.source.endAngle-d.source.startAngle)/2 + d.source.startAngle - Math.PI/2); })
	.attr("y1", function(d,i) { return innerRadius * Math.sin((d.source.endAngle-d.source.startAngle)/2 + d.source.startAngle - Math.PI/2); })
	.attr("x2", function(d,i) { return innerRadius * Math.cos((d.target.endAngle-d.target.startAngle)/2 + d.target.startAngle - Math.PI/2); })
	.attr("y2", function(d,i) { return innerRadius * Math.sin((d.target.endAngle-d.target.startAngle)/2 + d.target.startAngle - Math.PI/2); })

//Set the starting color (at 0%)
grads.append("stop")
	.attr("offset", "0%")
	.attr("stop-color", function(d){ return colors(d.source.index); });

//Set the ending color (at 100%)
grads.append("stop")
	.attr("offset", "100%")
	.attr("stop-color", function(d){ return colors(d.target.index); });
		
////////////////////////////////////////////////////////////
////////////////// Draw outer Arcs /////////////////////////
////////////////////////////////////////////////////////////

var outerArcs = svg.selectAll("g.group")
	.data(chord.groups)
	.enter().append("g")
	.attr("class", "group")
	.on("mouseover", fade(.1))
	.on("mouseout", fade(opacityDefault));

outerArcs.append("path")
	.style("fill", function(d) { return colors(d.index); })
	.attr("d", arc)
	.each(function(d,i) {
		//Search pattern for everything between the start and the first capital L
		var firstArcSection = /(^.+?)L/; 	

		//Grab everything up to the first Line statement
		var newArc = firstArcSection.exec( d3.select(this).attr("d") )[1];
		//Replace all the comma's so that IE can handle it
		newArc = newArc.replace(/,/g , " ");
		
		//If the end angle lies beyond a quarter of a circle (90 degrees or pi/2) 
		//flip the end and start position
		if (d.endAngle > 90*Math.PI/180 & d.startAngle < 270*Math.PI/180) {
			var startLoc 	= /M(.*?)A/,		//Everything between the first capital M and first capital A
				middleLoc 	= /A(.*?)0 0 1/,	//Everything between the first capital A and 0 0 1
				endLoc 		= /0 0 1 (.*?)$/;	//Everything between the first 0 0 1 and the end of the string (denoted by $)
			//Flip the direction of the arc by switching the start en end point (and sweep flag)
			//of those elements that are below the horizontal line
			var newStart = endLoc.exec( newArc )[1];
			var newEnd = startLoc.exec( newArc )[1];
			var middleSec = middleLoc.exec( newArc )[1];
			
			//Build up the new arc notation, set the sweep-flag to 0
			newArc = "M" + newStart + "A" + middleSec + "0 0 0 " + newEnd;
		}//if
		
		//Create a new invisible arc that the text can flow along
		svg.append("path")
			.attr("class", "hiddenArcs")
			.attr("id", "arc"+i)
			.attr("d", newArc)
			.style("fill", "none");
	});

////////////////////////////////////////////////////////////
////////////////// Append Names ////////////////////////////
////////////////////////////////////////////////////////////

//Append the label names on the outside
outerArcs.append("text")
	.attr("class", "titles")
	.attr("dy", function(d,i) { return (d.endAngle > 90*Math.PI/180 & d.startAngle < 270*Math.PI/180 ? 25 : -16); })
   .append("textPath")
	.attr("startOffset","50%")
	.style("text-anchor","middle")
	.attr("xlink:href",function(d,i){return "#arc"+i;})
	.text(function(d,i){ return Names[i]; });
	
////////////////////////////////////////////////////////////
////////////////// Draw inner chords ///////////////////////
////////////////////////////////////////////////////////////
  
svg.selectAll("path.chord")
	.data(chord.chords)
	.enter().append("path")
	.attr("class", "chord")
	.style("fill", function(d){ return "url(#" + getGradID(d) + ")"; })
	.style("opacity", opacityDefault)
	.attr("d", path)
	.on("mouseover", mouseoverChord)
	.on("mouseout", mouseoutChord);

////////////////////////////////////////////////////////////
////////////////// Extra Functions /////////////////////////
////////////////////////////////////////////////////////////

//Returns an event handler for fading a given chord group.
function fade(opacity) {
  return function(d,i) {
    svg.selectAll("path.chord")
        .filter(function(d) { return d.source.index !== i && d.target.index !== i; })
		.transition()
        .style("opacity", opacity);
  };
}//fade

//Highlight hovered over chord
function mouseoverChord(d,i) {
  
	//Decrease opacity to all
	svg.selectAll("path.chord")
		.transition()
		.style("opacity", 0.1);
	//Show hovered over chord with full opacity
	d3.select(this)
		.transition()
        .style("opacity", 1);
  
	//Define and show the tooltip over the mouse location
	$(this).popover({
		placement: 'auto top',
		container: 'body',
		mouseOffset: 10,
		followMouse: true,
		trigger: 'hover',
		html : true,
		content: function() { 
			if(Names[d.target.index] == 'Video Content' || Names[d.source.index] == 'Video Content')
				return VideoContent();
			else if(Names[d.target.index] == 'Social Media' || Names[d.source.index] == 'Social Media')
				return SocialMediaContent();
			else if(Names[d.target.index] == 'Society' || Names[d.source.index] == 'Society')
				return SocietyContent(); 
			else if(Names[d.target.index] == 'Peers' || Names[d.source.index] == 'Peers')
				return PeersContent(); 
			else if(Names[d.target.index] == 'Internet' || Names[d.source.index] == 'Internet')
				return InternetContent(); 
			else if(Names[d.target.index] == 'Parents' || Names[d.source.index] == 'Parents')
				return ParentsContent(); 
			else if(Names[d.target.index] == 'Teachers' || Names[d.source.index] == 'Teachers')
				return TeachersContent();  
			else
				return "<p> Gap </p>";
		}
	});
	$(this).popover('show');
}//mouseoverChord

//Bring all chords back to default opacity
function mouseoutChord(d) {
	//Hide the tooltip
	$('.popover').each(function() {
		$(this).remove();
	}); 
	//Set opacity back to default for all
	svg.selectAll("path.chord")
		.transition()
		.style("opacity", opacityDefault);
}//function mouseoutChord

function VideoContent(){
	return "<p style='font-size: 14px; text-align: center; font-family: Roboto, sans-serif'><span style='color: #212121'>Videos including pornography create <b>misconceptions</b>, " + 
	"<b>false expectations</b> and <b>deviate curiosity towards negative direction</b>.</span></p>"
}

function SocialMediaContent(){
	return "<p style='font-size: 14px; text-align: center; font-family: Roboto, sans-serif'><span style='color: #212121'>Social Media has started to <b>drive adolescents' behaviour</b>. " + 
	"Here, they regularly get exposed to <b>age-inappropriate content</b>.</span></p>"
}

function SocietyContent(){
	return "<p style='font-size: 14px; text-align: center; font-family: Roboto, sans-serif'><span style='color: #212121'>Numerous <b>myths</b> and <b>superstions</b> related to sex are floating around. " + 
	"Many political bodies believe that sex-ed promotes <b>promiscuity</b> & <b>immorality</b>.</span></p>"
}

function PeersContent(){
	return "<p style='font-size: 14px; text-align: center; font-family: Roboto, sans-serif'><span style='color: #212121'>Peers are the major <b>source of incorrect information</b>. This" + 
	" often results in <b>irrational phobias</b> or <b>indulgence in unsafe practices</b>.</span></p>"
}

function InternetContent(){
	return "<p style='font-size: 14px; text-align: center; font-family: Roboto, sans-serif'><span style='color: #212121'>Information obtained from various articles and blogs on Internet " + 
	"is <b>broad</b>, <b>exaggerated</b> and often <b>unnecessary</b>.</span></p>"
}

function ParentsContent(){
	return "<p style='font-size: 14px; text-align: center; font-family: Roboto, sans-serif'><span style='color: #212121'>Indian parents are <b>misinformed</b> about numerous aspects " + 
	"of SRH. There is also <b>limited information exchange</b> between parents and wards due to the <b>associated stigma</b>.</span></p>"
}

function TeachersContent(){
	return "<p style='font-size: 14px; text-align: center; font-family: Roboto, sans-serif'><span style='color: #212121'>Indian teachers are <b>not trained</b> enough to impart sex-ed as a life skill. " + 
	"They themselves feel <b>shy</b> and <b>embarrassed</b>.</span></p>"
}





