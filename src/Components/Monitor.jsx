import axios from "axios";

import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";

import { MapContainer, TileLayer } from "react-leaflet";

import WorldMap from "./Map";

const Dashboard = () => {
  const [countriesData, setCountriesData] = useState([]);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    axios("https://disease.sh/v3/covid-19/countries").then((res) => {
      const data = res.data;
      setCountriesData(data);
    });
  }, []);

  useEffect(() => {
    axios
      .get("https://disease.sh/v3/covid-19/historical/all?lastdays=all")
      .then((res) => {
        const data = res.data;

        const newChartData = {
          labels: Object.keys(data.cases),
          datasets: [
            {
              label: "Cases",
              data: Object.values(data.cases),
              fill: false,
              borderColor: "#000",

              tension: 0.2,
            },
          ],
        };

        setChartData(newChartData);
      });

    ChartJS.register(
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Title,
      Tooltip,
      Legend
    );
  }, []);

  return (
    <div className="  w-full pt-20 px-4 pb-8">
      <h1 className="text-3xl font-bold mb-10 text-gray-600 text-center">
        Cases Chart
      </h1>

      <div className="border-2 border-gray-100 w-11/12  m-auto 12 auto 10">
        {chartData.datasets ? (
          <Line data={chartData} />
        ) : (
          <h1 className="text-gray-600 text-1xl">Loading...</h1>
        )}
      </div>

      <h1 className="text-3xl font-bold mb-10 mt-10 text-gray-600 text-center">
        Cases World Map
      </h1>
      <div className="border-2 border-gray-500 w-full  m-auto -5 auto 5">
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
