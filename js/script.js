$( document ).ready(function() {
	var windowWidth = $(window).innerWidth();
		windowHeight = $(window).innerHeight();

	$('.fa-music').addClass("animated bounce");
	$('#start h1').addClass("animated bounce");

	// make sections a height of window
	$('.section').height(windowHeight);

	var firstContentHeight = $('#start').height();

	$('#section1').css("margin-top", (windowHeight-firstContentHeight)/2)


	//Width, height and 
	// var w = parseInt(d3.select('#chart-container').style('width'), 10);
	var w = windowWidth * 0.95;
	// var h = windowHeight - $('#chart-intro').height();
	var h = windowHeight;
	
	var padding = 50;
	var margin=  {top: 30, right: 0, bottom: 30, left: 0};

	var happyColor = '#f563f1',
		mixedColor = '#dbbc3d',
		unhappyColor = '#009abe';

	//Create scale functions
	var xScale = d3.scale.linear()
						.domain([0,365])
						.range([padding, w-25]);
	

	var yScale = d3.scale.linear()
						 .domain([0, 24])
						 .range([h - padding, padding]);

	//Define X axis
	var xAxis =	d3.svg.axis()
                  .scale(xScale)
                  .orient("bottom")
                  .ticks(5)
                  .tickValues([0, 183, 365])
                  .tickFormat(function(d,i){
					  	if (d == 0){
					  		return "arrival in NYC";
					  	} else if (d === 183){
					  		// return d + " days";	
					  		return "first six months";						  		
					  	} else if (d === 365)
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

	var nodes = ambionicData;

	var force = d3.layout.force()
		    .nodes(nodes)
		    .size([w, h]);

	
	//Y-axis label
	var YAxisLines = d3.selectAll('.y');
	


	// Create circles
	function makeGraphic (){
		//for force layout
		force.on("tick", tick)
		    .start();

		var node = svg.selectAll(".node")
		    .data(nodes)
		  .enter().append("circle")
		    .attr("class", "node")
		    .attr("cx", function(d) { return d.x; })
		    .attr("cy", function(d) { return d.y; })
		    .attr("r", 5)
		    .attr("opacity", 0.5)
		    .attr("fill", function(d){
		          if (d.emotion === "negative"){
		            return unhappyColor
		          } else if (d.emotion === "positive"){
		            return happyColor
		          } else{
		            return mixedColor
		          }
		       })
		       .attr("class", function(d){ 
		        if (d.days_elapsed > 213){
		          return d.emotion + " " + d.storyCategory + " breakup";
		        } else{
		          return d.emotion + " " + d.storyCategory;
		        }
		        

		       })
		     .on("mouseover", function(d) {
				if (d.emotion === "negative"){
		   			var color = unhappyColor
		   		} else if (d.emotion === "positive"){
		   			var color = happyColor
		   		} else{
		   			var color = mixedColor
		   		}

				// Define tooltip
				var tooltip = d3.select("body")
						.append("div")
						.attr("class", "tooltip tooltip-noarrow")
						.style("opacity", 0);

	      		tooltip.html('<div class="legend">'+
	      			'<table style="width:100%;">'+
	      			'<tr><td>Song:</td><td style="text-align:right">'+ d.song +'</td></tr>'+
	      			'<tr><td></div> Artist:</td><td style="text-align:right"> '+ d.artist +'</td></tr>'+
	      			'<tr><td>Emotion:</td><td style="text-align:right">' + d.emotion+'<div class="circle" style="background-color:'+ color +'; margin-left:10px; float: right;"></div></td></tr>'+
	      			'</table></div>')
	            tooltip.style("opacity", 1)
	                .style("position", "absolute");
	            if (d3.event.pageX > (w/2)){
	        		tooltip.style("left", (d3.event.pageX)-200 + "px")
        			.style("top", (d3.event.pageY) + "px")
        			.append("rect");
	            }else{

	            	tooltip.style("left", (d3.event.pageX) + "px")
        			.style("top", (d3.event.pageY) + "px")

	            }
			})
			.on("mouseout", function(d) {
			    d3.selectAll('.tooltip')
			        .remove();

			})
		
		    .on("mousedown", function() { d3.event.stopPropagation(); });


		function tick(e) {


		  node.attr("cx", function(d) { return d.x; })
		      .attr("cy", function(d) { return d.y; });
		}



		
	}

	

	// section 1: graphic explanation 

	$('#start').waypoint(function(direction) {

		  	if (direction === 'down') {
		  		
		  		$('.chart-box').animate({"opacity":1}, 500);

			    makeGraphic();

			    $('#start').fadeOut()
	
		  	} else if (direction === 'up'){
		  		$('#start').fadeIn()
		  	}
		}, {
		  	offset: '0px'
	})


	// section 2: highlight happy, mixed and sad
	$('#chart-chapter2').waypoint(function(direction) {
		  	if (direction === 'down') {

			    $('#chart-chapter2').animate({"opacity": 1})
	
		  	} else if (direction === 'up'){
		  		$('#chart-chapter2').animate({"opacity": 0})
		  	}
		}, {
		  	offset: 2*(windowHeight/3)+'px'
	})


	// section 3: show songs on timeline

	$('#chart-chapter3').waypoint(function(direction) {
		  	if (direction === 'down') {
		  		force.stop();
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

		  		d3.selectAll('circle')
		  			.transition()
				   	.duration(1000)
				   	.delay(function(d, i) { return i * 2; })
		  			.attr("cx", function(d) {
			   		return xScale(d.days_elapsed);
				   })
				   .attr("cy", function(d) {
				   		return yScale(d.time_fraction);
				   })
		  		

			    $('#chart-chapter3').animate({"opacity": 1})
	
		  	} else if (direction === 'up'){

		  		force.start();


		  		d3.selectAll('.axis')
		  			.transition()
		  			.duration(500)
		  			.attr("opacity", 0);

		  		$('#chart-chapter3').animate({"opacity": 0})
		  		
		  	}
		}, {
		  	offset: windowHeight/2+'px'
	})


	// section 4: show breakup dots and highlight dots (move view and show )
	// breakup was 10/20/2014 - day 241 after coming to NYC

	$('#chart-chapter4').waypoint(function(direction) {
		  	if (direction === 'down') {

		  		// change scale
		  		xScale.domain([241,365]);


		  		// disappear old axis
		  		d3.selectAll(".x")
		  			.transition()
		  			.duration(500)
		  			.attr("opacity", 0);

		  		var xAxis2 = d3.svg.axis()
			                  .scale(xScale)
			                  .orient("bottom")
			                  .ticks(2)
			                  .tickValues([241, 365])
			                  .tickFormat(function(d,i){
								  	if (d === 241){
								  		return "the Breakup";
								  						  		
								  	} else if (d === 365)
								  		return "1st year"
							  });

			    //Create X axis
				svg.append("g")
					.attr("class", "x2 axis")
					.attr("transform", "translate(0," + (h - padding) + ")") // makes the x-axis go on the bottom
					.call(xAxis2);
 
		  		// change dot location by 
		  		d3.selectAll('circle.nyc')
		  			.transition()
				   	.duration(300)
		  			.attr("opacity", 0.5)
		  			.attr("r", 0);

		  		// change dot location by 
		  		d3.selectAll('circle.work')
		  			.transition()
				   	.duration(300)
		  			.attr("opacity", 0.5)
		  			.attr("r", 0);

		  		// change dot location by 
		  		d3.selectAll('circle.none')
		  			.transition()
				   	.duration(300)
		  			.attr("opacity", 0.5)
		  			.attr("r", 0);

		  		// change dot location by 
		  		d3.selectAll('circle.none')
		  			.transition()
				   	.duration(5)
				   	.delay(function(d, i) { return i * 5 + 10; })
		  			.attr("opacity", 0.5)
		  			.attr("r", 0);

		  		// change dot location by 
		  		d3.selectAll('circle.work')
		  			.transition()
				   	.duration(5)
				   	.delay(function(d, i) { return i * 5 + 10; })
		  			.attr("opacity", 0.5)
		  			.attr("r", 0)
		  		

		  		d3.selectAll('circle.relationship')
		  			.transition()
		  			.duration(2000)
		  			.delay(500)
		  			.attr("cx", function(d){
		  			 	return xScale(d.days_elapsed);
		  			 })
		  			.attr("opacity", 0.5)
		  			.attr("r", 5);

		  		

		  		

			    $('#chart-chapter4').animate({"opacity": 1})
	
		  	} else if (direction === 'up'){
		  		$('#chart-chapter4').animate({"opacity": 0})
		  			//change back scale
		  			xScale.domain([0,365]);


		  			d3.selectAll('circle.nyc')
		  			.transition()
		  			.duration(500)
		  			.delay(function(d, i) { return i * 10; })
		  			.attr("opacity", 0.5)
		  			.attr("cy", function(d) {
				   		return yScale(d.time_fraction);
				   	})
		  			.attr("r", 5);

		  			d3.selectAll('circle.none')
		  			.transition()
		  			.duration(500)
		  			.delay(function(d, i) { return i * 10; })
		  			.attr("opacity", 0.5)
		  			.attr("cy", function(d) {
				   		return yScale(d.time_fraction);
				   	})
		  			.attr("r", 5);

		  			d3.selectAll('circle.work')
		  			.transition()
		  			.duration(500)
		  			.delay(function(d, i) { return i * 10; })
		  			.attr("opacity", 0.5)
		  			.attr("cy", function(d) {
				   		return yScale(d.time_fraction);
				   	})
		  			.attr("r", 5);

		  			d3.selectAll('circle.relationship')
		  			.transition()
		  			.duration(2000)
		  			.delay(function(d, i) { return i * 10; })
				  	.attr("cx", function(d){
		  			 	return xScale(d.days_elapsed);
		  			 })
		  			.attr("opacity", 0.5)
		  			.attr("r", 5);

		  			d3.selectAll('.x')
		  				.transition()
		  				.duration(500)
		  				.delay(500)
		  				.attr("opacity",1);

		  			d3.selectAll('.x2')
		  				.transition()
		  				.duration(500)
		  				.attr("opacity",0);



		  	}
		}, {
		  	offset: windowHeight/2+'px'
	})

	// section 5: Healing dance party!

	$('#chart-chapter5').waypoint(function(direction) {
		  	if (direction === 'down') {
		  		$('.fa-headphones').addClass("animated bounce");
		  		// turn of the lights
		  		$('body').animate({"background-color": "#000"}, 1000)
		  		
			    $('#chart-chapter5').animate({"opacity": 1})

			    // make axes disappear
			    d3.selectAll('.axis')
			    	.transition()
			    	.duration(500)
			    	.attr("opacity", 0)
	
		  	} else if (direction === 'up'){
		  		$('#chart-chapter5').animate({"opacity": 0})
		  		$('body').animate({"background-color": "#FFF"}, 500)

		  		//turn axes back on
		  		d3.selectAll('.axis')
			    	.transition()
			    	.duration(500)
			    	.attr("opacity", 1)
		  			
		  	}
		}, {
		  	offset: windowHeight/2+'px'
	})

	// make soundcite
	// var audio = document.getElementById("audio");
    // audio.play();
	
	function danceParty(){
		// turn background dark

		// move dots down

		// make repeat dancing thing (or use https://www.bignerdranch.com/blog/music-visualization-with-d3-js/)
	}

	// section 6: jameel 

	// section 7: dancing on my own


	
		
	


	


	

});