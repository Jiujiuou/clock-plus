import { useEffect, useState } from "react";
import DigitRoller from "../DigitRoller";
import { NUMBER_SIZE, CLOCK_NUMBERS } from "@/constant";
import styles from "./index.module.less";
import { getTenAndUnit, getTranslateY } from "@/utils";

const { SECOND_UNITS, SECOND_TENS, MINUTE_UNITS, MINUTE_TENS, HOUR_UNITS, HOUR_TENS } = CLOCK_NUMBERS;

function VerticalClock() {
  // 时间状态
  const [hour, setHour] = useState({ ten: 0, unit: 0 });
  const [minute, setMinute] = useState({ ten: 0, unit: 0 });
  const [second, setSecond] = useState({ ten: 0, unit: 0 });

  // translateY 状态也拆分为独立状态
  const [hourTranslateY, setHourTranslateY] = useState({ ten: 0, unit: 0 });
  const [minuteTranslateY, setMinuteTranslateY] = useState({ ten: 0, unit: 0 });
  const [secondTranslateY, setSecondTranslateY] = useState({ ten: 0, unit: 0 });

  const getTime = () => {
    const now = new Date();
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();

    // 更新时间状态
    setHour(getTenAndUnit(hours));
    setMinute(getTenAndUnit(minutes));
    setSecond(getTenAndUnit(seconds));

    // 使用工具函数更新位移状态
    setHourTranslateY(getTranslateY(hours, NUMBER_SIZE));
    setMinuteTranslateY(getTranslateY(minutes, NUMBER_SIZE));
    setSecondTranslateY(getTranslateY(seconds, NUMBER_SIZE));
  };

  useEffect(() => {
    getTime();
    const interval = setInterval(getTime, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <DigitRoller
          numbers={HOUR_TENS}
          currentNumber={hour.ten}
          translateY={hourTranslateY.ten}
        />
        <DigitRoller
          numbers={HOUR_UNITS}
          currentNumber={hour.unit}
          translateY={hourTranslateY.unit}
        />
        <div className={styles.vertical}></div>
        <DigitRoller
          numbers={MINUTE_TENS}
          currentNumber={minute.ten}
          translateY={minuteTranslateY.ten}
        />
        <DigitRoller
          numbers={MINUTE_UNITS}
          currentNumber={minute.unit}
          translateY={minuteTranslateY.unit}
        />
        <div className={styles.vertical}></div>
        <DigitRoller
          numbers={SECOND_TENS}
          currentNumber={second.ten}
          translateY={secondTranslateY.ten}
        />
        <DigitRoller
          numbers={SECOND_UNITS}
          currentNumber={second.unit}
          translateY={secondTranslateY.unit}
        />
      </div>
    </div>
  );
}

export default VerticalClock;
