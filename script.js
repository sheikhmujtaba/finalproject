var penguinPromise = d3.csv("Data.csv")
    penguinPromise.then(
        function(data)
        {
         console.log(data)
        var years = data.map(getyear)
        console.log(years)
        var CO2emissions= data.map(getCo2)
        console.log(CO2emissions)
        var Globalmeansealevel = data.map(getGlobalmean)
        console.log(Globalmeansealevel)
        var Temperaturechange = data.map(getTemperature)
        console.log(Temperaturechange)
        },
        
        function(err)
        {
        console.log("fail", err)
        })   
var getyear = function(d)
{
    return d.Year;
}
var getCo2 = function(d)
{
    return d.CO2Emissions;
}
var getGlobalmean= function(d)
{
    return d.GlobalMeanSeaLevel;
}
var getTemperature = function(d)
{
    return d.AvgGlobalTemperature;
}
var screen = {width:700, height:600}
var margins = {top:10, bottom:50, left:25, right:50}

var setup= function(array2D)
{
    d3.select("svg")
    .attr("width",screen.width)
    .attr("height",screen.height)
    .append("g").attr("id","graph")
    .attr("transform","translate("+margins.left+ ","+ margins.top+")");
    
    
    var width= screen.width-margins.left - margins.right;
    var height= screen.height-margins.top-margins.bottom;
    
    
    var xScale= d3.scaleLinear()
        .domain([1880, 2013])
        .range([0,width])
    var yScale= d3.scaleLinear()
        .domain([0,10])
        .range([height,0])

    var cScale= d3.scaleOrdinal(d3.schemeTableau10);
    

    var xAxis=d3.axisBottom(xScale)
    var yAxis= d3.axisLeft(yScale)
    d3.select("svg")
    .append("g")
    .classed("axis",true);
    
    d3.select(".axis")
    .append("g")
    .attr("id","xAxis")
    .attr("transform","translate("+margins.left+","+(margins.top+height)+")")
    .call(xAxis)
    
    d3.select(".axis")
    .append("g")
    .attr("id","yAxis")
    .attr("transform","translate(25,"+margins.top+")")
    .call(yAxis)
    
    d3.select("#graph")
    .selectAll("circle")
    .data(array2D[0].quizes)
    .enter()
    .append("circle")
    .on("mouseover", function(d)
        {
            var label = "(Day:" + d.day + ", Grade:" + d.grade + ")";
            d3.select("#tooltip")
                .text(label)
                .style("left", (d3.event.pageX + 10) + "px")
                .style("top", (d3.event.pageY - 30) + "px")
                .classed("hidden", false);
        })
        .on("mouseout", function()
        {
            d3.select("#tooltip")
                .classed("hidden", true);
        })
    .attr("cx", function(num, index)
    {
          return xScale(index)
    })
    .attr("cy", function(num){
        console.log(num)
     return yScale(num.grade)   
    })
    .attr("r", 5)
    
    d3.select("#buttons")
    .selectAll("button")
    .data(array2D)
    .enter()
    .append("button")
    .text(function(d, i){
        return "penguin" + (i+1)
    })
    .on("click", function(d, i){
     drawArray(array2D,xScale,yScale,cScale,i)
    })
    
}

var drawArray= function(array2D, xScale, yScale, cScale, index)
{
    var arrays = d3.select("#graph")
    .selectAll("circle")
    .data(array2D[index].quizes)
    .transition()
    .duration(1500)
    .attr("cx", function(num, index)
    {
          return xScale(index)
    })
    .attr("cy", function(num){
        console.log(num)
     return yScale(num.grade)   
    })
    .attr("r", 5)
      
}
