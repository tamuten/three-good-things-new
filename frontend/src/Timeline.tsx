import { useLayoutEffect, useState } from 'react';
import type { TDiary } from './types/tDiary';
import type { DiaryObj } from './types/diaryObj';
import Spinner from 'react-bootstrap/Spinner'

export const Timeline = () => {
  const [timeline, setTimeline] = useState<TDiary[]>([]);

  useLayoutEffect(() => {
    setTimeline([
      {
        date: new Date(),
        good: ["こんにちは", "檜山沙耶です。", "お天気キャスターです。"]
      },
      {
        date: new Date(2022, 5, 29),
        good: ["こんにちは", "駒木結衣です。", "お天気キャスターです。"]
      }
    ]);
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

    console.log(mes);
    if (mes) {
      const obj: DiaryObj[] = JSON.parse(mes);
      const timeline = obj.map(o => {
        // date: o.date,
        // good: [o.good1, o.good2, o.good3]
      });
    }
  }

  return (
    <>
      {timeline.length ?
        <div>
          {timeline.map(t =>
            <>
              <p>{t.date.getFullYear() + "/" + (t.date.getMonth() + 1) + "/" + t.date.getDate()}</p>
              {t.good.map(g => <p>{g}</p>)}
            </>
          )
          }
        </div> :
        <p>投稿はありません。</p>
      }

    </>
  );
}