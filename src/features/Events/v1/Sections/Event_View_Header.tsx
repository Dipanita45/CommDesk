import Button from "@/Component/ui/Button";
import { useCallback, useState } from "react";

import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { EventTabs } from "../Constants/Event.constant";




const Event_View_Header = () => {
  const navigate = useNavigate();
  let [SelectedTab, setSelectedTab] = useState("Upcoming Events");


  let HandleSelectedTab = useCallback((tab: string) => {
    setSelectedTab(tab);
  }, []);

  return (
    <div className="pt-[3vh] bg-white border-b-[1px] border-gray-300 flex  flex-col text-xl font-bold  justify-between">
      <div className="flex w-full justify-between items-start">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-gray-800  ml-5 ">Events</h1>
          <p className="text-[0.9vw] text-gray-500 ml-5 mt-1">
            Manage all your events in one place. Create, edit, and track event details with ease.
          </p>
        </div>
        <div className="flex items-center mr-[2vw]">
          <Button
            text="Create Event"
            onClick={() => navigate("/create-event")}
            backgroundColor="#4f46e4"
            icon={<IoMdAdd />}
          />
        </div>
      </div>

      <div className="flex space-x-4 mt-[5vh] ml-5 p-3">
        {EventTabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 border-b-4  ease-in duration-200 ${
              SelectedTab === tab ? " text-blue-500 border-blue-600" : " text-gray-700 border-transparent"
            }`}
            onClick={() => HandleSelectedTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Event_View_Header;
