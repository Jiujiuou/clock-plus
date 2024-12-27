import clsx from "clsx";
import styles from "./index.module.less";

/**
 * DigitRoller 组件 - 数字滚动显示器
 * 
 * @component
 * @description
 * 一个实现数字垂直滚动效果的组件。通过 CSS transform 实现平滑的数字切换动画。
 * 支持自定义数字列表，当前显示的数字，以及位移值。
 * 
 * @param {Object} props - 组件属性
 * @param {number[]} props.numbers - 可显示的数字列表，例如 [0,1,2,3,4,5,6,7,8,9]
 * @param {number} props.currentNumber - 当前需要显示的数字，对应 numbers 数组的索引
 * @param {number} props.translateY - Y轴的位移值（像素），用于控制滚动位置
 * 
 * @example
 * ```jsx
 * <DigitRoller
 *   numbers={[0,1,2,3,4,5,6,7,8,9]}
 *   currentNumber={5}
 *   translateY={-400}
 * />
 * ```
 * 
 * @returns {JSX.Element} 返回数字滚动显示器组件
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

export default DigitRoller;
