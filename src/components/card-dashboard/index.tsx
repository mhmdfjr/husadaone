import React from "react";
import { Profile2User } from "iconsax-react";

const CardDashboard = (props: any) => {
  return (
    <div className="relative w-[280px] h-[137px] flex flex-col justify-between pl-4 py-4 rounded-2xl bg-brand-base overflow-hidden">
      {/* Background Rectangle */}
      <div
        className="absolute top-[5px] right-[-30px] w-[120px] h-[120px] rounded-3xl transform rotate-45 opacity-30"
        style={{
          background: "linear-gradient(to right, #ffff, #2767D4)",
        }}
      ></div>
      <div
        className="absolute bottom-[-70px] left-[-30px] w-[120px] h-[120px] rounded-3xl transform rotate-45 opacity-30"
        style={{
          background: "linear-gradient(to right, #ffff, #2767D4)",
        }}
      ></div>

      <div className="flex items-center justify-start gap-x-3 z-10">
        <div className="rounded-full flex justify-center items-center w-14 h-14 bg-white">
          <Profile2User size="32" className="text-brand-base" />
        </div>
        <div className="text-start gap-y-3">
          <p className="text-body-sm-bold text-basic-white">{props.title}</p>
          <p className="text-h5-bold text-basic-white">{props.sum}</p>
        </div>
      </div>

      <div className="z-10">
        <p className="text-body-sm-regular text-basic-white">
          Terakhir di update{" "}
          <span className="text-body-sm-bold">{props.date}</span>
        </p>
      </div>
    </div>
  );
};

export default CardDashboard;
