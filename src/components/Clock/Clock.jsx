import { useEffect, useState } from "react";
import styles from "./index.module.less";
import clsx from "clsx";

const list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function Header() {
  const [second, setSecond] = useState(0);
  const [rotation, setRotation] = useState(0);

  const getSecondsUnit = () => {
    const now = new Date();
    const seconds = now.getSeconds();
    const secondsUnit = seconds % 10;

    // 计算需要旋转的角度，使得当前数字旋转到0的位置
    const targetRotation = secondsUnit * 20;
    setRotation(targetRotation);
    setSecond(secondsUnit);
  };

  useEffect(() => {
    const interval = setInterval(getSecondsUnit, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.second}>{second}</div>
      <div className={styles.circleWrapper}>
        <div
          className={styles.numberWrapper}
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: "transform 0.5s ease",
          }}
        >
          {list.map((item, index) => {
            const angle = index * 20;
            return (
              <p
                key={item}
                className={clsx(
                  styles.circleNumber,
                  index === second && styles.active
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
                    display: 'block',
                    transform: `rotate(${-angle}deg)`
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
