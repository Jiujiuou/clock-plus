import { useEffect, useState } from "react";
import styles from "./index.module.less";
import CircleWrapper from "../CircleWrapper/CircleWrapper";

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

    setRotationSecondsUnit(secondsUnit * 10);
    setRotationSecondsTen(secondsTens * 10);
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

      <div className={styles.main}>
        <div className={styles.blue}>
          <CircleWrapper
            rotation={rotationSecondsTen}
            numberList={secondTensList}
            activeNumber={secondTens}
          />
        </div>
        <div className={styles.green}>
          <CircleWrapper
            rotation={rotationSecondsUnit}
            numberList={secondUnitsList}
            activeNumber={secondUnits}
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
