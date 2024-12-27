import { useEffect, useState } from "react";
import DigitRoller from "../DigitRoller/DigitRoller";
import { NUMBER_SIZE, CLOCK_NUMBERS } from "@/constant";
import styles from "./index.module.less";
import { getTenAndUnit, getTranslateY } from "@/utils";

const {
  SECOND_UNITS,
  SECOND_TENS,
  MINUTE_UNITS,
  MINUTE_TENS,
  HOUR_UNITS,
  HOUR_TENS,
} = CLOCK_NUMBERS;

/**
 * VerticalClock 组件 - 垂直滚动时钟显示
 *
 * @component
 * @description
 * 一个优雅的垂直滚动时钟组件，以数字滚动的方式显示当前时间。
 * 支持12小时制和24小时制的切换显示。
 *
 * @param {Object} props
 * @param {boolean} [props.is24Hour=true] - 是否使用24小时制显示时间
 */
function VerticalClock({ is24Hour = true }) {
  const [hour, setHour] = useState({ ten: 0, unit: 0 });
  const [minute, setMinute] = useState({ ten: 0, unit: 0 });
  const [second, setSecond] = useState({ ten: 0, unit: 0 });

  const [hourTranslateY, setHourTranslateY] = useState({ ten: 0, unit: 0 });
  const [minuteTranslateY, setMinuteTranslateY] = useState({ ten: 0, unit: 0 });
  const [secondTranslateY, setSecondTranslateY] = useState({ ten: 0, unit: 0 });

  /**
   * 更新时间和位移状态
   *
   * @description
   * 获取当前时间，并根据选择的时间格式（12/24小时制）更新显示。
   * 同时更新各个数字位的显示值和对应的位移值。
   */
  const getTime = () => {
    const now = new Date();
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    let hours = now.getHours();

    // 处理12小时制的显示
    if (!is24Hour) {
      hours = hours % 12;
      hours = hours === 0 ? 12 : hours; // 将 0 点显示为12点
    }

    // 更新时间状态
    setHour(getTenAndUnit(hours));
    setMinute(getTenAndUnit(minutes));
    setSecond(getTenAndUnit(seconds));

    // 更新位移状态，实现滚动动画
    setHourTranslateY(getTranslateY(hours, NUMBER_SIZE));
    setMinuteTranslateY(getTranslateY(minutes, NUMBER_SIZE));
    setSecondTranslateY(getTranslateY(seconds, NUMBER_SIZE));
  };

  // 组件挂载和 is24Hour 变化时更新时间
  useEffect(() => {
    getTime(); // 立即更新一次
    const interval = setInterval(getTime, 1000);
    return () => clearInterval(interval);
  }, [is24Hour]); // 依赖项添加 is24Hour，确保格式切换时立即更新

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        {/* 小时部分 */}
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
        {/* 分钟部分 */}
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
        {/* 秒钟部分 */}
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
