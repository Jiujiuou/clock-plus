import styles from "./index.module.less";
import clsx from "clsx";

/**
 * CircleWrapper 组件 - 用于显示时钟的圆形数字显示部分
 * @param {Object} props
 * @param {number} props.rotation - 旋转角度
 * @param {Array} props.numberList - 要显示的数字列表
 * @param {number} props.activeNumber - 当前激活的数字
 */
function CircleWrapper({ rotation, numberList, activeNumber }) {
  return (
    <div className={styles.circleWrapper}>
      <div
        className={styles.numberWrapper}
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: "transform 0.5s ease",
        }}
      >
        {numberList.map((item, index) => {
          const angle = index * 10;
          return (
            <p
              key={item}
              className={clsx(
                styles.circleNumber,
                index === activeNumber && styles.active
              )}
              style={{
                transform: `
                  rotate(${-angle}deg)
                  translate(200px)
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
  );
}

export default CircleWrapper;
