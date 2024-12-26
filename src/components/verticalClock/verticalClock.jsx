import { useEffect, useState } from "react";
import clsx from "clsx";
import DigitRoller from "../DigitRoller";

import styles from "./index.module.less";

const secondUnitsList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const secondTensList = [0, 1, 2, 3, 4, 5];
const minuteUnitsList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const minuteTensList = [0, 1, 2, 3, 4, 5];
const hourUnitsList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const hourTensList = [0, 1, 2];
const numberSize = 80;

function VerticalClock() {
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
        <DigitRoller
          numbers={hourTensList}
          currentNumber={hourTen}
          translateY={hourTenTranslateY}
        />
        <DigitRoller
          numbers={hourUnitsList}
          currentNumber={hourUnit}
          translateY={hourUnitTranslateY}
        />
        <div className={styles.vertical}></div>
        <DigitRoller
          numbers={minuteTensList}
          currentNumber={minuteTen}
          translateY={minuteTenTranslateY}
        />
        <DigitRoller
          numbers={minuteUnitsList}
          currentNumber={minuteUnit}
          translateY={minuteUnitTranslateY}
        />
        <div className={styles.vertical}></div>
        <DigitRoller
          numbers={secondTensList}
          currentNumber={secondTen}
          translateY={secondTenTranslateY}
        />
        <DigitRoller
          numbers={secondUnitsList}
          currentNumber={secondUnit}
          translateY={secondUnitTranslateY}
        />
      </div>
    </div>
  );
}

export default VerticalClock;
