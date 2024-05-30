import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { CallbackDataParams } from "echarts/types/dist/shared.js";

const EChartComponent = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = echarts.init(chartRef.current);

    const option = {
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["Mon", "aa", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun","Mon-2"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [-820, -850, 932, -901, 934, 1290, 1330, -1320,9999],
          type: "line",
          smooth: true,
          areaStyle: {},
        },
      ],
      tooltip: {
        trigger: 'axis',
        formatter: function (params:CallbackDataParams[]) {
          let result = '';
          params.forEach(item => {
            result += `
              <div style="padding:5px;">
                <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${item.color};margin-right:5px;"></span>
                ${item.name}: ${item.data}
              </div>
            `;
          });
          return `
            <div>
              <div>嘻嘻嘻:</div>
              ${result}
            </div>
          `;
        },
        backgroundColor: 'pink',
        borderColor: '#ccc',
        borderWidth: 1,
        textStyle: {
          color: 'red',
          fontSize: 12,
        },
      },
      visualMap: [
        {
          show: false,
          precision: 1,
          seriesIndex: 0,
          pieces: [
            {
              gt: 0,
              lte: 10000,
              color: "red",
            },
          ],
          outOfRange: {
            color: "green",
          },
        },
      ],
    };
    chart.setOption(option);
    return () => {
      chart.dispose();
    };
  }, []);

  return <div ref={chartRef} style={{ width: "100%", height: "400px" }} />;
};

export default EChartComponent;
