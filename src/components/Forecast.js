import React, { useState } from "react";
import FollowingDays from "./FollowingDays";
import CurrentDay from "./CurrentDay";
import axios from "axios";
import "./style/forecast.css";
import { AnimatePresence, motion } from "framer-motion";
import useSpinner from "./useSpinner";

const Forecast = () => {
  const [current, setCurrent] = useState({});
  const [forecast, setForecast] = useState([]);
  const [location, setLocation] = useState({});
  const [searchLocation, setSearchLocation] = useState("");
  const [error, setError] = useState();
  const [spinner, showSpinner, hideSpinner] = useSpinner();

  const api_key = process.env.REACT_APP_API_KEY;

  const handleInput = (e) => {
    setSearchLocation(e.target.value);
  };

  const options = { weekday: "short" };

  const handleSubmit = (e) => {
    showSpinner();
    e.preventDefault();

    const params = {
      q: searchLocation,
      key: api_key,
      days: 3,
    };

    axios
      .get("https://api.weatherapi.com/v1/forecast.json", { params })
      .then((response) => {
        const apiResponse = response.data;

        setLocation({
          city: apiResponse.location.name,
          state: apiResponse.location.region,
        });
        setCurrent({
          weekDay: new Intl.DateTimeFormat("en-US", options).format(
            new Date(apiResponse.current.last_updated)
          ),
          condition: {
            text: apiResponse.current.condition.text,
            icon: apiResponse.current.condition.icon,
          },
          feelsLike: Math.ceil(apiResponse.current.feelslike_f),
          temp: Math.ceil(apiResponse.current.temp_f),
          chanceOfRain:
            apiResponse.forecast.forecastday[0].day.daily_chance_of_rain,
          chanceOfSnow:
            apiResponse.forecast.forecastday[0].day.daily_chance_of_snow,
        });

        const filteredForecast = apiResponse.forecast.forecastday.filter(
          (day, index) => {
            if (index !== 0) {
              return day;
            }
            return false;
          }
        );

        setForecast(
          filteredForecast.map((day, index) => {
            return {
              weekDay: getWeekDay(new Date(day.date).getUTCDay()),
              condition: {
                text: day.day.condition.text,
                icon: day.day.condition.icon,
              },
              chanceOfSnow: day.day.daily_chance_of_snow,
              chanceOfRain: day.day.daily_chance_of_rain,
              avgTemp: Math.ceil(day.day.avgtemp_f),
              maxTemp: Math.ceil(day.day.maxtemp_f),
              minTemp: Math.ceil(day.day.mintemp_f),
            };
          })
        );
        setError("");
        setSearchLocation("");
      })
      .then(() => hideSpinner())
      .catch((error) => {
        setError("No Results Found");
        hideSpinner();
        console.log(error);
      });
  };

  const getWeekDay = (num) => {
    switch (num) {
      case 0:
        return "Sun";
      case 1:
        return "Mon";
      case 2:
        return "Tues";
      case 3:
        return "Wed";
      case 4:
        return "Thurs";
      case 5:
        return "Fri";
      case 6:
        return "Sat";
      default:
        return num;
    }
  };

  return (
    <div>
      <motion.h1
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        Weather or Not
      </motion.h1>
      <form onSubmit={handleSubmit}>
        <input
          type={"text"}
          name={"location"}
          placeholder={"Search Location Forecast"}
          value={searchLocation}
          onChange={handleInput}
          pattern="[a-zA-Z0-9\s]+"
          required
        />

        <input type={"submit"} value={"SEARCH"} />
        <span className={"details"}>ex. Zip Code or City or City,State</span>
      </form>

      {spinner}

      {error && !spinner ? (
        <h1>{error}</h1>
      ) : (
        current.condition &&
        !spinner && (
          <>
            <AnimatePresence>
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                exit={{ y: -1000 }}
              >
                Hello {location.city}, {location.state}
              </motion.h2>
            </AnimatePresence>
            <div id={"container"}>
              <CurrentDay
                currentDay={current.weekDay}
                temp={current.temp}
                feelsLike={current.feelsLike}
                icon={current.condition.icon}
                iconDescription={current.condition.text}
                chanceOfSnow={current.chanceOfSnow}
                chanceOfRain={current.chanceOfRain}
              />

              {forecast.map((day, index) => (
                <FollowingDays key={index} day={day} seconds={index} />
              ))}
            </div>
          </>
        )
      )}
    </div>
  );
};

export default Forecast;
