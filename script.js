var penguinPromise = d3.csv("Data.csv")
    penguinPromise.then(
        function(data)
        {
         console.log(data)
        var years = data.map(getyear)
        console.log(years)
        },
        
        function(err)
        {
        console.log("fail", err)
        })   
var getyear = function(d)
{
    return d.Year;
}
var get

