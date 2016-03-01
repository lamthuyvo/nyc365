$( document ).ready(function() {
	var windowWidth = $(window).innerWidth();
		windowHeight = $(window).innerHeight();

	// make sections a height of window
	$('.section').height(windowHeight);


	//Width, height and 
	var w = parseInt(d3.select('#chart-container').style('width'), 10);;
	var h = windowHeight - $('#chart-intro').height() -100;
	console.log(windowHeight - $('#chart-box').height())
	var padding = 50;
	var margin=  {top: 30, right: 0, bottom: 30, left: 0};

	d3.select(window).on('resize', resize); 

	function resize() {
	    // update width
	    w = parseInt(d3.select('#chart-container').style('width'), 10);
	    w = w - padding;

	    // reset x range
	    var xScale = d3.scale.linear()
						 .domain([0, d3.max(ambionicData, function(d) { return d[0]; })])
						 .range([padding, w - padding]);
	    yScale = d3.scale.linear()
						 .domain([0, d3.max(ambionicData, function(d) { return d[1]; })])
						 .range([h - padding, padding]);

	    // do the actual resize...
	    var circles = d3.selectAll("circles");
	    circles.attr("cx", function(d) {
	   		return xScale(d[0]);
	   	})

	    xAxis.scale(xScale);

	}

	var happyColor = '#f563f1',
		mixedColor = '#dbbc3d',
		unhappyColor = '#009abe';

	//Create scale functions
	var xScale = d3.scale.linear()
						// .domain([0, d3.max(ambionicData, function(d, i) { return ambionicData[ambionicData.length-1].days_elapsed; })])
						.domain([0,365])
						.range([padding, w-25]);
	

	var yScale = d3.scale.linear()
						 // .domain([0, d3.max(ambionicData, function(d) { return ambionicData[ambionicData.length-1].time_fraction })])
						 .domain([0, 24])
						 .range([h - padding, padding]);

	//Define X axis
	var xAxis =	d3.svg.axis()
                  .scale(xScale)
                  .orient("bottom")
                  .ticks(5)
                  .tickValues([0, 183, 366])
                  .tickFormat(function(d,i){
					  	if (d == 0){
					  		return "arrival in NYC";
					  	} else if (d === 183){
					  		// return d + " days";	
					  		return "first six months";						  		
					  	} else if (d === 366)
					  		return "1st year"
					  });//setting rough number of ticks


	//Define Y axis
	var yAxis = d3.svg.axis()
	                .scale(yScale)
	      			.tickSize(-w-padding-10)
	           	  	.orient("left")
	           	  	.tickValues([  6, 12, 18, 24])
	                .tickFormat(function(d, i){
	                 		if (d > 12 && d != 24){
	                 			return d -12 + " PM";
	                 		} else if (d == 12){
	                 			return d + " PM";
	                 		} else if (d == 24) {
	                 			return "12 AM";
	                 		} else if (d == 0) {
	                 			return "12 AM";
	                 		}
	                 		else{
	                 			return d + " AM";
	                 		}
				   });


	
	// Create SVG element
	var svg = d3.select('#chart-container')
				.append("svg")
				.attr({
					width: w,
					height: h
				});

	//Create X axis
	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + (h - padding) + ")") // makes the x-axis go on the bottom
		.call(xAxis);

	//Create Y axis
	svg.append("g")
	    .attr("class", "y axis")
	    .attr("transform", "translate(" + padding + ",0)")
	    .call(yAxis);


	//Y-axis label

	var YAxisLines = d3.selectAll('.y');

	// Create circles
	function makeGraphic (){
		svg.selectAll("circle")
		   .data(ambionicData)
		   .enter()
		   .append("circle")
		   .attr("fill", function(d){
		   		if (d.emotion === "negative"){
		   			return unhappyColor
		   		} else if (d.emotion === "positive"){
		   			return happyColor
		   		} else{
		   			return mixedColor
		   		}
		   })
		   .attr("r", 0)
			   	.transition()
			   	.duration(100)
			   	.delay(function(d, i) { return i * 10; })
			   	.each("end", function(){

			   	})
			.attr("r", 7)
			   	.transition()
			   	.duration(500)
			   	.delay(function(d, i) { return i * 10 + 500; })
		   .attr("r", 5)
		   .attr("cx", function(d) {
		   		return xScale(d.days_elapsed);
		   })
		   .attr("cy", function(d) {
		   		return yScale(d.time_fraction);
		   })
		   .attr("opacity", 0.5);

	}

		
	$('#start').on("click", function(){
		$('html,body').animate({
	        scrollTop: $('#chart1').offset().top,
	    }, 800, 'easeOutExpo');
	    makeGraphic();
	})


	// make waypoints



	

});