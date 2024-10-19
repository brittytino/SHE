import React from "react";
import Chart, { Props } from "react-apexcharts";

const state: Props["series"] = [
  {
    name: "Reported Incidents (2023)",
    data: [25, 30, 22, 45, 34, 80, 70],
  },
  {
    name: "Reported Incidents (2024)",
    data: [10, 25, 35, 20, 25, 50, 40],
  },
];

const options: Props["options"] = {
  chart: {
    type: "area",
    animations: {
      easing: "linear",
      speed: 300,
    },
    sparkline: {
      enabled: false,
    },
    brush: {
      enabled: false,
    },
    id: "basic-bar",
    foreColor: "hsl(var(--nextui-default-800))",
    stacked: true,
    toolbar: {
      show: false,
    },
  },
  xaxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    labels: {
      style: {
        colors: "hsl(var(--nextui-default-800))",
      },
    },
    axisBorder: {
      color: "hsl(var(--nextui-default-200))",
    },
    axisTicks: {
      color: "hsl(var(--nextui-default-200))",
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: "hsl(var(--nextui-default-800))",
      },
    },
    title: {
      text: "Number of Incidents",
      style: {
        color: "hsl(var(--nextui-default-800))",
      },
    },
  },
  tooltip: {
    enabled: true,
  },
  grid: {
    show: true,
    borderColor: "hsl(var(--nextui-default-200))",
    strokeDashArray: 0,
    position: "back",
  },
  stroke: {
    curve: "smooth",
    fill: {
      colors: ["#ff7c7c"], // Use a more representative color for women's safety
    },
  },
  markers: {
    size: 4,
    colors: ["#ff7c7c"],
    strokeColors: "#fff",
    strokeWidth: 2,
    hover: {
      size: 7,
    },
  },
};

export const Steam = () => {
  return (
    <div className="w-full z-20">
      <div id="chart">
        <Chart options={options} series={state} type="area" height={425} />
      </div>
    </div>
  );
};
