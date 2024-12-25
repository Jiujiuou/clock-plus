import styles from "./index.module.less";
import Header from "@/components/Header/Header";
import Clock from "@/components/Clock/Clock";

function App() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.content}>
        <div className={styles.preview}>
          <Clock />
        </div>
        <div className={styles.control}></div>
      </div>
    </div>
  );
}

export default App;
