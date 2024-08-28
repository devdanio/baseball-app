import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const PieChart = ({ players }) => {
  const svgRef = useRef();

  useEffect(() => {
    const uniquePlayers = Array.from(
      new Set(players.map((player) => player.bats))
    );
    const data = uniquePlayers.map((bat) => ({
      label:
        bat === "L"
          ? "Lefty"
          : bat === "R"
          ? "Righty"
          : bat === "B"
          ? "Switch"
          : bat,
      value: players.filter((player) => player.bats === bat).length,
    }));

    const width = 200;
    const height = 200;
    const radius = Math.min(width, height) / 2;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const color = d3.scaleOrdinal(d3.schemeCategory10);
    const pie = d3.pie().value((d) => d.value);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    const arcs = svg
      .selectAll(".arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "arc");

    arcs
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => color(d.data.label));

    arcs
      .append("text")
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .attr("dy", ".35em")
      .text((d) => d.data.label);
  }, [players]);

  return <svg ref={svgRef}></svg>;
};

export default PieChart;
