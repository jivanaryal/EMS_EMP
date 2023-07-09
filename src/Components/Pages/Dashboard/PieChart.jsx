import React from "react";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
} from "chart.js/auto";

import { Pie } from "react-chartjs-2";

const PieChart = ({ employee }) => {
  const datas = employee.filter((val) => val.status === "rejected");
  const datas1 = employee.filter((val) => val.status === "approved");
  const datas2 = employee.filter((val) => val.status === "pending");

  const reject = datas.length;
  console.log(reject);
  const accept = datas1.length;
  const pending = datas2.length;
  console.log(pending);

  const data = {
    labels: ["Reject", "Accept", "Pending"],
    datasets: [
      {
        id: 1,
        label: "",
        data: [reject, accept, pending],
      },
    ],
  };
  return (
    <div className="">
      <Pie
        datasetIdKey="id"
        data={data}
        options={{
          plugins: {
            legend: {
              labels: {
                font: {
                  size: 10,
                },
              },
            },
          },
        }}
      />
    </div>
  );
};

export default PieChart;
