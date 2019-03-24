/*
Pascal Vos
1422537vos
24-03-2019
*/

// ------------------------------------------------------------------------------------------------------------------------------

// Exercise 24a/b/c An apple for the thirst
var btn_Exercise_24 = document.getElementById("apple_For_The_Thirst");
btn_Exercise_24.addEventListener("click", apple_For_The_Thirst);

function apple_For_The_Thirst()
{
    //Controleren of er al een svg met cirkels bestaat, als deze bestaat eerst verwijderen
    if(d3.select("#svg2"))
    {
        d3.select("#svg2").remove()
    }
    d3.select("#content")
    .append("svg")
    .attr("id", "svg2")
    .attr("width", 600)
    .attr("height", 600)
    //Viewbox met 20px hoogte vergroot zodat xAs er onder past 
    .attr("viewBox", "0 0 600 640")
   
    var circleData = [];
    for(var i = 0; i < 20; i++)
    {   
        xValue = Math.floor(Math.random() * 100)
        yValue = Math.floor(Math.random() * 100)
        circleData.push({x: xValue,y: yValue, r: 15});   
    }

    var color = d3.scaleSequential()
    .domain([0, 100])
    .interpolator(d3.interpolateRainbow);

    var circleScale = d3.scaleLinear()
    //Wanneer de input waarde 100 is wordt deze omgezet naar de maximale waarde in de range namelijk 600
    //Input 50 wordt 300 etc etc..
    .domain([0, 100])
    .range([0, 600]);

    //Cirkel aanmaken in svg
    var svg = d3.select("#svg2");
    var circles = svg.selectAll(".body")
    .data(circleData)
    .enter().append("circle")

    //Cirkel instellingen aanmaken
    circles.attr("cx", circleData => circleScale(circleData.x))
    .attr("cy", circleData => circleScale(circleData.y))
    .attr("r", circleData => circleData.r)
    .attr("fill", function() 
    {
        return color(Math.floor(Math.random() * 100))
    })
    .on("click", function() 
    {
        d3.select(this).remove();
    });

    var xAsisNumbers = [0, 100];
    
    var xScale = d3.scaleLinear()
    .domain([0, d3.max(xAsisNumbers)])
    .range([0, 600]);

    var xAxis = d3.axisBottom()
    .scale(xScale);

    //Locatie van de xAs
    svg.append("g")
        .attr("transform", "translate(0, 620)")
        .call(xAxis)
}
