import React, { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns";
import { id } from "date-fns/locale";

export default function Calender() {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    console.log("Selected Date: ", date);
  };

  const renderDays = () => {
    const days = ["MIN", "SEN", "SEL", "RAB", "KAM", "JUM", "SAB"];
    return days.map((day) => (
      <div key={day} className="text-center text-xs font-bold text-gray-600">
        {day}
      </div>
    ));
  };

  const renderDates = () => {
    const startDate = startOfWeek(startOfMonth(currentMonth), {
      weekStartsOn: 0,
    });
    const endDate = endOfMonth(currentMonth);
    const dates: Date[] = [];
    let date = startDate;

    while (isSameMonth(date, currentMonth) || date <= endDate) {
      dates.push(date);
      date = addDays(date, 1);
    }

    return dates.map((date, index) => (
      <div
        key={index}
        onClick={() => handleDateClick(date)}
        className={`p-2 text-center text-sm cursor-pointer rounded-lg ${
          isSameMonth(date, currentMonth)
            ? isSameDay(date, selectedDate ?? new Date())
              ? "bg-brand-base text-white"
              : "text-black hover:bg-brand-10"
            : "text-gray-medium "
        }`}
      >
        {format(date, "d")}
      </div>
    ));
  };

  return (
    <div className="w-full p-4 bg-white  z-50">
      <div className="flex justify-between items-center mb-4">
        <button className="text-xl text-gray-700" onClick={handlePrevMonth}>
          &laquo;
        </button>
        <span className="font-bold text-gray-900">
          {format(currentMonth, "MMMM yyyy", { locale: id })}
        </span>
        <button className="text-xl text-gray-700" onClick={handleNextMonth}>
          &raquo;
        </button>
      </div>
      <div className="grid grid-cols-7 text-center mt-10 mb-2">
        {renderDays()}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">{renderDates()}</div>
    </div>
  );
}
