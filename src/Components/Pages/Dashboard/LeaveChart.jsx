import React from "react";
import { Pie } from "react-chartjs-2";

const LeaveChart = () => {
  const data = {
    labels: ["Rejected", "Pending", "Approved"],
    datasets: [
      {
        id: 1,
        label: "",
        data: [5, 10, 8],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const legendOptions = {
    position: "bottom",
    labels: {
      font: {
        size: 10,
      },
    },
  };

  return (
    <div className="shadow-sm shadow-gray-400 p-2">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Pie
          datasetIdKey="id"
          data={data}
          options={{
            plugins: {
              legend: legendOptions,
            },
          }}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div>
          {data.labels.map((label, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  backgroundColor: data.datasets[0].backgroundColor[index],
                  marginRight: "5px",
                }}
              ></div>
              <div>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeaveChart;
