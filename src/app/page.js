"use client";

import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format, isToday, isSameMonth } from "date-fns";
import { enUS } from "date-fns/locale"; // 英語のロケールをインポート

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(null);

  // 仮の勉強データ（日付: 勉強時間）
  const studyData = {
    "2025-02-23": 7,
    "2025-02-24": 2,
    "2025-02-25": 11,
    "2025-02-26": 5,
    "2025-02-27": 5,
    "2025-02-28": 9,
    "2025-03-01": 11,
    "2025-03-02": 7,
    "2025-03-03": 5,
    "2025-03-04": 7,
    "2025-03-05": 9,
    "2025-03-06": 7,
    "2025-03-07": 3,
    "2025-03-08": 5,
    "2025-03-09": 9,
    "2025-03-10": 3,
    "2025-03-11": 11,
    "2025-03-12": 9,
  };

  // 勉強時間に応じたクラスを決定
  const getTileClass = (date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    const hours = studyData[dateStr] || 0;

    if (hours >= 10) return "tile-green-6";
    if (hours >= 8) return "tile-green-5";
    if (hours >= 6) return "tile-green-4";
    if (hours >= 4) return "tile-green-3";
    if (hours >= 2) return "tile-green-2";
    if (hours > 0) return "tile-green-1";
    return "tile-gray";
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-0" style={{ backgroundColor: "white" }}> {/* p-4をp-0に変更 */}
      <Calendar
        locale="en-US"
        onClickDay={(date) => setSelectedDate(format(date, "yyyy-MM-dd"))}
        tileClassName={({ date, view }) => {
          if (view !== "month") return "";

          const dateStr = format(date, "yyyy-MM-dd");
          let className = getTileClass(date); // 勉強時間に応じた色

          if (selectedDate === dateStr) className += " tile-selected";
          if (isToday(date)) className += " tile-today";
          if (!isSameMonth(date, new Date())) className += " tile-neighboring-month";

          return className;
        }}
        formatDay={(locale, date) => format(date, "d")}
      />
      <style>{`
        .tile-gray { 
          background-color: #9ca3af !important; /* 灰色（デフォルト） */
        }
        .tile-green-1 { background-color: #d1fae5 !important; }
        .tile-green-2 { background-color: #a7f3d0 !important; }
        .tile-green-3 { background-color: #6ee7b7 !important; }
        .tile-green-4 { background-color: #34d399 !important; }
        .tile-green-5 { background-color: #10b981 !important; }
        .tile-green-6 { background-color: #059669 !important; }

        .tile-today { 
          border: 3px solid #facc15 !important; /* 今日の日付を黄色枠 */
        }
        .tile-neighboring-month {
          color: #777 !important; /* 表示月ではない日付の文字色を薄くする */
        }

        .react-calendar {
          width: 225px; /* 幅を半分に */
          max-width: 100%;
          background: white;
          border: none;
          font-size: 10px; /* フォントサイズを少し大きく */
          padding: 0; /* パディングを0に */
          margin: 0; /* マージンを0に */
        }
        .react-calendar__month-view__weekdays {
          color: black;
          font-weight: bold;
          font-size: 10px; /* フォントサイズを少し大きく */
          margin-top: 0 !important; /* マージンを0に */
          padding: 0; /* パディングを0に */
        }
        .react-calendar__month-view__weekdays__weekday {
          color: #666 !important;
          padding: 0; /* パディングを0に */
        }
        .react-calendar__navigation {
          color: black;
          font-weight: bold;
          font-size: 10px; /* フォントサイズを少し大きく */
          margin-bottom: 0 !important; /* マージンを0に */
          padding: 0; /* パディングを0に */
        }
        .react-calendar__tile {
          padding: 2px; /* パディングを最小限に */
          border-radius: 4px; /* ボーダー半径を調整 */
          margin: 2px !important; /* マージンを0に */
          text-align: center;
          color: black;
          font-weight: bold;
          font-size: 10px; /* フォントサイズを少し大きく */
          display: flex;
          align-items: center;
          justify-content: center;
          aspect-ratio: 1 / 1;
        }
        .react-calendar__month-view__days {
          display: grid !important;
          grid-template-columns: repeat(7, 1fr) !important;
          gap: 0; /* グリッド間の隙間を0に */
        }
        .react-calendar__navigation__label {
          font-size: 12px !important; /* フォントサイズを少し大きく */
          padding: 0; /* パディングを0に */
        }
      `}</style>
    </div>
  );
}