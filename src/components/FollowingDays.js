import React from "react";
import { motion } from "framer-motion";

const FollowingDays = ({ day, seconds }) => {
  if (seconds === 0) {
    seconds = 0.5;
  } else {
    seconds = 0.7;
  }
  return (
    <>
      <motion.div
        initial={{ x: "100vw", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: seconds, duration: 1 }}
      >
        <h3>Upcoming</h3>
        <ul className={"card"}>
          <li>{day.weekDay}</li>
          <li>{day.condition.text}</li>
          <li className={"icon"}>
            <span> {day.avgTemp}&deg;F</span>
            <sup>
              <img
                src={day.condition.icon}
                alt={`details of weather icon ${day.condition.text}`}
              />
            </sup>
          </li>
          <div className={"details"}>
            <li>Chance of snow {day.chanceOfSnow}%</li>
            <li>Chance of rain {day.chanceOfRain}%</li>
            <li>High {day.maxTemp}&deg;F</li>
            <li>Low {day.minTemp}&deg;F</li>
          </div>
        </ul>
      </motion.div>
    </>
  );
};

export default FollowingDays;
