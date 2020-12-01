import React from "react";
import { motion } from "framer-motion";

const CurrentDay = ({
  currentDay,
  temp,
  feelsLike,
  icon,
  iconDescription,
  chanceOfRain,
  chanceOfSnow,
}) => {
  return (
    <>
      <motion.div
        initial={{ x: "100vw", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 1 }}
      >
        <h3>Current</h3>
        <ul className={"card"}>
          <li>{currentDay}</li>
          <li>{iconDescription}</li>
          <li className={"icon"}>
            <span>{temp}&deg;F</span>
            <sup>
              <img
                src={icon}
                alt={`details of weather icon ${iconDescription}`}
              />
            </sup>
          </li>
          <div className={"details"}>
            <li>Feels Like {feelsLike}&deg;F</li>
            <li>Chance of Rain {chanceOfRain} %</li>
            <li>Chance of Snow {chanceOfSnow} % </li>
          </div>
        </ul>
      </motion.div>
    </>
  );
};

export default CurrentDay;
