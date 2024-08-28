import React, { useState, useEffect, useRef } from "react";
import Header from "../Header";
import { Outlet } from "react-router-dom";

export default function HomePage() {
  const [open, setOpen] = useState(false);
  const [height, setHeight] = useState(0);

  return (
    <div className="h-full">
      <div className={`h-[111px] lg:h-[77px]`}>
        <Header open={open} setOpen={setOpen} />
      </div>
      <div className="p-2 lg:p-4">
        <Outlet />
      </div>
    </div>
  );
}
