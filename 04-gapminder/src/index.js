import * as d3 from 'd3'
import { count } from 'd3';
import gdp from '../data/income_per_person_gdppercapita_ppp_inflation_adjusted.csv';
import expectancy from '../data/life_expectancy_years.csv';
import population from '../data/population_total.csv';

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
        } else if (multiplier == "b") {
          return parseFloat(val) * 1000000000;
        }
    }
}

//EXERCICE 1
/*
// Convert value to number
gdp.forEach(row => {
        if (typeof row["2021"] === 'string') {
            row["2021"] = getValue(row["2021"]);
        } 
});

population.forEach(row => {
        row["2021"] = getValue(row["2021"]);
});

console.log(population);


let margin = {top: 20, right: 20, bottom: 30, left: 50},
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
    .domain([40, 100])
    .range([ height, 0]);
svg.append("g")
.call(d3.axisLeft(y));

var z = d3.scaleLinear()
    .domain([200000, 1310000000])
    .range([ 4, 60]);


svg.append('g')
.selectAll("dot")
.data(gdp)
.enter()
.append("circle")
    .attr("cx", function (d) { return x(d["2021"]); } )
    .attr("r", 10 )
    .style("fill", "#6933af")
    .style("opacity", "0.7")
    .attr("stroke", "black")

svg.selectAll("circle").data(expectancy).join()
    .attr("cy", function (d) { return y(d["2021"]); } )

svg.selectAll("circle").data(expectancy).join()
    .attr("cy", function (d) { return y(d["2021"]); } )

svg.selectAll("circle").data(population).join()
    .attr("r", function (d) { return z(d["2021"]); } )

*/

/* EXERCICE 2 */
let listCountries = []

expectancy.forEach(row => {
  let countryData = {};
  countryData[row['country']] = row['2021']
  listCountries.push(countryData)
});
console.log(listCountries);

let margin = {top: 20, right: 20, bottom: 30, left: 50},
  width = 650 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

let svg = d3.select("#graph")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom);

  // Map and projection
let path = d3.geoPath();
let projection = d3.geoMercator()
  .scale(70)
  .center([0,20])
  .translate([width / 2, height / 2]);
  
// Data and color scale
let data = new Map();
let colorScale = d3.scaleThreshold()
  .domain([50, 60, 70, 80, 90, 100])
  .range(d3.schemeGreens[7]);

  d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson").then(function(d){
      // Draw the map
      svg.append("g")
      .selectAll("path")
      .data(d.features)
      .join("path")
      // draw each country
      .attr("d", d3.geoPath()
        .projection(projection)
      )
      // set id
      .attr("id", function(d){ return d.properties.name;})
      .attr("fill", function (d) {
        let number = 0;
        listCountries.forEach(country => {
            if (typeof country[this.id] != "undefined") {
              console.log(country[this.id]);
              number = country[this.id]
            }
        })
        console.log(number);
        return colorScale(number);
      })
  })
    