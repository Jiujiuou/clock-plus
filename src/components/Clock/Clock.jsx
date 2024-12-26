import { useEffect, useState } from "react";
import CircleNumber from "@/components/CircleNumber/CircleNumber";
import clsx from "clsx";
import styles from "./index.module.less";

const secondUnitsList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const secondTensList = [0, 1, 2, 3, 4, 5];
const minuteUnitsList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const minuteTensList = [0, 1, 2, 3, 4, 5];
const hourUnitsList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const hourTensList = [0, 1, 2];

function Header() {
  const [secondUnit, setSecondUnit] = useState(0);
  const [secondTen, setSecondTen] = useState(0);
  const [minuteUnit, setMinuteUnit] = useState(0);
  const [minuteTen, setMinuteTen] = useState(0);
  const [hourUnit, setHourUnit] = useState(0);
  const [hourTen, setHourTen] = useState(0);

  const [rotationSecondUnit, setRotationSecondUnit] = useState(0);
  const [rotationSecondTen, setRotationSecondTen] = useState(0);
  const [rotationMinuteUnit, setRotationMinuteUnit] = useState(0);
  const [rotationMinuteTen, setRotationMinuteTen] = useState(0);
  const [rotationHourUnit, setRotationHourUnit] = useState(0);
  const [rotationHourTen, setRotationHourTen] = useState(0);

  const getTime = () => {
    const now = new Date();
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();

    const secondsUnit = seconds % 10;
    const secondsTens = Math.floor(seconds / 10);
    setSecondUnit(secondsUnit);
    setSecondTen(secondsTens);
    setRotationSecondUnit(secondsUnit * 10);
    setRotationSecondTen(secondsTens * 10);

    const minuteUnit = minutes % 10;
    const minuteTen = Math.floor(minutes / 10);
    setMinuteUnit(minuteUnit);
    setMinuteTen(minuteTen);
    setRotationMinuteUnit(minuteUnit * 10);
    setRotationMinuteTen(minuteTen * 10);

    const hoursUnit = hours % 10;
    const hoursTen = Math.floor(hours / 10);
    setHourUnit(hoursUnit);
    setHourTen(hoursTen);
    setRotationHourUnit(hoursUnit * 10);
    setRotationHourTen(hoursTen * 10);
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
        <div className={clsx(styles.box, styles.blue)}>
          <CircleNumber
            rotation={rotationHourTen}
            numberList={hourTensList}
            activeNumber={hourTen}
          />
        </div>
        <div className={clsx(styles.box, styles.green)}>
          <CircleNumber
            rotation={rotationHourUnit}
            numberList={hourUnitsList}
            activeNumber={hourUnit}
          />
        </div>
        <div className={clsx(styles.box, styles.orange)}>
          <CircleNumber
            rotation={rotationMinuteTen}
            numberList={minuteTensList}
            activeNumber={minuteTen}
          />
        </div>
        <div className={clsx(styles.box, styles.purple)}>
          <CircleNumber
            rotation={rotationMinuteUnit}
            numberList={minuteUnitsList}
            activeNumber={minuteUnit}
          />
        </div>
        <div className={clsx(styles.box, styles.red)}>
          <CircleNumber
            rotation={rotationSecondTen}
            numberList={secondTensList}
            activeNumber={secondTen}
          />
        </div>
        <div className={clsx(styles.box, styles.pink)}>
          <CircleNumber
            rotation={rotationSecondUnit}
            numberList={secondUnitsList}
            activeNumber={secondUnit}
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
