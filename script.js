var penguinPromise = d3.csv("Data.csv")
    penguinPromise.then(
        function(data)
        {
         console.log(data)
        var year = data.map(getyear)
        console.log(year)
        var CO2emissions= data.map(getCo2)
        console.log(CO2emissions)
        var Globalmeansealevel = data.map(getGlobalmean)
        console.log(Globalmeansealevel)
        var Arc = data.map(getArc)
        console.log(Arc)
        setup(data)
        setupbar(data)
d3.select("#buttons")
.append("button")
.attr("class", "button")
.attr("style", "vertical-align:middle")
.append("span")
.text("Back to home")
.on("click", function(){
    console.log("clicked")
    d3.selectAll("svg *")
        .remove()
        d3.select("#xAxis")
        .remove()
         d3.select("#yAxis")
        .remove()
setup(data)
setupbar(data)

})
           
},
        
        function(err)
        {
        console.log("fail", err)
        })   
var getyear = function(d)
{
    return parseInt(d.Year);
}
var getCo2 = function(d)
{
    return parseInt(d.PercentCO);
}
var getGlobalmean= function(d)
{
    return parseInt(d.PercentGMSL);
}
var getArc = function(d)
{
    return parseInt(d.PercentArc);
}
var screen = {width:1200, height:720}
var margins = {top:30, bottom:50, left:30, right:50}

var setup = function(myarray)
{
    var svg = d3.select("#graph1")
    .attr("width", screen.width)
    .attr("height", screen.height);
    
    svg.append("g")
    .attr("class", "graph")
    .attr("transform", "translate("+margins.left+ "," +margins.top+")");
    
    var width = screen.width - margins.left - margins.right;
    var height = screen.height - margins.top - margins.bottom;
    
    var xScale = d3.scaleLinear()
        .domain([1880, 2013])
        .range([0, width]);
    
    var yScale = d3.scaleLinear()
        .domain([-10, 220])
        .range([height, 0]);

    var cScale = d3.scaleOrdinal(d3.schemeTableau10)
    
    var xAxis = d3.axisBottom(xScale)
    var yAxis = d3.axisLeft(yScale)
    
    d3.select("#graph1")
        .append("g")
        .classed("axis", true);
    
    d3.select(".axis")
        .append("g")
        .attr("id", "xAxis")
        .attr("transform", "translate("+margins.left+","+(margins.top+height)+")")
        .call(xAxis);
    
    d3.select(".axis")
        .append("g")
        .attr("id", "yAxis")
        .attr("transform","translate(30,"+margins.top+")")
        .call(yAxis);
    
    
    drawarray(myarray, xScale, yScale, cScale)
    drawarray1(myarray, xScale, yScale, cScale)
    drawarray2(myarray, xScale, yScale, cScale)
    drawlegend(myarray)
}



