var svg1 = d3.select("#subsystem").select("svg"),
    margin = {left:40, top:40, right:40, bottom:0},
    diameter = +svg1.attr("width"),
    g = svg1.append("g").attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");


var color = d3.scale.ordinal()
  .domain(-1,4)
  //.range(["#ab4776","#ef9a9a","#ffcdd2","#ffebee"])
  .range(["#ab4776","#ffebee","#ffcdd2","#ef9a9a"]);

//var color = ["#ab4776","#ef9a9a","#ef5350","#e57373","#e53935","#c62828","#d32f2f","#b71c1c"];

  /*var color =  d3.scaleSequential(d3.interpolateMagma)
    .domain([-4, 4]);*/

var pack = d3.pack()
    .size([diameter - margin.left, diameter - margin.left])
    .padding(2);

d3.json("js/flare.json", function(error, root) {
  if (error) throw error;

  root = d3.hierarchy(root)
      .sum(function(d) { return d.size; })
      .sort(function(a, b) { return b.value - a.value; });

  var focus = root,
      nodes = pack(root).descendants(),
      view;

  var circle = g.selectAll("circle")
    .data(nodes)
    .enter().append("circle")
      .attr("class", function(d) { return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root"; })
      .style("fill", function(d) { console.log("color1" + color(2)); return d.children ? color(d.depth) : null; })
      .on("click", function(d) { if (focus !== d) zoom(d), d3.event.stopPropagation(); });

  var text = g.selectAll("text")
    .data(nodes)
    .enter().append("text")
      .attr("class", "label")
      .style("fill-opacity", function(d) { return d.parent === root ? 1 : 0; })
      .style("display", function(d) { return d.parent === root ? "inline" : "none"; })
      .style("color", "rgb(255,255,255)")
      .text(function(d) { return d.data.name; });

  var node = g.selectAll("circle,text");

  svg1
      /*.style("background", color(-1))*/
      .on("click", function() { zoom(root); });

  zoomTo([root.x, root.y, root.r * 2 + margin.left]);
  var count=0;

  function zoom(d) {
    count++;
    var focus0 = focus; focus = d;

    var transition = d3.transition()
        .duration(d3.event.altKey ? 7500 : 750)
        .tween("zoom", function(d) {
          var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin.left]);
          return function(t) { zoomTo(i(t)); };
        });

    transition.selectAll("text")
      .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
        .style("fill-opacity", function(d) { return d.parent === focus ? 1 : 0; })
        .style("font-size", function(d){
          if(count%2 != 0) return "11px"; 
          else return "16px";})
        .on("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
        .on("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
  }

  function zoomTo(v) {
    var k = diameter / v[2]; view = v;
    node.attr("transform", function(d) { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"; });
    circle.attr("r", function(d) { return d.r * k; });
  }
});


/*var margin = 20,
    padding = 2,
    diameter = 650,
    root = flareData();

var color = d3.scale.linear()
    .domain([0, depthCount(root)])
    .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
    .interpolate(d3.interpolateHcl);

var pack = d3.layout.pack()
    .padding(padding)
    .size([diameter, diameter])
    .value(function(d) {
        //return d.size;
      return 100;
    }),
    arc = d3.svg1.arc().innerRadius(0),
    pie = d3.layout.pie;

var svg1 = d3.select("#subsystem").append("svg1")
    .attr("width", diameter)
    .attr("height", diameter)
    .append("g")
    .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

var focus = root,
    nodes = pack.nodes(root),
    view;


var circle = svg1.selectAll("circle")
    .data(nodes)
    .enter().append("circle")
    .attr("class", function(d) {
        return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root";
    })
    .style("fill", function(d) {
        return d.children ? color(d.depth) : null;
    })
    .on("click", function(d) {
        if (focus !== d) zoom(d), d3.event.stopPropagation();
    });



var text = svg1.selectAll("text")
    .data(nodes)
    .enter().append("text")
    .attr("class", "label")
    .style("fill-opacity", function(d) {
        return 1;
        //return d.parent === root ? 1 : 0;
    })
    .style("display", function(d) {
        return null;
        //return d.parent === root ? null : "none";
    })
    .text(function(d) {
        return d.name;
    });

var node = svg1.selectAll("circle,text");

d3.select("#subsystem")
    .on("click", function() {
        zoom(root);
    });

zoomTo([root.x, root.y, root.r * 2 + margin]);

function zoom(d) {
    var focus0 = focus;
    focus = d;

    var transition = d3.transition()
        .duration(d3.event.altKey ? 7500 : 750)
        .tween("zoom", function(d) {
            var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin]);
            return function(t) {
                zoomTo(i(t));
            };
        });

    transition.selectAll("text")
        .filter(function(d) {
            return d.parent === focus || this.style.display === "inline";
        })
        .style("fill-opacity", function(d) {
            return d.parent === focus ? 1 : 0;
        })
        .each("start", function(d) {
            if (d.parent === focus) this.style.display = "inline";
        })
        .each("end", function(d) {
            if (d.parent !== focus) this.style.display = "none";
        });
}

function zoomTo(v) {
    var k = diameter / v[2];
    console.log("v2=" + v);
    view = v;
    node.attr("transform", function(d) {
        return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")";
    });
    circle.attr("r", function(d) {
        console.log(d.r);
        return d.r * k;
    });
}


function depthCount(branch) {
    if (!branch.children) {
        return 1;
    }
    return 1 + d3.max(branch.children.map(depthCount));
}

d3.select(self.frameElement).style("height", diameter + "px");



function flareData() {
    return {
        "name": "SexEd",
        "children": [
          {

            "name": "Parents",
            "children": [

              {"name": "boy",
              "size": 9000},
              {"name": "girl",
              "size": 4000},
              {"name": "parents",
              "size": 2000},
              {"name": "peers",
              "size": 3500},
              {"name": "siblings",
              "size": 1000},

            ]

          }, //parents

          {

            "name": "Stakeholders",
            "children": [

              {"name": "Teachers",
              "size": 4000},
              {"name": "Doctors",
              "size": 3200},
              {"name": "Nurses",
              "size": 2450},
              {"name": "Health Workers",
              "size": 6120},
              {"name": "Authors",
              "size": 1450},

            ]

          }, //StakeHolders

          

          {

            "name": "Content",
            "children": [

              {"name": "Human Reproduction",
              "size": 2405},
              {"name": "Diseases",
              "size": 6301},
              {"name": "Relationships",
              "size": 2090},
              {"name": "Preventive Measures",
              "size": 6022},
              {"name": "Puberty",
              "size": 5102},
              {"name": "Human Anatomy",
              "size": 8102},

            ]

          }, //Content

          {

            "name": "Administration",
            "children": [

              {"name": "Local Govt.",
              "size": 2540},
              {"name": "NGOs",
              "size": 6730},
              {"name": "Politicians",
              "size": 5420},
              {"name": "PTA",
              "size": 2360},
              {"name": "Political Organizations",
              "size": 7610},
              {"name": "School Principal",
              "size": 2310},

            ]

          }, //Admin

          {

            "name": "Sexual Health",
            "children": [

              {"name": "Pregnancy",
              "size": 4540},
              {"name": "STDs",
              "size": 3350},
              {"name": "Contraceptives",
              "size": 6720},
              {"name": "Drugs",
              "size": 7660},
              {"name": "Pharmacies",
              "size": 5410},
              {"name": "Hospitals",
              "size": 8710},
              {"name": "Abortion",
              "size": 3510},
              {"name": "Nutrition",
              "size": 1650},

            ]

          }, //Sexual health

          {

            "name": "Society",
            "children": [

              {"name": "Cultural Practices",
              "size": 6407},
              {"name": "Crime",
              "size": 9304},
              {"name": "Tradition/Religion",
              "size": 1206},
              {"name": "Sex-oriented Abuses",
              "size": 4605},
              {"name": "Superstitions",
              "size": 8103},
              {"name": "Myths",
              "size": 7104},

            ]

          }, //Society

          {

            "name": "Digital Media",
            "children": [

              {"name": "Cultural Practices",
              "size": 7403},
              {"name": "Crime",
              "size": 7304},
              {"name": "Tradition/Religion",
              "size": 4208},
              {"name": "Sex-oriented Abuses",
              "size": 6604},
              {"name": "Superstitions",
              "size": 3105},
              {"name": "Myths",
              "size": 5643},

            ]

          }, //Digital Media

          {

            "name": "Print Media",
            "children": [

              {"name": "Textbooks",
              "size": 1450},
              {"name": "Print Media",
              "size": 1320},
              {"name": "Newspapers",
              "size": 2250},
              {"name": "Novels",
              "size": 1601},
              

            ]

          }, //Print Media





        ] //main children


    } //returb
            
}


*/

/*var svg11 = d3.select("#subsystem").select("svg11"),
    width = +svg11.attr("width"),
    height = +svg11.attr("height");

var format = d3.format(",d");

var color = d3.scaleSequential(d3.interpolateMagma)
    .domain([-4, 4]);

var stratify = d3.stratify()
    .parentId(function(d) { return d.id.substring(0, d.id.lastIndexOf(".")); });

var pack = d3.pack()
    .size([width - 2, height - 2])
    .padding(3);

d3.csv("js/flare.csv", function(error, data) {
  if (error) throw error;

  var root = stratify(data)
      .sum(function(d) { return d.value; })
      .sort(function(a, b) { return b.value - a.value; });

  pack(root);

  var node = svg11.select("g")
    .selectAll("g")
    .data(root.descendants())
    .enter().append("g")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
      .attr("class", function(d) { return "node" + (!d.children ? " node--leaf" : d.depth ? "" : " node--root"); })
      .each(function(d) { d.node = this; })
      .on("mouseover", hovered(true))
      .on("mouseout", hovered(false));

  node.append("circle")
      .attr("id", function(d) { return "node-" + d.id; })
      .attr("r", function(d) { return d.r; })
      .style("fill", function(d) { return color(d.depth); });

  var leaf = node.filter(function(d) { return !d.children; });

  leaf.append("clipPath")
      .attr("id", function(d) { return "clip-" + d.id; })
    .append("use")
      .attr("xlink:href", function(d) { return "#node-" + d.id + ""; });

  leaf.append("text")
      .attr("clip-path", function(d) { return "url(#clip-" + d.id + ")"; })
    .selectAll("tspan")
    .data(function(d) { return d.id.substring(d.id.lastIndexOf(".") + 1).split(/(?=[A-Z][^A-Z])/g); })
    .enter().append("tspan")
      .attr("x", 0)
      .attr("y", function(d, i, nodes) { return 13 + (i - nodes.length / 2 - 0.5) * 10; })
      .text(function(d) { return d; });

  node.append("title")
      .text(function(d) { return d.id + "\n" + format(d.value); });
});

function hovered(hover) {
  return function(d) {
    d3.selectAll(d.ancestors().map(function(d) { return d.node; })).classed("node--hover", hover);
  };
}*/