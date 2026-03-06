import { RiContactsBookFill } from "react-icons/ri";
import { getTheme } from "../../../../config/them.config";
import SideBarLink from "../Components/SideBarLink";
import {
  MdDashboard,
  MdEvent,
  MdGroup,
  MdSettings,
  MdWork,
} from "react-icons/md";

const SideBar = () => {
  let theme = getTheme("light");

  return (
    <div
      className="sidebar w-[25%] lg:w-[18%] min-h-screen flex flex-col border-r"
      style={{
        borderColor: theme.borderColor.primary,
        background: theme.background.primary,
      }}
    >
      <div
        className="sidebar-header p-4 border-b border-t-2 flex min-h-21 w-full items-center justify-center gap-1"
        style={{ borderColor: theme.borderColor.primary }}
      >
        {/* <img src="https://media.licdn.com/dms/image/v2/D4E0BAQF1PHwKK_ViDg/img-crop_100/B4EZnsRhrXIIAM-/0/1760605642362?e=1772668800&v=beta&t=zHdmlHtd1gM7B8bS-OHUtzOdNnWiJXSb_k-nPrlHtHg" alt="Apex Circle Logo" className="w-15 h-15 mb-2" /> */}

        <div
          className="Circle w-10 h-10 rounded-full"
          style={{ background: theme.textColor.tersiary }}
        ></div>

        <h1
          className="font-bold h-full text-center text-[1.40em] leading-0"
          style={{
            color: theme.textColor.tersiary,
            fontFamily: theme.fontFamily.primary,
          }}
        >
          Apex Circle
        </h1>
      </div>
      <div className="sidebar-content flex flex-col gap-3 p-4 flex-1 w-full">
        {/* Sidebar content goes here */}
        <h1>Operations</h1>
        <SideBarLink icon={<MdDashboard />} text="Dashboard" />
        <SideBarLink icon={<MdWork />} text="Projects" />
        <SideBarLink icon={<MdGroup />} text="Teams" link="/member" />
        <SideBarLink icon={<MdEvent />} text="Events" link="/events" />
        <SideBarLink
          icon={<RiContactsBookFill />}
          text="Contact Submissions"
          link="/contact"
        />

        <div
          className="mt-auto w-full border-t flex flex-col py-5"
          style={{ borderColor: theme.borderColor.primary }}
        >
          <div className="w-full">
            <SideBarLink icon={<MdSettings />} text="Settings" />
          </div>

          <div
            className="Profile mt-4 w-full rounded-lg  p-3 flex items-center gap-3 cursor-pointer  bg-[#f0f4fc]"
            style={{
              borderColor: theme.borderColor.primary,
            }}
          >
            <img
              src="https://randomuser.me/api/portraits/men/1.jpg"
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover shrink-0"
            />

            <div className="min-w-0 flex-1 flex flex-col justify-center gap-1">
              <p
                className="text-sm font-semibold truncate"
                style={{
                  color: theme.textColor.primary,
                  fontFamily: theme.fontFamily.primary,
                }}
              >
                John Doe
              </p>
              <p
                className="text-xs truncate font-black"
                style={{
                  color: theme.textColor.tersiary,
                  fontFamily: theme.fontFamily.primary,
                }}
              >
                Admin
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
