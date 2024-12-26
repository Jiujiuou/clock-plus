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

const clockList = [
  hourTensList,
  hourUnitsList,
  [],
  minuteTensList,
  minuteUnitsList,
  [],
  secondTensList,
  secondUnitsList,
];

function Header() {
  const [secondUnit, setSecondUnit] = useState(0);
  const [secondTen, setSecondTen] = useState(0);
  const [minuteUnit, setMinuteUnit] = useState(0);
  const [minuteTen, setMinuteTen] = useState(0);
  const [hourUnit, setHourUnit] = useState(0);
  const [hourTen, setHourTen] = useState(0);

  const getTime = () => {
    const now = new Date();
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();

    const secondsUnit = seconds % 10;
    const secondsTens = Math.floor(seconds / 10);
    setSecondUnit(secondsUnit);
    setSecondTen(secondsTens);

    const minuteUnit = minutes % 10;
    const minuteTen = Math.floor(minutes / 10);
    setMinuteUnit(minuteUnit);
    setMinuteTen(minuteTen);

    const hoursUnit = hours % 10;
    const hoursTen = Math.floor(hours / 10);
    setHourUnit(hoursUnit);
    setHourTen(hoursTen);
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
        {clockList.map((item, index) => {
          return (
            <div className={styles.vertical} key={index}>
              {item.map((item, index) => {
                return (
                  <div key={item} className={styles.number}>
                    {item}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Header;
