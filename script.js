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