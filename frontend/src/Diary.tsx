import { useEffect, useLayoutEffect, useState } from "react";
import { Good } from "./Good";

type TDiary = {
  date: Date;
  good: string[];
}

type DiaryObj = {
  date: Date;
  good1: string;
  good2: string;
  good3: string;
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

  const handleSaveBtnClick = (good: string, num: number) => {
    let _copy = JSON.parse(JSON.stringify(diary));
    _copy.good[num] = good;
    setDiary(_copy);

    postData(_copy);
  };

  useLayoutEffect(() => {
    console.log("useLayoutEffect called.")
    fetch('/api/diary')
      .then(response => response.text())
      .then(message => {
        const obj: DiaryObj = JSON.parse(message);

        setDiary({
          date: obj.date,
          good: [obj.good1, obj.good2, obj.good3]
        });
      });
  }, []);

  const fetchData = async (date: Date) => {
    fetch('/api/diary')
      .then(response => response.text())
      .then(message => {
        const obj: DiaryObj = JSON.parse(message);

        setDiary({
          date: obj.date,
          good: [obj.good1, obj.good2, obj.good3]
        });
      });
  }

  const postData = async (data: TDiary) => {
    if (data == null) {
      return;
    }
    // API通信を行い、DiaryをDBに保存
    const requestData = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        date: data.date,
        good1: data.good[0],
        good2: data.good[1],
        good3: data.good[2],
      })
    };
    fetch('/api/save', requestData).then(response => {
      if (response.ok) {
        console.log("送信に成功しました。");
      }
    });
  }

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
      <Good good={diary == null ? "" : diary.good[0]} onSave={handleSaveBtnClick} num={0} />
      <Good good={diary == null ? "" : diary.good[1]} onSave={handleSaveBtnClick} num={1} />
      <Good good={diary == null ? "" : diary.good[2]} onSave={handleSaveBtnClick} num={2} />
    </>
  )
};