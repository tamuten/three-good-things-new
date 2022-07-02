import { FC, useLayoutEffect, useState } from "react";
import { generateCalendar } from "./calendar/generateCalendar";

export const Calendar: FC = () => {
  const initialDate = (): Date => {
    const newDate = new Date();
    const year = newDate.getFullYear();
    const month = newDate.getMonth();
    return new Date(year, month, 1);
  };
  const [targetDate, setTargetDate] = useState<Date>(initialDate);
  const [calendar, setCalendar] = useState<Date[]>([]);

  const prevMonth = () => {
    const newTargetDate = new Date(targetDate);
    newTargetDate.setMonth(newTargetDate.getMonth() - 1);
    setTargetDate(newTargetDate);
  }

  const nextMonth = () => {

  }

  useLayoutEffect(() => {
    setCalendar(generateCalendar(targetDate));
  }, [targetDate]);

  const cols = [0, 1, 2, 3, 4, 5, 6];
  const rows = [0, 1, 2, 3, 4];
  return (
    <>
      <h3>ここからカレンダーです</h3>
      <button onClick={prevMonth}>prev</button>
      <button onClick={nextMonth}>next</button>
      <p>{targetDate.getFullYear() + "年" + (targetDate.getMonth() + 1) + "月"}</p>
      <ul>
        {calendar.map((cal, index) => <li key={index}>{cal.getDate()}</li>)}
      </ul>

    </>
  )

}