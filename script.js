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
    var svg = d3.select("svg")
    .attr("width", screen.width)
    .attr("height", screen.height);
    
    svg.append("g")
    .attr("id", "graph")
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
    
    d3.select("svg")
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
}



var drawarray = function(myarray, xScale, yScale, cScale){
    d3.select("#graph")
        .append("path")
        .datum(myarray)
    .on("click", function(){
        console.log("clicked")
        d3.select("svg *")
        .remove()
        d3.select("#xAxis")
        .remove()
         d3.select("#yAxis")
        .remove()
         setup2(myarray)
         })
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", 1.5)
    .attr("d", d3.line()
          .x(function(d){
        var years = parseInt(d.Year)
          return xScale(years)
    })
        .y(function(d) {
        var num = parseInt(d.PercentGMSL)
        return yScale(num);
    }))
}
var drawarray1 = function(myarray, xScale, yScale, cScale){
    d3.select("#graph")
        .append("path")
        .datum(myarray)
    .on("click", function(){
        console.log("clicked")
    })
        .attr("fill", "none")
        .attr("stroke", "red")
        .attr("stroke-width", 1.5)
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
    d3.select("#graph")
        .append("path")
        .datum(myarray)
    .on("click", function(){
        console.log("clicked")
        d3.select("svg *")
        .remove()
        d3.select("#xAxis")
        .remove()
         d3.select("#yAxisfg")
        .remove()
        
        
        setup1(myarray)
        
        
    })
        .attr("fill", "none")
        .attr("stroke", "blue")
        .attr("stroke-width", 1.5)
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
    var svg = d3.select("svg")
    .attr("width", screen.width)
    .attr("height", screen.height);
    
    svg.append("g")
    .attr("id", "graph")
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
    
    d3.select("svg")
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
    d3.select("#graph")
        .append("path")
        .datum(myarray)
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", 1.5)
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
    var svg = d3.select("svg")
    .attr("width", screen.width)
    .attr("height", screen.height);
    
    svg.append("g")
    .attr("id", "graph")
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
    
    d3.select("svg")
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
    d3.select("#graph")
        .append("path")
        .datum(myarray)
        .attr("fill", "none")
        .attr("stroke", "red")
        .attr("stroke-width", 1.5)
    .attr("d", d3.line()
          .defined(function(d){return parseFloat(d.GlobalMeanSeaLevel)})
          .x(function(d){
        var years = parseFloat(d.Year)
          return xScale(years)
    })
        .y(function(d) {
        var num = parseFloat(d.GlobalMeanSeaLevel)
        return yScale(num);
    }))
}
