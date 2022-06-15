import { useEffect, useState } from "react";
import { Good } from "./Good";

type TDiary = {
  date: Date;
  good: string[];
}

export const Diary = () => {
  console.log("render");
  const initialDate: Date = new Date();
  const [sysDate, setSysDate] = useState(initialDate);
  const [diary, setDiary] = useState<TDiary | null>(null);

  const prevDate = (today: Date): Date => {
    today.setDate(today.getDate() - 1);
    return today;
  }

  const nextDate = (today: Date): Date => {
    today.setDate(today.getDate() + 1);
    return today;
  }

  const handlePrevBtn = () => {
    let sysDateSlice = new Date(sysDate.getTime());
    setSysDate(prevDate(sysDateSlice));
  };

  const handleNextBtn = () => {
    let sysDateSlice = new Date(sysDate.getTime());
    setSysDate(nextDate(sysDateSlice));
  };

  useEffect(() => {
    console.log("sysDate has changed.");
    fetch('/api/diary')
      .then(response => response.text())
      .then(message => {
        const obj = JSON.parse(message);

        setDiary({
          date: obj.localDate,
          good: [obj.good1, obj.good2, obj.good3]
        });
      });
  }, [sysDate]);

  useEffect(() => {
    console.log("初期表示時にのみ呼び出されます。");
  }, []);

  return (
    <>
      <ul>
        <li>
          <button onClick={handlePrevBtn}>prev</button>
        </li>
        <li>
          <button onClick={handleNextBtn}>next</button>
        </li>
      </ul>
      <p>{sysDate.getFullYear() + "/" + (sysDate.getMonth() + 1) + "/" + sysDate.getDate()}</p>
      <Good good={diary == null ? "" : diary.good[0]} />
      <Good good={diary == null ? "" : diary.good[1]} />
      <Good good={diary == null ? "" : diary.good[2]} />
    </>
  )
};