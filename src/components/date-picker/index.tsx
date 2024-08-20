"use client";
import { useState, useEffect } from "react";
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
  getDay,
} from "date-fns";
import { id } from "date-fns/locale";
import { FaCalendarAlt } from "react-icons/fa";

interface DatePickerProps {
  title: string;
  name: string;
}

const DatePicker: React.FC<DatePickerProps> = ({ title, name }) => {
  const [showDatepicker, setShowDatepicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  const toggleDatepicker = () => {
    setShowDatepicker(!showDatepicker);
  };

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setShowDatepicker(false);
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

    return dates.map((date) => (
      <div
        key={date.toString()}
        onClick={() => handleDateSelect(date)}
        className={`p-2 rounded-lg cursor-pointer ${
          isSameDay(date, selectedDate ?? new Date())
            ? "bg-blue-500 text-white"
            : ""
        }`}
      >
        {format(date, "d")}
      </div>
    ));
  };

  return (
    <div className="relative  bg-white h-auto p-4 w-auto rounded-lg">
      <input
        type="text"
        value={selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""}
        name={name}
        className="hidden"
      />
      <div className="flex flex-col items-start gap-y-2 ">
        <label htmlFor="date-picker-input" className="">
          <div>
            {title} <span></span>
          </div>
        </label>
        <div className="relative w-full">
          <input
            type="text"
            id="date-picker-input"
            placeholder="Pilih tanggal"
            className="w-full pl-3 cursor-pointer pr-4 py-2 border border-border rounded-md"
            readOnly
            value={
              selectedDate
                ? format(selectedDate, "dd-MMMM-yyyy", { locale: id })
                : ""
            }
            onClick={toggleDatepicker}
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <FaCalendarAlt className="text-brand-base" />
          </div>
        </div>
      </div>
      {showDatepicker && (
        <div className="datepicker absolute top-24 left-0 w-auto p-4 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
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
          <div className="grid grid-cols-7 gap-1 text-center">
            {renderDates()}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
