import { useState, useEffect } from "react";
import {
  format,
  parse,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  setYear,
  getYear,
} from "date-fns";
import { id } from "date-fns/locale";
import { FaCalendarAlt } from "react-icons/fa";

interface DatePickerProps {
  title: string;
  name: string;
  value: null | string;
  onDateChange: (date: string) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({
  title,
  name,
  value,
  onDateChange,
}) => {
  const today = new Date();
  const [showDatepicker, setShowDatepicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedYear, setSelectedYear] = useState<number>();
  const [currentYear, setCurrentYear] = useState<number>(getYear(new Date()));
  const [showYearDropdown, setShowYearDropdown] = useState(false);

  useEffect(() => {
    if (value) {
      const parsedDate = parse(value, "yyyy-MM-dd", new Date());
      setSelectedDate(parsedDate);
      setCurrentMonth(parsedDate);
      setSelectedYear(getYear(parsedDate));
    } else {
      setSelectedDate(today);
      setCurrentMonth(today);
      setCurrentYear(getYear(today));
      onDateChange(format(today, "yyyy-MM-dd"));
    }
  }, [value, onDateChange]);

  const toggleDatepicker = () => {
    setShowDatepicker(!showDatepicker);
    setShowYearDropdown(false);
  };

  const handlePrevMonth = () => {
    const newDate = subMonths(currentMonth, 1);
    setCurrentMonth(newDate);
    setSelectedYear(getYear(newDate));
  };

  const handleNextMonth = () => {
    const newDate = addMonths(currentMonth, 1);
    setCurrentMonth(newDate);
    setSelectedYear(getYear(newDate));
  };

  const handleYearSelect = (year: number) => {
    setSelectedYear(year);
    setCurrentMonth(setYear(currentMonth, year));
    setShowYearDropdown(false);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setShowDatepicker(false);
    onDateChange(format(date, "yyyy-MM-dd"));
  };

  const renderYears = () => {
    const years = Array.from({ length: 100 }, (_, i) => currentYear - 99 + i);
    return (
      <div className="absolute top-12 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-50 p-2 max-h-48 overflow-auto scrollbar-hide">
        {years.map((year) => (
          <div
            key={year}
            onClick={() => handleYearSelect(year)}
            className={`p-2 cursor-pointer text-center rounded-md ${
              year === currentYear ? "bg-blue-500 text-white" : "text-gray-700"
            } hover:bg-blue-100`}
          >
            {year}
          </div>
        ))}
      </div>
    );
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
    <div className="relative bg-basic-white h-auto w-full rounded-lg">
      <input
        type="hidden"
        value={selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""}
        name={name}
      />
      <div className="flex flex-col justify-start items-start">
        <label
          htmlFor="date-picker-input"
          className="text-body text-basic-black mb-2"
        >
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
                ? format(selectedDate, "yyyy-MM-dd", { locale: id })
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
            <div className="flex items-center space-x-2">
              <span
                className="font-bold text-gray-900 cursor-pointer"
                onClick={() => setShowYearDropdown(!showYearDropdown)}
              >
                {format(currentMonth, "MMMM", { locale: id })}
              </span>
              <span
                className="font-bold text-gray-900 cursor-pointer"
                onClick={() => setShowYearDropdown(!showYearDropdown)}
              >
                {selectedYear ? selectedYear : currentYear}
              </span>
            </div>
            <button className="text-xl text-gray-700" onClick={handleNextMonth}>
              &raquo;
            </button>
          </div>
          {showYearDropdown && renderYears()}
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
