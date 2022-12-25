import React, { useEffect, useState } from "react";
import Weather from "./Components/Weather";
import Info from "./Components/Info";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { BsSearch } from "react-icons/bs";
import "./App.css";
import { useCallback } from "react";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const App = () => {
  const API_KEY = "7e55941a255e043f703f40e894f63c21";

  const [search, setSearch] = useState("");
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  const [cities, setCities] = useState({});

  const getWeather = useCallback(async () => {
    try {
      let responce = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}&units=metric`
      );
      const data = await responce.json();

      if (data.cod === "404") {
        setCities([]);
        setError(true);

        setSearch("");
        return;
      }

      const transformedData = {
        id: data.weather["0"].id,
        city: data.name,
        temperature: Math.round(data.main.temp),
        condition: data.weather["0"].main,
        icon: data.weather["0"].icon,
        country: data.sys.country,
      };

      setCities(transformedData);
    } catch (error) {
      console.log(error.msg);
    }
  }, [search]);

  useEffect(() => {
    getWeather();
  }, [getWeather]);

  const updateSearch = (e) => {
    setInput(e.target.value);
  };

  const getSearch = (e) => {
    if (input === "") {
      setError(true);
    } else {
      e.preventDefault();
      setSearch(input);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setError(false);
  };

  return (
    <div className="container-fluid App">
      <div className=" Main">
        <div className=" image">
          <Info />
        </div>

        <form action="" onSubmit={getSearch} className="getweather-form">
          <div class="input-group mb-3 mr-3">
            <input
              type="text"
              class="form-control"
              placeholder="eg. London"
              value={input}
              onChange={updateSearch}
            />
            <div class="input-group-append">
              <button type="submit" class="btn btn-outline-secondary">
                <BsSearch />
              </button>
            </div>
          </div>
        </form>
        <Weather data={cities} search={search} error={error} />
      </div>

      <Snackbar open={error} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          City Not Found!
        </Alert>
      </Snackbar>
      {/* Not Responsible note for Mobile */}

      <div class="mt-5">
        <p class="text-dark info-header">
          This Web App is not Compatible with Mobile devices
        </p>
        <p class="text-secondary info-body">
          Please use your personal computer{" "}
        </p>
        <ion-icon class="warningIcon" name="warning"></ion-icon>
      </div>

      {/* End */}
    </div>
  );
};

export default App;
