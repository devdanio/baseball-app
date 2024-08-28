import React, { useEffect } from "react";
import * as d3 from "d3";

function AgeChart({ players }) {
  useEffect(() => {
    d3.select("#ageChart").selectAll("*").remove();

    const ageCounts = d3.rollup(
      players,
      (v) => v.length,
      (d) => d.ageThatYear
    );
    const ageData = Array.from(ageCounts, ([age, count]) => ({
      age,
      count,
    })).sort((a, b) => a.age - b.age);

    const margin = { top: 20, right: 30, bottom: 60, left: 60 };
    const width = 600 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const svg = d3
      .select("#ageChart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleBand()
      .domain(ageData.map((d) => d.age))
      .range([0, width])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(ageData, (d) => d.count)])
      .nice()
      .range([height, 0]);

    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append("g").attr("class", "y-axis").call(d3.axisLeft(y));

    svg
      .selectAll(".bar")
      .data(ageData)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.age))
      .attr("y", (d) => y(d.count))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(d.count))
      .attr("fill", "darkblue");

    svg
      .append("text")
      .attr("class", "x-axis-label")
      .attr("x", width / 2)
      .attr("y", height + 40)
      .attr("text-anchor", "middle")
      .text("Age");

    svg
      .append("text")
      .attr("class", "y-axis-label")
      .attr("transform", "rotate(-90)")
      .attr("y", -50)
      .attr("x", -height / 2)
      .attr("text-anchor", "middle")
      .text("Number of Players");
  }, [players]);

  return <div id="ageChart"></div>;
}

export default AgeChart;