var drawarray = function(myarray, xScale, yScale, cScale){
    d3.select("g")
        .append("path")
        .datum(myarray)
    .on("mouseover", function(d)
        {
        d3.select(this).attr("stroke-width", 6);
        console.log(d)
            var label = "Percentage Change in Global Mean Sea levels";
            d3.select("#tooltip")
                .text(label)
                .style("left", (d3.event.pageX + 10) + "px")
                .style("top", (d3.event.pageY - 30) + "px")
                .classed("hidden", false);
            
        })
        .on("mouseout", function()
        {
        d3.select(this).attr("stroke-width", 3);
            d3.select("#tooltip")
                .classed("hidden", true);
        })
    .on("click", function(){
        d3.select("#tooltip")
                .classed("hidden", true)
        console.log("clicked")
        d3.selectAll("svg *")
        .remove()
        d3.select("#xAxis")
        .remove()
         d3.select("#yAxis")
        .remove()
         setup2(myarray)
         })
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", 3)
    .attr("d", d3.line()
          .x(function(d){
        var years = parseFloat(d.Year)
          return xScale(years)
    })
        .y(function(d) {
        var num = parseFloat(d.PercentGMSL)
        return yScale(num);
    }))
}
var drawarray1 = function(myarray, xScale, yScale, cScale){
    d3.select("g")
        .append("path")
        .datum(myarray)
    .on("mouseover", function(d)
        {
        d3.select(this).attr("stroke-width", 6);
        console.log(d)
            var label = "Percentage Change in Arctic Ice Sheets";
            d3.select("#tooltip")
                .text(label)
                .style("left", (d3.event.pageX + 10) + "px")
                .style("top", (d3.event.pageY - 30) + "px")
                .classed("hidden", false);
            
        })
        .on("mouseout", function()
        {
        d3.select(this).attr("stroke-width", 3);
            d3.select("#tooltip")
                .classed("hidden", true);
        })
    .on("click", function(){
        d3.select("#tooltip")
                .classed("hidden", true)
        console.log("clicked")
        d3.selectAll("svg *")
        .remove()
        d3.select("#xAxis")
        .remove()
         d3.select("#yAxis")
        .remove()
         setup3(myarray)
         })
        .attr("fill", "none")
        .attr("stroke", "red")
        .attr("stroke-width", 3)
    .attr("d", d3.line()
          .defined(function(d){return parseFloat(d.PercentArc)})
          .x(function(d){
        var years1 = parseInt(d.Year)
          return xScale(years1)
    })
        .y(function(d) {
        var Arc = parseFloat(d.PercentArc)
        return yScale(Arc);
    }))
}
var drawarray2 = function(myarray, xScale, yScale, cScale){
    d3.select("g")
        .append("path")
        .datum(myarray)
    .on("mouseover", function(d)
        {
        d3.select(this).attr("stroke-width", 6);
        console.log(d)
            var label = "Percentage Change in C02 emissions";
            d3.select("#tooltip")
                .text(label)
                .style("left", (d3.event.pageX + 10) + "px")
                .style("top", (d3.event.pageY - 30) + "px")
                .classed("hidden", false);
            
        })
        .on("mouseout", function()
        {
        d3.select(this).attr("stroke-width", 3);
            d3.select("#tooltip")
                .classed("hidden", true);
        })
    .on("click", function(){
        console.log("clicked")
        d3.selectAll("svg *")
        .remove()
        d3.select("#xAxis")
        .remove()
         d3.select("#yAxis")
        .remove()
        d3.select("#tooltip")
                .classed("hidden", true);
        
        setup1(myarray)
        
        
    })
        .attr("fill", "none")
        .attr("stroke", "blue")
        .attr("stroke-width", 3)
    .attr("d", d3.line()
          .defined(function(d){return parseFloat(d.PercentCO)})
          .x(function(d){
        var years1 = parseInt(d.Year)
          return xScale(years1)
    })
        .y(function(d) {
        var Arc = parseFloat(d.PercentCO)
        return yScale(Arc);
    }))
}
var setup1 = function(myarray)
{
    var svg = d3.select("#graph1")
    .attr("width", screen.width)
    .attr("height", screen.height);
    
    svg.append("g")
    .attr("class", "graph")
    .attr("transform", "translate("+margins.left+ "," +margins.top+")");
    
    var width = screen.width - margins.left - margins.right;
    var height = screen.height - margins.top - margins.bottom;
    
    var xScale = d3.scaleLinear()
        .domain([1959, 2013])
        .range([0, width]);
    
    var yScale = d3.scaleLinear()
        .domain([1, 6])
        .range([height, 0]);

    var cScale = d3.scaleOrdinal(d3.schemeTableau10)
    
    var xAxis = d3.axisBottom(xScale)
    var yAxis = d3.axisLeft(yScale)
    
    d3.select("#graph1")
        .append("g")
        .classed("axis", true);
    
    d3.select(".axis")
        .append("g")
        .attr("id", "xAxis")
        .attr("transform", "translate("+margins.left+","+(margins.top+height)+")")
        .call(xAxis);
    
    d3.select(".axis")
        .append("g")
        .attr("id", "yAxis")
        .attr("transform","translate(30,"+margins.top+")")
        .call(yAxis);
    drawCO(myarray, xScale, yScale, cScale)
}

