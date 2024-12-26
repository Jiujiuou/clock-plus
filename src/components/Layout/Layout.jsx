import styles from "./index.module.less";
import Header from "@/components/Header/Header";
import Clock from "@/components/Clock/Clock";
import VerticalClock from "@/components/verticalClock/verticalClock";

function App() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.content}>
        <div className={styles.preview}>
          {/* <Clock /> */}
          <VerticalClock />
        </div>
        <div className={styles.control}></div>
      </div>
    </div>
  );
}

export default App;
