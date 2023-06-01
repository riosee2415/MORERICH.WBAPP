import React, { useEffect, useState } from "react";
import { Spin } from "antd";

import dynamic from "next/dynamic";
import { Wrapper } from "../commonComponents";
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

// config : {value , cnt}
// title : String
// titleAlign : left, top, right, bottom
const LineChart = ({
  configData = null,
  title = "Chart",
  titleAlign = "left",
  wholeWidth = "",
  chartWidth = 600,
  chartHeigh = 400,
  LineOrArea = "line",
  curve = "straight",
}) => {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    if (!configData) {
      return;
    } else {
      setConfig({
        series: [
          {
            name: "data",
            data: configData.map((item) => item.cnt),
          },
        ],
        options: {
          chart: {
            height: chartHeigh,
            type: "line",
            zoom: {
              enabled: false,
            },
          },
          dataLabels: {
            enabled: true,
          },
          stroke: {
            curve: curve,
          },
          title: {
            text: title,
            align: titleAlign,
          },
          grid: {
            row: {
              colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
              opacity: 0.5,
            },
          },
          xaxis: {
            categories: configData.map((item) => item.value),
          },
        },
      });
    }
  }, []);

  return (
    <Wrapper width={wholeWidth}>
      {config ? (
        <Chart
          options={config.options}
          series={config.series}
          type="area"
          width={chartWidth}
          height={chartHeigh}
        />
      ) : (
        <Wrapper>
          <Spin size="large" />
        </Wrapper>
      )}
    </Wrapper>
  );
};

export default LineChart;
