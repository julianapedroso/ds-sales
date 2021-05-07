import Chart from "react-apexcharts";
import axios from "axios";
import { useState, useEffect }from "react";
import { BASE_URL } from "utils/requests";
import { SaleSuccess } from "types/sale";
import { round } from "utils/format";

type SeriesData = {
  name: string;
  data: number[]
}

type ChartData = {
  labels: {
    categories: string[];
  },
  series: SeriesData[]
}

const BarChart = () => {

  const [chartData, setChartData] = useState<ChartData>({
    labels: {
    categories: [],
  },
  series: [
    {
      name: "",
      data: [],
    },
  ],
});

useEffect(() => {
  showBarChart();
}, []);

const showBarChart = () => {
  axios
    .get(`${BASE_URL}/sales/success-by-seller`)
    .then((response) => {
      const data = response.data as SaleSuccess[];
      const myLabels = data.map((x) => x.sellerName);
      const mySeries = data.map((x) => round(100.0 * x.deals / x.visited, 1));

      setChartData({
        labels: {
        categories: myLabels,
      },
      series: [
        {
          name: "% de Sucesso",
          data: mySeries
        },
      ],
    });
    })
    .catch((error) => {
      console.error(error.message);
    });
};

  const options = {
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
  };

  return (
      <Chart 
        options={{ ...options, xaxis: chartData.labels}}
        series={chartData.series}
        type="bar"
        height="240"
    />
  )
};

export default BarChart;
