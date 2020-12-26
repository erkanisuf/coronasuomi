import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";
import ShowData from "./components/ShowData/ShowData";
import CityPick from "./components/ShowData/CityPick";
import Charts from "./components/ShowData/Charts";
import Typography from "@material-ui/core/Typography";
import Flag from "react-flagkit";

function App() {
  const [corona, setCorona] = useState({});
  const [coronaloading, setcoronaLoading] = useState(false);
  const [coronadate, setcoronaDate] = useState([]);
  const [coronadateFin, setcoronaDateFin] = useState([]);
  const [fullFin, setFullFin] = useState({});
  const [fullFinLoading, setFullFinLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://api.apify.com/v2/key-value-stores/jEFt5tgCTMfjJpLD3/records/LATEST?disableRedirect=true"
      );

      const result = {
        infected: response.data.infected,
        deaths: response.data.deaths,
        tested: response.data.tested,
      };
      setCorona(result);
      setcoronaLoading(true);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://api.apify.com/v2/datasets/BDEAOLx0DzEW91s5L/items?format=json&clean=1"
      );

      setcoronaDate(response.data);
      setLoading(true);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://api.covid19api.com/total/country/finland"
      );

      setcoronaDateFin(response.data);

      setFullFin(response.data[response.data.length - 1]);
      setFullFinLoading(true);
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <Flag country="FI" size={44} />
      <Typography
        variant="h1"
        style={{ paddingBottom: "15px", fontSize: "24px" }}
      >
        Corona App - Finland{" "}
      </Typography>

      <ShowData
        infected={corona.infected}
        deaths={corona.deaths}
        tested={corona.tested}
        active={fullFin.Active}
        recovered={fullFin.Recovered}
        loading={coronaloading}
        fullFinLoading={fullFinLoading}
      />
      <Charts
        koronaDates={coronadate}
        loading={loading}
        coronadateFin={coronadateFin}
      />
      <CityPick />
    </div>
  );
}

export default App;
