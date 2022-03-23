import * as d3 from 'd3'
import gdp from '../data/income_per_person_gdppercapita_ppp_inflation_adjusted.csv';
import expectancy from '../data/life_expectancy_years.csv';

// Pour importer les données
// import file from '../data/data.csv'

//console.log(gdp[99]['2021'].replace("k","000").replace(".",""));

function getValue (val) {
    if (typeof val === 'string' || val instanceof String) {
        let multiplier = val.substring(val.length-1).toLowerCase();
        if (multiplier == "k") {
          return parseFloat(val) * 1000;
        } else if (multiplier == "m") {
          return parseFloat(val) * 1000000;
        }
    }
  }


// Convert value to number
gdp.forEach(row => {
        if (typeof row["2021"] === 'string') {
            row["2021"] = getValue(row["2021"]);
        }
        
});


let margin = {top: 10, right: 20, bottom: 30, left: 50},
    width = 650 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

let svg = d3.select("#graph")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

let x = d3.scaleLinear()
    .domain([0, 100000])
    .range([ 0, width ]);
svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

// Add Y axis
let y = d3.scaleLinear()
    .domain([10, 90])
    .range([ height, 0]);
svg.append("g")
.call(d3.axisLeft(y));


svg.append('g')
.selectAll("dot")
.data(gdp)
.enter()
.append("circle")
    .attr("cx", function (d) { return x(d["2021"]); } )
    .attr("r", 10 )
    .style("fill", "#69b3a2")
    .style("opacity", "0.7")
    .attr("stroke", "black")

svg.selectAll("circle").data(expectancy).join()
    .attr("cy", function (d) { return y(d["2021"]); } )