var drawCO = function(myarray, xScale, yScale, cScale){
    d3.select("g")
        .append("path")
        .datum(myarray)
     .on("mouseover", function(d)
        {
        d3.select(this).attr("stroke-width", 6);
        console.log(d)
            var label = "C02 emissions in metric tons per capita";
            d3.select("#tooltip")
                .text(label)
                .style("left", (d3.event.pageX + 10) + "px")
                .style("top", (d3.event.pageY - 30) + "px")
                .classed("hidden", false);
            
        })
        .on("mouseout", function()
        {
        d3.select(this).attr("stroke-width", 3);
            d3.select("#tooltip")
                .classed("hidden", true);
        })
        .attr("fill", "none")
        .attr("stroke", "blue")
        .attr("stroke-width", 3)
    .attr("d", d3.line()
          .defined(function(d){return parseFloat(d.CO2Emissions)})
          .x(function(d){
        var years = parseFloat(d.Year)
          return xScale(years)
    })
        .y(function(d) {
        var num = parseFloat(d.CO2Emissions)
        return yScale(num);
    }))
}
var setup2 = function(myarray)
{
    var svg = d3.select("#graph1")
    .attr("width", screen.width)
    .attr("height", screen.height);
    
    svg.append("g")
    .attr("class", "graph")
    .attr("transform", "translate("+margins.left+ "," +margins.top+")");
    
    var width = screen.width - margins.left - margins.right;
    var height = screen.height - margins.top - margins.bottom;
    
    var xScale = d3.scaleLinear()
        .domain([1880, 2013])
        .range([0, width]);
    
    var yScale = d3.scaleLinear()
        .domain([-200, 100])
        .range([height, 0]);

    var cScale = d3.scaleOrdinal(d3.schemeTableau10)
    
    var xAxis = d3.axisBottom(xScale)
    var yAxis = d3.axisLeft(yScale)
    
    d3.select("#graph1")
        .append("g")
        .classed("axis", true);
    
    d3.select(".axis")
        .append("g")
        .attr("id", "xAxis")
        .attr("transform", "translate("+margins.left+","+(margins.top+height)+")")
        .call(xAxis);
    
    d3.select(".axis")
        .append("g")
        .attr("id", "yAxis")
        .attr("transform","translate(30,"+margins.top+")")
        .call(yAxis);
    drawGMSL(myarray, xScale, yScale, cScale)
}


var drawGMSL = function(myarray, xScale, yScale, cScale){
   d3.select('#grah1')
    .attr("height",screen.height)
    .attr("width",screen.width)
    d3.select('g')
    .selectAll("circle")
    .data(myarray)
    .enter()
    .append("circle")
    .on("mouseover", function(d)
        {
        console.log(d)
            var label = "(Year:" + d.Year + ", GMSL in mm:" + d.GlobalMeanSeaLevel + ")";
            d3.select("#tooltip")
                .text(label)
                .style("left", (d3.event.pageX - 100) + "px")
                .style("top", (d3.event.pageY - 50) + "px")
                .classed("hidden", false);
            
        })
        .on("mouseout", function()
        {
            d3.select("#tooltip")
                .classed("hidden", true);
        })
    .attr("cx",function(d)
    {
        var years = parseFloat(d.Year)
        {return xScale(years)}
    })
    .attr("cy",function(d)
    {

        var num = parseFloat(d.GlobalMeanSeaLevel)
        {return yScale(num)}
    })
    .attr("r",5)


}

var setup3 = function(myarray)
{
    var svg = d3.select("#graph1")
    .attr("width", screen.width)
    .attr("height", screen.height);
    
    svg.append("g")
    .attr("class", "graph")
    .attr("transform", "translate("+margins.left+ "," +margins.top+")");
    
    var width = screen.width - margins.left - margins.right;
    var height = screen.height - margins.top - margins.bottom;
    
    var xScale = d3.scaleLinear()
        .domain([1979, 2012])
        .range([0, width]);
    
    var yScale = d3.scaleLinear()
        .domain([3, 8])
        .range([height, 0]);

    var cScale = d3.scaleOrdinal(d3.schemeTableau10)
    
    var xAxis = d3.axisBottom(xScale)
    var yAxis = d3.axisLeft(yScale)
    
    d3.select("#graph1")
        .append("g")
        .classed("axis", true);
    
    d3.select(".axis")
        .append("g")
        .attr("id", "xAxis")
        .attr("transform", "translate("+margins.left+","+(margins.top+height)+")")
        .call(xAxis);
    
    d3.select(".axis")
        .append("g")
        .attr("id", "yAxis")
        .attr("transform","translate(30,"+margins.top+")")
        .call(yAxis);
    drawArctic(myarray, xScale, yScale, cScale)
}
var drawArctic = function(myarray, xScale, yScale, cScale){
    d3.select("g")
        .append("path")
        .datum(myarray)
     .on("mouseover", function(d)
        {
        d3.select(this).attr("stroke-width", 6);
        console.log(d)
            var label = "Change in Arctic Ice Sheets in million square Kilometers";
            d3.select("#tooltip")
                .text(label)
                .style("left", (d3.event.pageX + 10) + "px")
                .style("top", (d3.event.pageY - 30) + "px")
                .classed("hidden", false);
            
        })
        .on("mouseout", function()
        {
        d3.select(this).attr("stroke-width", 3);
            d3.select("#tooltip")
                .classed("hidden", true);
        })
        .attr("fill", "none")
        .attr("stroke", "red")
        .attr("stroke-width", 3)
    .attr("d", d3.line()
          .defined(function(d){return parseFloat(d.ArcticseaIce)})
          .x(function(d){
        var years = parseFloat(d.Year)
          return xScale(years)
    })
        .y(function(d) {
        var num = parseFloat(d.ArcticseaIce)
        return yScale(num);
    }))
}

