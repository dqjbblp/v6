import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const AreaChart = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const data = [
      { date: new Date(2020, 0, 1), value: 30 },
      { date: new Date(2020, 1, 1), value: 80 },
      { date: new Date(2020, 2, 1), value: 45 },
      { date: new Date(2020, 3, 1), value: 60 },
      { date: new Date(2020, 4, 1), value: 20 },
      { date: new Date(2020, 5, 1), value: 90 },
      { date: new Date(2020, 6, 1), value: -10 },
    ];

    const svg = d3.select(svgRef.current).attr("width", 100).attr("height", 60);

    const margin = { top: 5, right: 0, bottom: 5, left: 0 };
    const width = +svg.attr("width") - margin.left - margin.right;
    const height = +svg.attr("height") - margin.top - margin.bottom;

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.date) as [Date, Date])
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain([
        d3.min(data, (d) => d.value) as number,
        d3.max(data, (d) => d.value) as number,
      ])
      .nice()
      .range([height, 0]);

    const area = d3
      .area<{ date: Date; value: number }>()
      .x((d) => x(d.date))
      .y0(height)
      .y1((d) => y(d.value))
      .curve(d3.curveCatmullRom);

    const line = d3
      .line<{ date: Date; value: number }>()
      .x((d) => x(d.date))
      .y((d) => y(d.value))
      .curve(d3.curveCatmullRom);

    const gradient = g
      .append("defs")
      .append("linearGradient")
      .attr("id", "gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");

    gradient.append("stop").attr("offset", "0%").attr("stop-color", "#BC50FF");
    gradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#FF4593");

    // Clip path for area animation
    const clipPath = g
      .append("defs")
      .append("clipPath")
      .attr("id", "clip")
      .append("rect")
      .attr("width", 0)
      .attr("height", height);

    // Apply clip path to area path
    const areaPath = g
      .append("path")
      .datum(data)
      .attr("fill", "url(#gradient)")
      .attr("d", area)
      .attr("clip-path", "url(#clip)");

    const linePath = g
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", 2)
      .attr("d", line);

    // Line animation
    const totalLength = (linePath.node() as SVGPathElement).getTotalLength();
    linePath
      .attr("stroke-dasharray", totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition()
      .duration(1000)
      .ease(d3.easeLinear)
      .attr("stroke-dashoffset", 0);

    // Area animation
    clipPath
      .transition()
      .duration(1000)
      .ease(d3.easeLinear)
      .attr("width", width);
  }, []);

  return <svg ref={svgRef}></svg>;
};

export default AreaChart;
