import { useState } from "react";
import "./Calendar.css";
import Frame from "./Frame.tsx";

export default function Calendar() {
  const curDate = new Date();
  const curYear: number = curDate.getFullYear();
  const curMonth: number = curDate.getMonth() + 1;
  const [year, setYear] = useState(curYear);
  const [month, setMonth] = useState(curMonth);

  return (
    <Frame 
      left={<></>} 
      top={<CalendarTop year={year} setYear={setYear} month={month} setMonth={setMonth} />} 
      selectIdx={1}
    >
      <CalendarBody year={year} month={month} />
    </Frame>
  );
}

function CalendarTop({ year, setYear, month, setMonth }) {
  function increaseMonth() {
    if (month !== 12) {
      setMonth(month + 1);
    } else {
      setMonth(1);
      setYear(year + 1);
    }
  }

  function decreaseMonth() {
    if (month !== 1) {
      setMonth(month - 1);
    } else {
      setMonth(12);
      setYear(year - 1);
    }
  }

  return (
    <div className="calendar-header">
      <div className="calendar-caption">
        {year}/{month < 10 ? `0${month}` : month}
      </div>
      <button onClick={decreaseMonth}>
        <img src="../img/back.png" alt="back" className="back-icon" />
      </button>
      <button onClick={increaseMonth}>
        <img src="../img/forward.png" alt="forward" className="forward-icon" />
      </button>
    </div>
  );
}

function CalendarBody({ year, month }) {
  let weekArr: number[] = [0, 1, 2, 3, 4];
  let dayArr: number[] = [1, 2, 3, 4, 5, 6, 7];

  const startDayOfMonth: number = new Date(year, month - 1, 1).getDay();
  const dateNumOfMonth: number = new Date(year, month, 0).getDate();

  if (dateNumOfMonth + startDayOfMonth > 35) { //when 6 weeks in month
    weekArr.push(5);
  }

  return (
    <div className="calendar-body">

      {weekArr.map((week: number) => {
        /*calendar row*/
        return (
          <div className="calendar-tr">
            {dayArr.map((day: number, idx: number) => {
              /*calendar cell*/
              const date: number = day + 7 * week - startDayOfMonth;

              if (1 <= date && date <= dateNumOfMonth) {
                return <CalendarCell date={date} day={idx % 7} />;
              } else {
                //return empty cell
                return <div className="calendar-cell"></div>;
              }

            })}
          </div>
        );
      })}

    </div>
  );
}

function CalendarCell({ date, day }) {
  return (
    <div className="calendar-cell">
      <div className={`calendar-date ${day === 0 || day === 6 ? "calendar-date-weekend" : ""}`}>{date}</div>
      <div className="calendar-schedules">

      </div>
    </div>
  );
}
