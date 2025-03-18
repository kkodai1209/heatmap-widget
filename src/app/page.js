"use client";

import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format, isToday, isSameMonth } from "date-fns";

const HeatmapCalendar = () => {
  const [heatmapData, setHeatmapData] = useState({});

  useEffect(() => {
    fetch("/api/fetchData")
      .then(response => response.json())
      .then(data => {
        const heatmapData = data.reduce((acc, { date, hours }) => {
          if (acc[date]) {
            acc[date] += hours; // 同じ日付のデータが来たら時間を足し合わせる
          } else {
            acc[date] = hours; // 初めての日付のデータならそのまま代入
          }
          return acc;
        }, {});
        setHeatmapData(heatmapData);
      });
  }, []);

  const getTileClass = (date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    const hours = heatmapData[dateStr] || 0;

    if (hours >= 10) return "tile-green-6";
    if (hours >= 8) return "tile-green-5";
    if (hours >= 6) return "tile-green-4";
    if (hours >= 4) return "tile-green-3";
    if (hours >= 2) return "tile-green-2";
    if (hours > 0) return "tile-green-1";
    return "tile-gray";
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-0" style={{ backgroundColor: "white" }}>
      <Calendar
        locale="en-US"
        tileClassName={({ date, view }) => {
          if (view !== "month") return "";

          const dateStr = format(date, "yyyy-MM-dd");
          let className = getTileClass(date); // 勉強時間に応じた色

          if (isToday(date)) className += " tile-today";
          if (!isSameMonth(date, new Date())) className += " tile-neighboring-month";

          return className;
        }}
        formatDay={(locale, date) => format(date, "d")}
      />
      {/* 凡例を追加 */}
      <div className="mt-4 flex flex-col items-center">
        <div className="flex space-x-2">
          <div className="w-4 h-4 tile-gray"></div>
          <span>0h</span>
        </div>
        <div className="flex space-x-2">
          <div className="w-4 h-4 tile-green-1"></div>
          <span>0-0.5h</span>
        </div>
        <div className="flex space-x-2">
          <div className="w-4 h-4 tile-green-2"></div>
          <span>0.5h-1h</span>
        </div>
        <div className="flex space-x-2">
          <div className="w-4 h-4 tile-green-3"></div>
          <span>1h-2h</span>
        </div>
        <div className="flex space-x-2">
          <div className="w-4 h-4 tile-green-4"></div>
          <span>2h-</span>
        </div>
      </div>
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
          width: 180px; /* 横幅を180pxに */
          max-width: 100%;
          background: white;
          border: none;
          font-size: 10px; /* フォントサイズはそのまま */
          padding: 0; /* パディングを0に */
          margin: 0; /* マージンを0に */
        }
        .react-calendar__month-view__weekdays {
          color: black;
          font-weight: bold;
          font-size: 10px; /* フォントサイズはそのまま */
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
          font-size: 10px; /* フォントサイズはそのまま */
          margin-bottom: 0 !important; /* マージンを0に */
          padding: 0; /* パディングを0に */
        }
        .react-calendar__navigation button {
          min-width: 24px; /* ナビゲーションボタンの幅を小さく */
          padding: 2px; /* ボタンのパディングを小さく */
        }
        .react-calendar__tile {
          padding: 2px; /* パディングを最小限に */
          border-radius: 4px; /* ボーダー半径を調整 */
          margin: 1px !important; /* マージンを0に */
          text-align: center;
          color: black;
          font-weight: bold;
          font-size: 10px; /* フォントサイズはそのまま */
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
          font-size: 12px !important; /* フォントサイズはそのまま */
          padding: 0; /* パディングを0に */
        }
        /* カレンダーの外側の余白を削除 */
        .react-calendar__viewContainer {
          padding: 0 !important;
          margin: 0 !important;
        }
        .react-calendar__month-view {
          padding: 0 !important;
          margin: 0 !important;
        }
        .react-calendar__navigation__label__labelText {
          padding: 0 !important;
          margin: 0 !important;
        }
      `}</style>
    </div>
  );
};

export default HeatmapCalendar;