import { useLayoutEffect, useState } from 'react';
import type { TDiary } from './types/tDiary';
import type { DiaryObj } from './types/diaryObj';
import { formatDateSlashForDisplay } from './dateUtil/formatDateSlashForDisplay';

export const Timeline = () => {
  const [timeline, setTimeline] = useState<TDiary[]>([]);

  useLayoutEffect(() => {
    fetchTimeline();
  }, []);

  const fetchTimeline = async () => {
    const mes = await fetch('/api/getTimeline')
      .then(
        response => response.text(),
        reason => {
          console.error(reason);
        }
      );

    if (mes) {
      const obj: DiaryObj[] = JSON.parse(mes);
      const newTimeline: TDiary[] = [];
      for (let o of obj) {
        const diary: TDiary = {
          date: new Date(o.date),
          good: [o.good1, o.good2, o.good3]
        };
        newTimeline.push(diary);
      }
      setTimeline(newTimeline);

    }
  }

  return (
    <>
      <h3>ここからタイムラインです。</h3>
      {timeline.length ?
        <div>
          {timeline.map((t, i) =>
            <div key={i}>
              <p>{formatDateSlashForDisplay(t.date)}</p>
              {t.good.map((g, j) => <p key={j}>{g}</p>)}
            </div>
          )
          }
        </div> :
        <></>
      }

    </>
  );
}