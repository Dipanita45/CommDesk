import React from "react";
import { FaToggleOff, FaToggleOn } from "react-icons/fa";

const accessOptions = [
  {
    key: "internalDashboard",
    title: "Internal Dashboard",
    description: "View Only Access",
  },
  {
    key: "comunityForum",
    title: "Community Forum",
    description: "Participate in discussions",
  },
  {
    key: "adminControls",
    title: "Admin Controls",
    description: "Manage users and settings",
  },
  {
    key: "superAdmin",
    title: "Super Admin",
    description: "Full access to all features",
  },
];

const AccessLevel = () => {
  const [accessLevel, setAccessLevel] = React.useState({
    internalDashboard: true,
    comunityForum: false,
    adminControls: false,
    superAdmin: false,
  });

  return (
    <div className="flex w-full flex-col gap-2 mt-8 text-lg text-gray-700">
      <p className="text-md uppercase font-bold mb-2">Access Levels</p>
      {accessOptions.map((option) => (
        <div
          key={option.key}
          className="flex w-full justify-between items-center p-4 rounded-lg border border-gray-200 bg-white mb-2 shadow-sm"
        >
          <div className="flex flex-col gap-1">
            <p className="text-lg font-bold">{option.title}</p>
            <p className="text-sm text-gray-500">{option.description}</p>
          </div>
          <div className="cursor-pointer">
            {accessLevel[option.key as keyof typeof accessLevel] ? (
              <FaToggleOn
                size={30}
                color="green"
                onClick={() =>
                  setAccessLevel((prev) => ({
                    ...prev,
                    [option.key]: !prev[option.key as keyof typeof prev],
                  }))
                }
              />
            ) : (
              <FaToggleOff
                size={30}
                color="gray"
                onClick={() =>
                  setAccessLevel((prev) => ({
                    ...prev,
                    [option.key]: !prev[option.key as keyof typeof prev],
                  }))
                }
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccessLevel;
