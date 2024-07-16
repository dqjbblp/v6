import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

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

    const svg = d3.select(svgRef.current)
      .attr('width', 100)
      .attr('height', 60);

    const margin = { top: 5, right: 0, bottom: 5, left: 0 };
    const width = +svg.attr('width') - margin.left - margin.right;
    const height = +svg.attr('height') - margin.top - margin.bottom;

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleTime()
      .domain(d3.extent(data, d => d.date) as [Date, Date])
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([d3.min(data, d => d.value) as number, d3.max(data, d => d.value) as number])
      .range([height, 0]);

    const area = d3.area<{ date: Date, value: number }>()
    .x(d => x(d.date))
    .y0(height)
    .y1(d => y(d.value))
    .curve(d3.curveCatmullRom); // 使用平滑曲线

    const line = d3.line<{ date: Date, value: number }>()
      .x(d => x(d.date))
      .y(d => y(d.value))
      .curve(d3.curveCatmullRom); // 使用平滑曲线

    g.append('path')
      .datum(data)
      .attr('fill', 'blue')
      .attr('d', area);

    g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'red')
      .attr('stroke-width', 2)
      .attr('d', line);
  }, []);

  return (
    <svg ref={svgRef}></svg>
  );
};

export default AreaChart;
