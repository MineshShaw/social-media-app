"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Card from "@/components/Card";

interface UserDM {
  _id: number;
  name: string;
}

export default function DmList() {
  const user = useSelector((state: RootState) => state.user.userData);
  const [dms, setDms] = useState<UserDM[]>([]);
  const [selectedDm, setSelectedDmState] = useState<UserDM | null>(null);

  useEffect(() => {
    setDms([
      { _id: 1, name: "John Doe" },
      { _id: 2, name: "Jane Smith" },
    ]);
  }, []);

  const handleDmClick = (dm: UserDM) => {
    setSelectedDmState(dm);
  };

  return (
    <Card>
      <div className="flex flex-col p-6">
        <h1 className="text-2xl font-bold text-black">DMs</h1>
        <ul className="flex flex-col">
          {dms.map((dm) => (
            <li key={dm._id} >
              <button onClick={() => handleDmClick(dm)}
                className="cursor-pointer text-black p-2 hover:bg-gray-100 rounded"
                >
                  {dm.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};
