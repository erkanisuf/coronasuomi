import React from "react";
import { Line } from "react-chartjs-2";
import "./Charts.css";
import Grow from "@material-ui/core/Grow";

function ShowData({ koronaDates, loading, coronadateFin }) {
  return (
    <div className="ChartsContainer">
      {loading ? (
        <Grow in={loading} timeout={1000}>
          <div className="Charts">
            <Line
              className="ConfirmedGrid"
              data={{
                labels: coronadateFin.map((koron) =>
                  new Date(koron.Date).toDateString()
                ),

                datasets: [
                  {
                    data: coronadateFin.map((koron) => koron.Confirmed),
                    label: "Confirmed",
                    type: "line",

                    backgroundColor: "#f3d174",
                    fill: true,
                  },
                ],
              }}
            />
            <Line
              data={{
                labels: coronadateFin.map((koron) =>
                  new Date(koron.Date).toDateString()
                ),

                datasets: [
                  {
                    data: coronadateFin.map((koron) => koron.Active),
                    label: "Active Cases",
                    type: "line",

                    backgroundColor: "	#f07291",
                    fill: true,
                  },
                ],
              }}
            />
            <Line
              data={{
                labels: coronadateFin.map((koron) =>
                  new Date(koron.Date).toDateString()
                ),

                datasets: [
                  {
                    data: coronadateFin.map((koron) => koron.Recovered),
                    label: "Recovered",
                    type: "line",

                    backgroundColor: "	#70f5ae",
                    fill: true,
                  },
                ],
              }}
            />
            <Line
              data={{
                labels: coronadateFin.map((koron) =>
                  new Date(koron.Date).toDateString()
                ),

                datasets: [
                  {
                    data: coronadateFin.map((koron) => koron.Deaths),
                    label: "Deaths",

                    type: "line",
                    backgroundColor: "#9c1300",
                    fill: true,
                  },
                ],
              }}
            />
            <Line
              data={{
                labels: koronaDates.map((koron) =>
                  new Date(koron.lastUpdatedAtApify).toDateString()
                ),

                datasets: [
                  {
                    data: koronaDates.map((koron) => koron.tested),
                    label: "Tested",
                    type: "line",

                    backgroundColor: "#05fd79",

                    fill: true,
                  },
                ],
              }}
            />
          </div>
        </Grow>
      ) : (
        <span className="loader"></span>
      )}
    </div>
  );
}

export default ShowData;
