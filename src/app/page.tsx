"use client"
import React from "react";
import Sidebar from "@/components/sidebar";
import TopBar from "@/components/topbar";

const Main = () => {
  return (
    <main className="flex flex-row">
      <div className="sidebar flex flex-row justify-start items-center">
        <Sidebar />
      </div>
      <div className="topbar w-full flex flex-col">
        <div className="flex justify-center items-center">
          <TopBar />
        </div>
      </div>
    </main>
  );
};

export default Main;
