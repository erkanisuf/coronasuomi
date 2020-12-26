import { useState, useEffect } from "react";
import "./CityPick.css";
import React from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import MapInfo from "./MapInfo";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Grow from "@material-ui/core/Grow";

function CityPick() {
  const [cities, setCities] = useState([{}]);
  const [formap, setforMap] = useState([{}]);
  const [selectvalue, setSelectvalue] = useState([{}]);
  const [loadingz, setLoadingz] = useState(false);
  const [trueClass, settrueClass] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://w3qa5ydb4l.execute-api.eu-west-1.amazonaws.com/prod/hcdTestData"
      );

      const items = [];
      for (const key in response.data) {
        items.push({
          name: key,
          tested: response.data[key].tested,
          population: response.data[key].population,
          infected: response.data[key].infected,
        });
      }

      setCities(items);
    };
    fetchData();
  }, []);

  const [chart, setChart] = useState();
  const [selectchart, setSelectchart] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://w3qa5ydb4l.execute-api.eu-west-1.amazonaws.com/prod/processedThlData"
      );
      const items = [];
      for (const key in response.data.confirmed) {
        items.push({ name: key, data: response.data.confirmed[key] });
      }

      setChart(items);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://raw.githubusercontent.com/TeemuKoivisto/map-of-finland/master/src/maakuntarajat-2018.json"
      );
      const item = response.data.features;
      item[0].properties.extra = cities[15];
      item[0].properties.cords = {
        markerOffset: -1,
        name: "Keski-Pohjanmaa",
        coordinates: [24.0014, 63.5622],
      };

      item[1].properties.extra = cities[12];
      item[1].properties.cords = {
        markerOffset: -1,
        name: "Keski-Suomi",
        coordinates: [62.5667, 25.5549],
      };
      item[2].properties.extra = cities[13];
      item[2].properties.cords = {
        markerOffset: -1,
        name: "Etelä-Pohjanmaa",
        coordinates: [23.5285, 62.9433],
      };
      item[3].properties.extra = cities[16];
      item[3].properties.cords = {
        markerOffset: -1,
        name: "Pohjois-Pohjanmaa",
        coordinates: [26.289, 65.2795],
      };
      item[4].properties.extra = cities[4];
      item[4].properties.cords = {
        markerOffset: -1,
        name: "Pirkanmaa",
        coordinates: [23.7896, 61.6987],
      };
      item[5].properties.extra = cities[3];
      item[5].properties.cords = {
        markerOffset: -1,
        name: "Kanta-Häme",
        coordinates: [24.3005, 60.907],
      };
      item[6].properties.extra = cities[5];
      item[6].properties.cords = {
        markerOffset: -1,
        name: "Päijät-Häme",
        coordinates: [25.7322, 61.323],
      };
      item[7].properties.extra = cities[20];
      item[7].properties.cords = {
        markerOffset: -1,
        name: "Uusimaa",
        coordinates: [25.2716, 60.2187],
      };
      item[8].properties.extra = cities[1];
      item[8].properties.cords = {
        markerOffset: -1,
        name: "Varsinais-Suomi",
        coordinates: [22.4439, 60.3628],
      };
      item[9].properties.extra = cities[0];
      item[9].properties.cords = {
        markerOffset: -1,
        name: "Ahvenanmaa",
        coordinates: [19.9156, 60.1785],
      };
      item[10].properties.extra = cities[11];
      item[10].properties.cords = {
        markerOffset: -1,
        name: "Pohjois-Savo",
        coordinates: [27.0254, 63.0845],
      };
      item[11].properties.extra = cities[8];
      item[11].properties.cords = {
        markerOffset: -1,
        name: "Etelä-Savo",
        coordinates: [27.8005, 61.6945],
      };
      item[12].properties.extra = cities[19];
      item[12].properties.cords = {
        markerOffset: -1,
        name: "Lappi",
        coordinates: [26.5046, 67.9222],
      };
      item[13].properties.extra = cities[2];
      item[13].properties.cords = {
        markerOffset: -1,
        name: "Satakunta",
        coordinates: [22.1483, 61.5933],
      };
      item[14].properties.extra = cities[12];
      item[14].properties.cords = {
        markerOffset: -1,
        name: "Pohjanmaa",
        coordinates: [21.9061, 63.1182],
      };
      // item[14].properties.extra = cities[16];

      item[15].properties.extra = cities[7];
      item[15].properties.cords = {
        markerOffset: -1,
        name: "Etelä-Karjala",
        coordinates: [28.1024, 61.1182],
      };
      item[16].properties.extra = cities[6];
      item[16].properties.cords = {
        markerOffset: -1,
        name: "Kymenlaakso",
        coordinates: [26.8829, 60.7805],
      };
      item[17].properties.extra = cities[10];
      item[17].properties.cords = {
        markerOffset: -1,
        name: "Pohjois-Karjala",
        coordinates: [30.1554, 62.8062],
      };
      item[18].properties.extra = cities[17];
      item[18].properties.cords = {
        markerOffset: -1,
        name: "Kainuu",
        coordinates: [28.7437, 64.3737],
      };
      setforMap(item);
      setTimeout(() => setLoadingz(true), 3000);
    };

    fetchData();
  }, [cities]);

  const scroller = () => {
    window.scrollTo(0, 2200);
  };
  return (
    <div className={trueClass ? "CityPick" : "CityPickOpen"}>
      {loadingz ? (
        <Grow in={loadingz} timeout={1000}>
          <div className="CityPick2">
            <select
              id="lang"
              defaultValue={"DEFAULT"}
              onChange={(e) => {
                scroller();
                const items = {
                  name: cities[e.target.value].name,
                  infected: cities[e.target.value].infected,
                  tested: cities[e.target.value].tested,
                  population: cities[e.target.value].population,
                };

                setSelectvalue(items);
                settrueClass(true);
                const charts = [
                  {
                    name: chart[e.target.value].name,
                    data: chart[e.target.value].data,
                  },
                ];
                setSelectchart(charts);
              }}
            >
              <option value="DEFAULT" disabled>
                Select City
              </option>
              {cities.map((key, index) => {
                return (
                  <option key={index} value={index}>
                    {key.name}
                  </option>
                );
              })}
            </select>
            <MapInfo formap={formap} loading={loadingz} />
          </div>
        </Grow>
      ) : (
        <span className="loadertext"></span>
      )}

      {selectvalue &&
        selectchart.map((key, index) => {
          return (
            <div key={index}>
              <Grid container className="ShowData" justify="center" spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h5" component="h2">
                    {selectvalue.name}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Card className="Infected">
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom>
                        Infected
                      </Typography>
                      <Typography variant="h5" component="h2">
                        {selectvalue.infected}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <Card className="Population">
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom>
                        Population
                      </Typography>
                      <Typography variant="h5" component="h2">
                        {selectvalue.population}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <Card className="Tested">
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom>
                        Tested
                      </Typography>
                      <Typography variant="h5" component="h2">
                        {selectvalue.tested}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              <Typography variant="h5">{key.name},Cases graph</Typography>

              <Line
                data={{
                  labels: key.data.map((koron) =>
                    new Date(koron.date).toDateString()
                  ),
                  datasets: [
                    {
                      data: key.data.map((koron) => koron.value),
                      label: "Cases",
                      type: "bar",

                      backgroundColor: "		#f07291",

                      aspectRatioL: 2,
                    },
                  ],
                }}
              />
            </div>
          );
        })}
    </div>
  );
}

export default CityPick;
