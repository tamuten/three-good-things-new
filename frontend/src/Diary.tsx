import { useLayoutEffect, useState } from "react";
import { Good } from "./diary/Good";
import type { TDiary } from './types/tDiary';
import type { DiaryObj } from "./types/diaryObj";
import { formatDateHyphen } from "./dateUtil/formatDateHyphen";
import { formatDateSlashForDisplay } from "./dateUtil/formatDateSlashForDisplay";

export const Diary = () => {
  const initialDate: Date = new Date();
  const [sysDate, setSysDate] = useState<Date>(initialDate);
  const [diary, setDiary] = useState<TDiary | null>(null);

  const prevDate = (today: Date): Date => {
    today.setDate(today.getDate() - 1);
    return today;
  }

  const nextDate = (today: Date): Date => {
    today.setDate(today.getDate() + 1);
    return today;
  }

  const handlePrevBtn = (): void => {
    const sysDateSlice = new Date(sysDate.getTime());
    const prev = prevDate(sysDateSlice);
    setSysDate(prev);

    fetchDiary(prev);
  };

  const handleNextBtn = (): void => {
    const sysDateSlice = new Date(sysDate.getTime());
    const next = nextDate(sysDateSlice);
    setSysDate(next);

    fetchDiary(next);
  };

  const handleSaveBtnClick = (good: string, num: number): void => {
    const _copy = JSON.parse(JSON.stringify(diary));
    _copy.good[num] = good;
    setDiary(_copy);

    postData(_copy);
  };

  const fetchDiary = async (date: Date) => {
    const dateParam = formatDateHyphen(date);
    const mes = await fetch('/api/diary?date=' + dateParam)
      .then(
        response => response.text(),
        reason => {
          console.error(reason); // Error!
        }
      );

    if (mes) {
      const obj: DiaryObj = JSON.parse(mes);

      setDiary({
        date: obj.date,
        good: [obj.good1, obj.good2, obj.good3]
      });
    } else {
      setDiary({
        date: date,
        good: ['', '', '']
      });
    }
  }

  useLayoutEffect(() => {
    console.log("useLayoutEffect called.")
    const today = new Date();
    fetchDiary(today);
  }, []);


  const postData = async (data: TDiary) => {
    if (data == null) {
      return;
    }
    // API??????????????????Diary???DB?????????
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
        console.log("??????????????????????????????");
      }
    });
  }

  return (
    <>
      <h3>???????????????????????????</h3>
      {diary ?
        <div>
          <button onClick={handlePrevBtn}>prev</button>
          <button onClick={handleNextBtn}>next</button>
          <p>{formatDateSlashForDisplay(sysDate)}</p>
          <Good good={diary.good[0]} onSave={handleSaveBtnClick} num={0} />
          <Good good={diary.good[1]} onSave={handleSaveBtnClick} num={1} />
          <Good good={diary.good[2]} onSave={handleSaveBtnClick} num={2} />
        </div>
        :
        <></>
      }

    </>
  )
};