import { useState } from "react";
import styles from "./index.module.less";
import Header from "@/components/Header/Header";
import Clock from "@/components/Clock/Clock";
import VerticalClock from "@/components/VerticalClock/VerticalClock";

function App() {
  // 控制时间显示格式的状态
  const [is24Hour, setIs24Hour] = useState(true);

  // 切换时间格式的处理函数
  const handleFormatToggle = () => {
    setIs24Hour(prev => !prev);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.preview}>
          {/* <Clock /> */}
          <VerticalClock is24Hour={is24Hour} />
        </div>
        <div className={styles.control}>
          <label className={styles.formatToggle}>
            <input
              type="checkbox"
              checked={is24Hour}
              onChange={handleFormatToggle}
            />
            <span>24小时制</span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
