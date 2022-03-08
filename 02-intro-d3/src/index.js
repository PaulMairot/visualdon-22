import * as d3 from 'd3';

// Select body and add svg to it
var body = d3.select("body").append("svg").attr("width", 600).attr("height", 600);

// Append first circle
body.append('svg').append('circle')
  .attr('cx', 50)
  .attr('cy', 50)
  .attr('r', 40)
  .attr('fill', '#6cba61');
// Append second circle
body.append('svg').append('circle')
.attr('cx', 150)
.attr('cy', 150)
.attr('r', 40)
.attr('fill', '#7f05aa')
.attr("transform","translate(50,0)");
// Append third circle
body.append('svg').append('circle')
  .attr('cx', 250)
  .attr('cy', 250)
  .attr('r', 40)
  .attr('fill', '#d6563a')
  .attr("transform","translate(50,0)")
  .attr("id","lastCircle");

d3.selectAll('circle')
    .each(function(){
    d3.select(this.parentNode).append("text")
    .text('Circle')
    .attr("x",d3.select(this.parentNode).node().getBBox().width-60)
    .attr("y",d3.select(this.parentNode).node().getBBox().height)
})

d3.select("#lastCircle").on("click", function(){
    d3.selectAll('circle')
    .each(function(){
        d3.select(this)
        .transition()
        .attr("cx", d3.select(this.parentNode.parentNode).node().getBBox().width/2)
        .attr("transform","none");
        d3.selectAll('text')
        .transition()
        .attr("x",d3.select(this.parentNode.parentNode).node().getBBox().width/2-20);
    })
});

var body2 = d3.select("body");

var dataRect = [20, 5, 25, 8, 15];

body2.data(dataRect)
.enter()
.append('svg')
.attr("height", function(h) { return h })
.attr("width", 30)
.append("rect")
.attr("width", 20)
.attr("height", function(h) { return h })
.attr("fill", "#69b3a2");
