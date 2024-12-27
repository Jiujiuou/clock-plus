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
 * 时间以 HH:MM:SS 格式显示，每个数字位都会随时间变化而平滑滚动。
 * 
 * @example
 * ```jsx
 * <VerticalClock />
 * ```
 * 
 * @returns {JSX.Element} 返回垂直滚动时钟组件
 */
function VerticalClock() {
  // 时间状态管理
  /** @type {{ ten: number, unit: number }} 小时的十位和个位 */
  const [hour, setHour] = useState({ ten: 0, unit: 0 });
  /** @type {{ ten: number, unit: number }} 分钟的十位和个位 */
  const [minute, setMinute] = useState({ ten: 0, unit: 0 });
  /** @type {{ ten: number, unit: number }} 秒钟的十位和个位 */
  const [second, setSecond] = useState({ ten: 0, unit: 0 });

  // translateY 位移状态管理
  /** @type {{ ten: number, unit: number }} 小时数字的位移值 */
  const [hourTranslateY, setHourTranslateY] = useState({ ten: 0, unit: 0 });
  /** @type {{ ten: number, unit: number }} 分钟数字的位移值 */
  const [minuteTranslateY, setMinuteTranslateY] = useState({ ten: 0, unit: 0 });
  /** @type {{ ten: number, unit: number }} 秒钟数字的位移值 */
  const [secondTranslateY, setSecondTranslateY] = useState({ ten: 0, unit: 0 });

  /**
   * 更新时间和位移状态
   * 
   * @description
   * 获取当前时间，并更新各个数字位的显示值和对应的位移值。
   * 位移值用于实现数字的垂直滚动动画效果。
   */
  const getTime = () => {
    const now = new Date();
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();

    // 更新时间状态
    setHour(getTenAndUnit(hours));
    setMinute(getTenAndUnit(minutes));
    setSecond(getTenAndUnit(seconds));

    // 更新位移状态，实现滚动动画
    setHourTranslateY(getTranslateY(hours, NUMBER_SIZE));
    setMinuteTranslateY(getTranslateY(minutes, NUMBER_SIZE));
    setSecondTranslateY(getTranslateY(seconds, NUMBER_SIZE));
  };

  // 组件挂载时启动定时器，每秒更新时间
  useEffect(() => {
    getTime(); // 初始化时间
    const interval = setInterval(getTime, 1000);

    // 清理定时器，防止内存泄漏
    return () => {
      clearInterval(interval);
    };
  }, []);

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
