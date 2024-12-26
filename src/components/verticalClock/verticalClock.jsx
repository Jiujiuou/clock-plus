import { useEffect, useState } from "react";
import clsx from "clsx";

import styles from "./index.module.less";

const secondUnitsList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const secondTensList = [0, 1, 2, 3, 4, 5];
const minuteUnitsList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const minuteTensList = [0, 1, 2, 3, 4, 5];
const hourUnitsList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const hourTensList = [0, 1, 2];
const numberSize = 80;

function Header() {
  const [secondTen, setSecondTen] = useState(0);
  const [secondUnit, setSecondUnit] = useState(0);
  const [secondTenTranslateY, setSecondTenTranslateY] = useState(0);
  const [secondUnitTranslateY, setSecondUnitTranslateY] = useState(0);

  const [minuteTen, setMinuteTen] = useState(0);
  const [minuteUnit, setMinuteUnit] = useState(0);
  const [minuteTenTranslateY, setMinuteTenTranslateY] = useState(0);
  const [minuteUnitTranslateY, setMinuteUnitTranslateY] = useState(0);

  const [hourTen, setHourTen] = useState(0);
  const [hourUnit, setHourUnit] = useState(0);
  const [hourTenTranslateY, setHourTenTranslateY] = useState(0);
  const [hourUnitTranslateY, setHourUnitTranslateY] = useState(0);

  const getTime = () => {
    const now = new Date();
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();

    const secondsUnit = seconds % 10;
    const secondsTens = Math.floor(seconds / 10);
    setSecondUnit(secondsUnit);
    setSecondTen(secondsTens);
    setSecondTenTranslateY(-secondsTens * numberSize);
    setSecondUnitTranslateY(-secondsUnit * numberSize);

    const minuteUnit = minutes % 10;
    const minuteTen = Math.floor(minutes / 10);
    setMinuteUnit(minuteUnit);
    setMinuteTen(minuteTen);
    setMinuteTenTranslateY(-minuteTen * numberSize);
    setMinuteUnitTranslateY(-minuteUnit * numberSize);

    const hoursUnit = hours % 10;
    const hoursTen = Math.floor(hours / 10);
    setHourUnit(hoursUnit);
    setHourTen(hoursTen);
    setHourTenTranslateY(-hoursTen * numberSize);
    setHourUnitTranslateY(-hoursUnit * numberSize);
  };

  useEffect(() => {
    const interval = setInterval(getTime, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div
          className={styles.vertical}
          style={{ transform: `translateY(${hourTenTranslateY}px)` }}
        >
          {hourTensList.map((item, index) => {
            return (
              <div
                key={item}
                className={clsx(
                  styles.number,
                  index === hourTen && styles.active
                )}
              >
                {item}
              </div>
            );
          })}
        </div>
        <div
          className={styles.vertical}
          style={{ transform: `translateY(${hourUnitTranslateY}px)` }}
        >
          {hourUnitsList.map((item, index) => {
            return (
              <div
                key={item}
                className={clsx(
                  styles.number,
                  index === hourUnit && styles.active
                )}
              >
                {item}
              </div>
            );
          })}
        </div>
        <div className={styles.vertical}></div>
        <div
          className={styles.vertical}
          style={{ transform: `translateY(${minuteTenTranslateY}px)` }}
        >
          {minuteTensList.map((item, index) => {
            return (
              <div
                key={item}
                className={clsx(
                  styles.number,
                  index === minuteTen && styles.active
                )}
              >
                {item}
              </div>
            );
          })}
        </div>
        <div
          className={styles.vertical}
          style={{ transform: `translateY(${minuteUnitTranslateY}px)` }}
        >
          {minuteUnitsList.map((item, index) => {
            return (
              <div
                key={item}
                className={clsx(
                  styles.number,
                  index === minuteUnit && styles.active
                )}
              >
                {item}
              </div>
            );
          })}
        </div>
        <div className={styles.vertical}></div>
        <div
          className={styles.vertical}
          style={{ transform: `translateY(${secondTenTranslateY}px)` }}
        >
          {secondTensList.map((item, index) => {
            return (
              <div
                key={item}
                className={clsx(
                  styles.number,
                  index === secondTen && styles.active
                )}
              >
                {item}
              </div>
            );
          })}
        </div>
        <div
          className={styles.vertical}
          style={{ transform: `translateY(${secondUnitTranslateY}px)` }}
        >
          {secondUnitsList.map((item, index) => {
            return (
              <div
                key={item}
                className={clsx(
                  styles.number,
                  index === secondUnit && styles.active
                )}
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Header;
