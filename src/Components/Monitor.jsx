import axios from "axios";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import WorldMap from "./Map";

import Chart from "chart.js/auto"; // Importing Chart.js for creating charts

const Dashboard = () => {
  const [countriesData, setCountriesData] = useState([]); // State for storing countries data
  const [chartData, setChartData] = useState(null); // State for storing chart data
  const [chartInstance, setChartInstance] = useState(null); // State for storing chart instance

  useEffect(() => {
    // Fetching countries data from API
    axios("https://disease.sh/v3/covid-19/countries").then((res) => {
      const data = res.data;
      setCountriesData(data);
    });
  }, []);

  useEffect(() => {
    // Fetching historical data for all countries from API
    axios
      .get("https://disease.sh/v3/covid-19/historical/all?lastdays=all")
      .then((res) => {
        const data = res.data;

        // Processing data for chart
        const newChartData = {
          labels: Object.keys(data.cases),
          datasets: [
            {
              label: "Cases",
              data: Object.values(data.cases),
              fill: false,
              borderColor: "#4CAF50",
              borderWidth: 2,
              pointRadius: 0,
              tension: 0.4,
            },
          ],
        };

        setChartData(newChartData);
      });
  }, []);

  useEffect(() => {
    // Creating and updating chart instance when chart data changes
    if (chartData) {
      if (chartInstance) {
        chartInstance.destroy();
      }
      const ctx = document.getElementById("casesChart");
      const newChartInstance = new Chart(ctx, {
        type: "line",
        data: chartData,
        options: {
          plugins: {
            title: {
              display: true,
              text: "Cases Chart",
              font: {
                size: 20,
              },
            },
            legend: {
              display: true,
              position: "bottom",
            },
          },
        },
      });
      setChartInstance(newChartInstance);
    }
  }, [chartData]);

  return (
    <div className="  w-full pt-20 px-4 pb-8">
      <div className="border-2 border-gray-100 w-11/12  m-auto 12 auto 10">
        <canvas id="casesChart"></canvas>
      </div>

      <h1 className="text-3xl font-bold mb-10 mt-10 text-gray-600 text-center">
        Cases World Map
      </h1>
      <div className="border-2 border-gray-500 w-full  m-auto -5 auto 5">
        {/* Map container */}
        <MapContainer
          className="m-auto w-full  border-gray-300"
          bounds={[
            [-60, -180],
            [85, 180],
          ]}
          zoom={2}
          center={[20, 40]}
          scrollWheelZoom={true}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <WorldMap countriesData={countriesData} />
        </MapContainer>
      </div>

      <div className="cover h-screen">
        <div className="bg-gray-800 text-white h-[1000px] w-64 mx-[-272px] my-[-1000px]">
          <ul>
            <li className="mt-8 py-4 px-6"></li>
            <li className="py-2 px-6"></li>
          </ul>
          <div className="absolute bottom-10 left-4 font-bold">Dashboard</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
