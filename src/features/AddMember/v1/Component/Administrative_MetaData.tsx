import { getTheme } from "../../../../config/them.config";
import MemberShip_Status from "./MemberShip_Status";
import AccessLevel from "./AccessLevel";

// Removed unused Role type
const Administrative_MetaData = () => {
  let theme = getTheme("light");

  return (
    <div
      className="bg-white w-[30%] h-full flex flex-col border-2 rounded-lg self-center mt-10 p-7"
      style={{
        backgroundColor: theme.background.primary,
        borderColor: theme.borderColor.primary,
      }}
    >
      <p className="uppercase text-lg font-bold">Administrative Metadata</p>

      <MemberShip_Status />

      <AccessLevel />
    </div>
  );
};

export default Administrative_MetaData;
