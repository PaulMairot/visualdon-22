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

// Convert value to number
gdp.forEach(row => {
  if (typeof row["2021"] === 'string') {
      row["2021"] = getValue(row["2021"]);
  } 
});

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
/*
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
 */   


/* EXERCICE 3 */

let startYear = Object.keys(gdp[0])[0];
let endYear = Object.keys(gdp[0])[Object.keys(gdp[0]).length-2];


// Convert value to number
gdp.forEach(row => {
  for (let i = startYear; i <= endYear; i++) {
    if (typeof row[(i).toString()] === 'string') {
      row[(i).toString()] = getValue(row[(i).toString()]);
    } 
  } 
});

population.forEach(row => {
  for (let i = startYear; i <= 2100; i++) {
    if (typeof row[(i).toString()] === 'string') {
      row[(i).toString()] = getValue(row[(i).toString()]);
    } 
  }
});


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
.domain([0, 10000])
.range([ 0, width ]);
svg.append("g")
.attr("transform", "translate(0," + height + ")")
.call(d3.axisBottom(x));

// Add Y axis
let y = d3.scalePow()
.exponent(1.5)
.domain([0, 100])
.range([ height, 0]);
svg.append("g")
.call(d3.axisLeft(y));

var z = d3.scaleLinear()
.domain([200000, 1310000000])
.range([ 4, 60]);


let nIntervId;

function animate() {
  if (!nIntervId) {
		nIntervId = setInterval(play, 10);
    
	}
}

let i = startYear;

function play() {
		if(i == endYear) {
		  stop
		} else {
		  i++;
		}
 
    // Update graph
		d3.select('#year').text(i)
    
    svg.append('g')
    .selectAll("dot")
    .data(gdp)
    .enter()
    .append("circle")
    .attr("cx", function (d) { return x(d[(i)]); } )
    .attr("r", 10 )
    .style("fill", "#6933af")
    .style("opacity", "0.7")
    .attr("stroke", "black")

    svg.selectAll("circle").data(expectancy).join()
    .attr("cy", function (d) { return y(d[(i).toString()]); } )

    svg.selectAll("circle").data(population).join()
    .attr("r", function (d) { return z(d[(i).toString()]); } )
}

function stop() {
  clearInterval(nIntervId);
  nIntervId = null;
}

document.getElementById("play").addEventListener("click", animate);
document.getElementById("stop").addEventListener("click", stop);

/*
gdp.forEach(row => {
  console.log(row[2021]);
});
*/

let data = [];

for (let i = 1800; i < 2100; i++) {
  data.push(i)

  for (let j = 0; j < population.length; j++) {
    let entry = {
      country : population[j]["country"],
      pop : population[j][i]
    }
    data.push(entry);
  }
  
  //data.push(countries);
  //data.push(pop);
}

//console.log(data);

/*
function mergeArrayObjects(arr1,arr2){
  let start = 0;
  let merge = [];

  while(start < arr1.length){
    if(arr1[start]["country"] === arr2[start]["country"]){
         //pushing the merged objects into array
        merge.push({...arr1[start],...arr2[start]})
    }
    //incrementing start value
    start = start+1
  }
  return merge;
}

let merged = mergeArrayObjects(gdp, population)
console.log(merged);
console.log(population[0]["country"]);
*/