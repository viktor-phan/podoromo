import { useState } from "react";
import { Length } from "./Length";

const App = () => {
  const [displayTime, setDisplayTime] = useState(25 * 60);
  const [breakTime, setBreakTime] = useState(5 * 60);
  const [sessionTime, setSessionTime] = useState(25 * 60);
  const [timerOn, setTimerOn] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);

    const seconds = time % 60;
    return (
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds)
    );
  };
  const changeTime = (amount: number, type: any) => {
    if (type == "break") {
      if (breakTime <= 60 && breakTime + amount < 60) return;
      setBreakTime((prev) => prev + amount);
    } else {
      if (sessionTime <= 60 && sessionTime + amount < 60) return;
      setSessionTime((prev) => prev + amount);
      if (!timerOn) {
        setDisplayTime(sessionTime + amount);
      }
    }
  };
  const controlTime = () => {
    const second = 1000;
    let date = new Date().getTime();
    let nextDate = new Date().getTime() + second;
    let onBreakVariable = onBreak;
    if (!timerOn) {
      let interval = setInterval(() => {
        date = new Date().getTime();
        if (date > nextDate) {
          setDisplayTime((prev) => {
            return prev - 1;
          });
          nextDate += second;
        }
      }, 30);

      localStorage.clear();
      localStorage.setItem("interval-id", interval.toString());
    }
    if (timerOn) {
      clearInterval(localStorage.getItem("interval-id") as any);
    }
    setTimerOn(!timerOn);
  };
  const resetTime = () => {
    setDisplayTime(25 * 60);
    setBreakTime(5 * 60);
    setSessionTime(25 * 60);
  };
  return (
    <div className="App">
      <h1>Pomodoro Timer</h1>
      <div className="dual-container">
        <Length
          title={"break length"}
          changeTime={changeTime}
          type={"break"}
          time={breakTime}
          formatTime={formatTime}
        />
        <Length
          title={"session length"}
          changeTime={changeTime}
          type={"session"}
          time={sessionTime}
          formatTime={formatTime}
        />
      </div>
      <h1>{formatTime(displayTime)}</h1>
      <button onClick={controlTime}>{timerOn ? "Pause" : "Play"}</button>
      <button onClick={resetTime}>Refresh</button>
    </div>
  );
};
export default App;
