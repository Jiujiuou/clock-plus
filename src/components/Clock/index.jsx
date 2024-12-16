import { useEffect, useRef, useState } from "react";
import styles from "./index.module.less";

/**
 * 时间文本配置对象
 * 包含了所有需要显示的时间文本：月份、日期、星期、小时、分钟、秒
 */
const TIME_TEXTS = {
  // 月份文本：1月到12月
  monthText: Array.from({ length: 12 }, (_, i) => `${i + 1}月`),
  // 日期文本：1号到31号
  dayText: Array.from({ length: 31 }, (_, i) => `${i + 1}号`),
  // 星期文本：星期一到星期日
  weekText: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
  // 小时文本：0点到23点
  hourText: Array.from({ length: 24 }, (_, i) => `${i}点`),
  // 分钟文本：0分到59分
  minuteText: Array.from({ length: 60 }, (_, i) => `${i}分`),
  // 秒数文本：0秒到59秒
  secondsText: Array.from({ length: 60 }, (_, i) => `${i}秒`),
};

/**
 * 时间组配置数组
 * 每个组包含对应的文本数组和位移值
 * offset 值决定了每组标签的水平位置，值越大越靠右
 */
const TIME_GROUPS = [
  { texts: TIME_TEXTS.monthText, offset: 0 },     // 月份组，最左侧
  { texts: TIME_TEXTS.dayText, offset: 80 },      // 日期组，左侧第二个
  { texts: TIME_TEXTS.weekText, offset: 160 },    // 星期组，左侧第三个
  { texts: TIME_TEXTS.hourText, offset: 240 },    // 小时组，右侧第三个
  { texts: TIME_TEXTS.minuteText, offset: 320 },  // 分钟组，右侧第二个
  { texts: TIME_TEXTS.secondsText, offset: 400 }, // 秒数组，最右侧
];

/**
 * Clock 组件
 * 实现了一个动态旋转的时钟效果，展示当前的年月日时分秒
 */
const Clock = () => {
  // 时钟容器的引用，用于操作 DOM
  const clockRef = useRef(null);
  // 存储当前时间数组
  const [timeArr, setTimeArr] = useState([]);
  // 存储所有时间标签的引用
  const [labels, setLabels] = useState([]);

  /**
   * 创建时间标签
   * @param {string} text - 标签显示的文本
   * @param {number} groupIndex - 标签所属的组索引
   * @returns {HTMLElement} 返回创建的标签元素
   */
  const createLabel = (text, groupIndex) => {
    const label = document.createElement("span");
    label.className = styles.label;
    label.innerHTML = text;
    label.dataset.group = groupIndex;
    return label;
  };

  /**
   * 获取当前时间
   * 返回一个数组，包含当前的月、日、周、时、分、秒
   * @returns {number[]} 当前时间数组
   */
  const getTime = () => {
    const date = new Date();
    return [
      date.getMonth(),           // 月份 (0-11)
      date.getDate() - 1,        // 日期 (1-31) -> (0-30)
      date.getDay(),             // 星期 (0-6)
      date.getHours(),           // 小时 (0-23)
      date.getMinutes(),         // 分钟 (0-59)
      date.getSeconds(),         // 秒数 (0-59)
    ];
  };

  /**
   * 清除所有标签的高亮样式
   */
  const clearColor = () => {
    labels.forEach((label) => {
      label.classList.remove(styles.now);
    });
  };

  /**
   * 为当前时间添加高亮颜色
   * @param {number[]} timeArr - 当前时间数组
   */
  const addColor = (timeArr) => {
    clearColor();
    TIME_GROUPS.forEach((group, groupIndex) => {
      const currentTime = timeArr[groupIndex];
      // 找到当前时间对应的标签并添加高亮样式
      const targetLabel = labels.find(
        (label) =>
          label.dataset.group === groupIndex.toString() &&
          label.innerHTML === group.texts[currentTime]
      );
      if (targetLabel) {
        targetLabel.classList.add(styles.now);
      }
    });
  };

  /**
   * 初始化标签的位置
   * 设置每个标签的初始位置和旋转中心点
   */
  const initTransition = () => {
    labels.forEach((label) => {
      if (label) {
        const groupIndex = parseInt(label.dataset.group);
        const offset = TIME_GROUPS[groupIndex].offset;
        // 设置标签的初始位置和变换原点
        label.style.transform = `translate(${offset}px, -50%)`;
        label.style.transformOrigin = `-${offset}px 50%`;
      }
    });
  };

  /**
   * 执行扇形展开动画
   * 根据当前时间计算每个标签的旋转角度
   * @param {number[]} timeArr - 当前时间数组
   */
  const rotateTransition = (timeArr) => {
    labels.forEach((label) => {
      if (label) {
        const groupIndex = parseInt(label.dataset.group);
        const group = TIME_GROUPS[groupIndex];
        const currentTime = timeArr[groupIndex];
        const labelIndex = group.texts.indexOf(label.innerHTML);
        // 计算旋转角度：(标签索引 - 当前时间) * (360° / 标签总数)
        const deg = (360 / group.texts.length) * (labelIndex - currentTime);
        const offset = group.offset;
        // 应用变换：位移 + 旋转
        label.style.transform = `translate(${offset}px, -50%) rotate(${deg}deg)`;
      }
    });
  };

  /**
   * 初始化时钟
   * 创建并添加所有时间标签
   */
  useEffect(() => {
    if (!clockRef.current) return;

    // 创建所有标签
    const allLabels = TIME_GROUPS.flatMap((group, groupIndex) =>
      group.texts.map((text) => createLabel(text, groupIndex))
    );

    // 添加标签到时钟容器
    allLabels.forEach((label) => {
      clockRef.current.appendChild(label);
    });

    setLabels(allLabels);

    // 清理函数：移除所有标签
    return () => {
      allLabels.forEach((label) => {
        label?.remove();
      });
    };
  }, []);

  /**
   * 更新时间和动画
   * 处理时间更新和动画效果
   */
  useEffect(() => {
    if (labels.length === 0) return;

    // 初始化动画
    initTransition();

    // 等待一秒后开始旋转动画
    const timer1 = setTimeout(() => {
      const initialTimeArr = getTime();
      setTimeArr(initialTimeArr);
      rotateTransition(initialTimeArr);
      addColor(initialTimeArr);
    }, 500);

    // 定时更新时间（每秒）
    const timer2 = setInterval(() => {
      const newTimeArr = getTime();
      setTimeArr(newTimeArr);
      rotateTransition(newTimeArr);
      addColor(newTimeArr);
    }, 1000);

    // 清理定时器
    return () => {
      clearTimeout(timer1);
      clearInterval(timer2);
    };
  }, [labels]);

  return <div ref={clockRef} className={styles.clock} />;
};

export default Clock;
