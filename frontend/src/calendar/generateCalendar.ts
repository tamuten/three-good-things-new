import { DayOfWeek } from "./DayOfWeek";

export const generateCalendar = (targetDate: Date): Date[] => {
  const calendar: Date[] = [];

  const year = targetDate.getFullYear();
  const month = targetDate.getMonth();

  targetDate = new Date(year, month, 1);

  // 今月始まり
  const startDay = targetDate.getDay();

  // 今月末日
  const thisMonthLastDay = new Date(year, month + 1, 0).getDate();
  const lastDay = new Date(year, month + 1, 0).getDay();

  // 日曜日始まりでなければ前月の日付を格納する
  if (startDay !== DayOfWeek.SUNDAY) {
  }

  // 今月の日付を格納する
  for (let d = 1; d <= thisMonthLastDay; d++) {
    calendar.push(new Date(year, month, d));
  }

  // 土曜日終わりでなければ翌月の日付を格納する
  if (lastDay !== DayOfWeek.SATURDAY) {
  }

  return calendar;
};