var drawlegend = function(myarray)
{
    d3.select("#graph1")
        .append("g")
        .append("circle")
        .attr("cx",150)
        .attr("cy",20)
        .attr("r", 7)
        .style("fill", "red")
     d3.select("#graph1")
        .append("text")
        .attr("x", 160)
        .attr("y", 20)
        .text("Change in Arctic Ice Sheets")
        .style("font-size", "13px")
        .attr("alignment-baseline","middle")
    d3.select("#graph1")
        .append("g")
        .append("circle")
        .attr("cx",340)
        .attr("cy",20)
        .attr("r", 7)
        .style("fill", "blue")
    d3.select("#graph1")
        .append("text")
        .attr("x", 350)
        .attr("y", 20)
        .text("Change in C02 emissions")
        .style("font-size", "13px")
        .attr("alignment-baseline","middle")
     d3.select("svg")
        .append("g")
        .append("circle")
        .attr("cx",500)
        .attr("cy",20)
        .attr("r", 7)
        .style("fill", "black")
    d3.select("#graph1")
        .append("text")
        .attr("x", 510)
        .attr("y", 20)
        .text("Change in Global Mean Sea Level")
        .style("font-size", "13px")
        .attr("alignment-baseline","middle")
}
var setupbar = function(myarray)
{
    var svgbro = d3.select("#graph2")
    .attr("width", screen.width)
    .attr("height", screen.height);
    
    svgbro.append("g")
    .attr("class", "graphbro")
    .attr("transform", "translate("+margins.left+ "," +margins.top+")");
    
    var width = screen.width - margins.left - margins.right;
    var height = screen.height - margins.top - margins.bottom;
    
    var xScale = d3.scaleLinear()
        .domain([1880, 2011])
        .range([0, width]);
    
    var yScale = d3.scaleLinear()
        .domain([56, 60])
        .range([height, 0]);

    var cScale = d3.scaleOrdinal(d3.schemeTableau10)
    
    var xAxis = d3.axisBottom(xScale)
    var yAxis = d3.axisLeft(yScale)
    
    d3.select("#graph2")
        .append("g")
        .classed("axis", true);
    d3.select("#graph2")
        .select(".axis")
        .append("g")
        .attr("id", "xAxis")
        .attr("transform", "translate("+margins.left+","+(margins.top+height)+")")
        .call(xAxis);
    d3.select("#graph2")
    .select(".axis")
        .append("g")
        .attr("id", "yAxis")
        .attr("transform","translate(30,"+margins.top+")")
        .call(yAxis);
    drawbars(myarray, xScale, yScale, cScale)
}

drawbars = function(myarray, xScale, yScale, cScale)
{
d3.select("#graph2")
    .selectAll("rect")
    .data(myarray)
    .enter()
    .append("g")
    .append("rect")
    .attr("fill", "aqua")
    .attr("transform", "translate(32)")
    .attr("width", "20px" )
    .attr("height", function(d)
         {
return yScale(6-d.InFahrenheit )
})
    
    .attr("x", function(d){
     var years = parseFloat(d.Year)
     return xScale(years)
})
    .attr("y", function(d){
    var num = parseFloat(d.InFahrenheit)
    return yScale(num)
    
})
}
