import clsx from "clsx";
import PropTypes from 'prop-types';
import styles from "./index.module.less";

/**
 * DigitRoller 组件 - 用于显示垂直滚动的数字
 * @param {Array<number>} numbers - 可显示的数字列表
 * @param {number} currentNumber - 当前显示的数字
 * @param {number} translateY - Y轴偏移量
 * @returns {JSX.Element}
 */
const DigitRoller = ({ numbers, currentNumber, translateY }) => {
  return (
    <div 
      className={styles.vertical}
      style={{ transform: `translateY(${translateY}px)` }}
    >
      {numbers.map((item, index) => (
        <div
          key={item}
          className={clsx(
            styles.number,
            index === currentNumber && styles.active
          )}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

DigitRoller.propTypes = {
  numbers: PropTypes.arrayOf(PropTypes.number).isRequired,
  currentNumber: PropTypes.number.isRequired,
  translateY: PropTypes.number.isRequired,
};

export default DigitRoller;
