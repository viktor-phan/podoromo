import React from "react";
import "./App.css";
interface myProp {
  title: string;
  changeTime: any;
  type: any;
  time: number;
  formatTime: any;
}
export const Length = ({
  title,
  changeTime,
  type,
  time,
  formatTime,
}: myProp) => {
  return (
    <div>
      <h3>{title}</h3>
      <div className="time-sets">
        <button onClick={() => changeTime(-60, type)}>down</button>
        <h3>{formatTime(time)}</h3>
        <button onClick={() => changeTime(60, type)}>up</button>
      </div>
    </div>
  );
};
