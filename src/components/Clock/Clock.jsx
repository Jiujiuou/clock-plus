import { useEffect, useState } from "react";
import styles from "./index.module.less";
import clsx from "clsx";

const secondUnitsList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const secondTensList = [0, 1, 2, 3, 4, 5];

function Header() {
  const [secondUnits, setSecondUnits] = useState(0);
  const [secondTens, setSecondTens] = useState(0);
  const [rotationSecondsUnit, setRotationSecondsUnit] = useState(0);
  const [rotationSecondsTen, setRotationSecondsTen] = useState(0);

  const getSecondsUnit = () => {
    const now = new Date();
    const seconds = now.getSeconds();
    const secondsUnit = seconds % 10;
    const secondsTens = Math.floor(seconds / 10);

    setRotationSecondsUnit(secondsUnit * 20);
    setRotationSecondsTen(secondsTens * 20);
    setSecondUnits(secondsUnit);
    setSecondTens(secondsTens);
  };

  useEffect(() => {
    const interval = setInterval(getSecondsUnit, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.timeShow}>
        {secondTens}-{secondUnits}
      </div>

      <div className={styles.circleWrapper}>
        <div
          className={styles.numberWrapper}
          style={{
            transform: `rotate(${rotationSecondsUnit}deg)`,
            transition: "transform 0.5s ease",
          }}
        >
          {secondUnitsList.map((item, index) => {
            const angle = index * 20;
            return (
              <p
                key={item}
                className={clsx(
                  styles.circleNumber,
                  index === secondUnits && styles.active
                )}
                style={{
                  transform: `
                    rotate(${-angle}deg)
                    translate(100px)
                    rotate(${angle}deg)
                  `,
                }}
              >
                <span
                  style={{
                    display: "block",
                    transform: `rotate(${-angle}deg)`,
                  }}
                >
                  {item}
                </span>
              </p>
            );
          })}
        </div>
      </div>

      <div className={styles.circleWrapper}>
        <div
          className={styles.numberWrapper}
          style={{
            transform: `rotate(${rotationSecondsTen}deg)`,
            transition: "transform 0.5s ease",
          }}
        >
          {secondTensList.map((item, index) => {
            const angle = index * 20;
            return (
              <p
                key={item}
                className={clsx(
                  styles.circleNumber,
                  index === secondTens && styles.active
                )}
                style={{
                  transform: `
                    rotate(${-angle}deg)
                    translate(100px)
                    rotate(${angle}deg)
                  `,
                }}
              >
                <span
                  style={{
                    display: "block",
                    transform: `rotate(${-angle}deg)`,
                  }}
                >
                  {item}
                </span>
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Header;
