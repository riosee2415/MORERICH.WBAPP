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
// horizontal : Boolean
const BarChart = ({
  configData = null,
  title = "Chart",
  titleAlign = "left",
  wholeWidth = "",
  chartWidth = 600,
  chartHeigh = 400,
  horizontal = false,
}) => {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    if (!configData) {
      return;
    } else {
      setConfig({
        series: [
          {
            name: "Data",
            data: configData.map((data) => data.cnt),
          },
        ],
        options: {
          labels: configData.map((data) => data.value),

          plotOptions: {
            bar: {
              horizontal: horizontal,
            },
          },

          dataLabels: {
            formatter: (val, opts) => {
              return `${val}`;
            },
            enabled: true,
          },
          stroke: {
            curve: "straight",
          },

          title: {
            text: title,
            align: titleAlign,
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
          type="bar"
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

export default BarChart;
