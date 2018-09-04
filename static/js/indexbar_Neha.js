var $this = $('.chart');

var data = [{
  label: "Bleach Sol.",
  "Month": 192,
  "Week": 16
}, {
  label: "Cleaning-Disin.",
  "Month": 460,
  "Week": 32
}, {
  label: "  Franganzia Cleaner",
  "Month": 6400,
  "Week": 288
}, {
  label: "Laundry",
  "Month": 1560,
  "Week": 110
},
{
  label: "Spray",
  "Month": 4382,
  "Week": 238
},
{
  label: "Toilet and Bath",
  "Month": 3274,
  "Week": 164
},
{
  label: "Wipes",
  "Month": 3653,
  "Week": 81
}
];

var configuration = [{
  "yLabel": "Sales Amount"
}];
var w = 860;
var h = 500;

function colores_google(n) {
  var colores_g = ["#f7b363", "#448875", "#c12f39", "#2b2d39", "#f8dd2f", "#8bf41b"];
  return colores_g[n % colores_g.length];
}

var colorScale = d3.scale.ordinal().range(["#f7b363", "#448875", "#c12f39", "#2b2d39", "#f8dd2f", "#8bf41b"]);

var margin = {
    top: 20,
    right: 110,
    bottom: 30,
    left: 20
  },
  width = w - margin.left - margin.right,
  height = h - margin.top - margin.bottom;


var svg = d3.select($this[0]).append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var axisHolder = svg.append("g")
  .attr("class", "axis");
var chartHolder = svg.append("g")
  .attr("class", "chart");
var legendHolder = svg.append("g")
  .attr("class", "legend");

var x0 = d3.scale.ordinal()
  .rangeRoundBands([0, width], .1);

var x1 = d3.scale.ordinal();

var y = d3.scale.linear()
  .range([height, 0]);

var xAxis = d3.svg.axis()
  .scale(x0)
  .orient("bottom");

var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left")
  .tickFormat(d3.format(","));
  console.log(y);


var divTooltip = d3.select(".chart").append("div").attr("class", "toolTip");

//var divTooltip = d3.tip()
                  //.attr('class' , 'chart')
                //  .offset([80, -60])
                  //.html(function (data) {
                   // var sales = data.Month

                  //return sales ;
                  //});

//svg.append('g')
  // .attr('transform' , 'translate(100,-300)')
   //.call(divTooltip);

var options = getOptions(data);
var data = refactorData(data, options);

function getOptions(data) {
  var options = d3.keys(data[0]).filter(function(key) {
    return key !== "label";
  });
  return options;
}
function refactorData(data, options) {
  data.forEach(function(d) {
    d.valores = options.map(function(name) {
      return {
        name: name,
        value: +d[name],
        state: "active"
      };
    });
  });
  return data;
}

colorScale.domain(options);
x0.domain(data.map(function(d) {
  return d.label;
}));
x1.domain(options).rangeRoundBands([0, x0.rangeBand()]);
y.domain([0, d3.max(data, function(d) {
  return d3.max(d.valores, function(d) {
    return d.value;
  });
})]);

axisHolder.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis);

axisHolder.append("g")
  .attr("class", "y axis")
  .call(yAxis)
  .append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 6)
  .attr("dy", ".71em")
  .style("text-anchor", "end")
  .text(configuration[0].yLabel);
drawBars();

var legend = legendHolder.selectAll(".legend")
  .data(options.slice())
  .enter().append("g")
  .attr("class", "legend")
  .attr("transform", function(d, i) {
    return "translate(" + margin.right + "," + i * 20 + ")";
  });

legend.append("rect")
  .attr("x", width - 18)
  .attr("width", 18)
  .attr("height", 18).style("stroke", function(d, i) {
    return colorScale(d); //colores_google(i);
  }).style("fill", function(d, i) {
    return colorScale(d); //colores_google(i);
  }).style('cursor', 'pointer')
  .on("click", function(name) {
		if(d3.select(this).classed('clicked')) {
   			d3.select(this).classed('clicked', false);
				d3.select(this).style('fill-opacity', 1);
        toggleBar(name, false);
    } else {
    		d3.select(this).classed('clicked', true);
        d3.select(this).style('fill-opacity', 0);
        toggleBar(name, true);
    }
  });

legend.append("text")
  .attr("x", width - 24)
  .attr("y", 9)
  .attr("dy", ".35em")
  .style("text-anchor", "end")
  .text(function(d) {
    return d;
  });

function toggleBar(name, state) {
	data.forEach(function(d) { 
  	_.findWhere(d.valores, {name: name}).hidden = state;
  });
  var filteredOptions;
	if(state) {
  		filteredOptions = options.filter(function(d) { return d !== name; });
  } else {
  	filteredOptions = options;
  }
  x1.domain(filteredOptions).rangeRoundBands([0, x0.rangeBand()]);
y.domain([0, d3.max(data, function(d) {
  return d3.max(d.valores.filter(function(k) { return !k.hidden;}), function(d) {
    return d.value;
  });
})]);
 
  axisHolder.select('.x.axis').call(xAxis);
	axisHolder.select('.y.axis').call(yAxis);
  drawBars();
}

function drawBars() { 
	var barGroups = chartHolder.selectAll("g.bars")
  .data(data);
  
  barGroups
  .enter().append("g")
  .attr("class", "bars")
  .attr("transform", function(d) {
    return "translate(" + x0(d.label) + ",0)";
  });

	barGroups.exit().remove();
var barEnter = barGroups.selectAll("rect")
  .data(function(d) {
    return d.valores.filter(function(k) { return !k.hidden; }) ;
  });
 
 barEnter
  .enter().append("rect").attr('height', 0).attr('y', height).attr('x', 0).attr('width', 0).style('fill',function(d, i) {
    return colorScale(d.name); //colores_google(i);
  });
 barEnter.transition().duration(500)
  .attr("width", x1.rangeBand())
  .attr("x", function(d) {
    return x1(d.name);
  })
  .attr("y", function(d) {
    return y(d.value);
  }).style('fill',function(d, i) {
    return colorScale(d.name); //colores_google(i);
  })
  .attr("value", function(d) {
    return d.name;
  })
  .attr("height", function(d) {
    return height - y(d.value);
  })
 barEnter.on("mousemove", function(d) {
   var parent = d3.select(this.parentNode).datum();
    divTooltip.style("left", d3.event.pageX + 10 + "px");
    divTooltip.style("top", d3.event.pageY - 25 + "px");
    divTooltip.style("display", "inline-block");
 //   var x = d3.event.pageX,
 //     y = d3.event.pageY
 //   var elements = document.querySelectorAll(':hover');
 //   l = elements.length
 //   l = l - 1
 //   elementData = elements[l].__data__
    divTooltip.html((parent.label) + "<br>" + d.name + "<br>" + d.value + "%");
  }).on("mouseout", function(d) {
    divTooltip.style("display", "none");
  });

 barEnter.exit().transition().duration(500).attr('x', 0).attr('width', 0).attr('y', height).attr('height', 0).remove();

}
