
import { getTheme } from "@/config/them.config";
import InternalDashboardSearch from "@/features/Contact_And_Support/Components/InternalDashboardSearch";
import InternalSupport_Table from "../../Components/InternalSupport_Table";



const InternalDirectoryTable = () => {
  let theme = getTheme("light");

  return (
    <div
      className="w-[90vw] lg:w-[55vw] flex h-full rounded-xl border-2"
      style={{ background: theme.background.primary  , borderColor: theme.borderColor.primary}}
    >
      <div className="flex flex-col w-full bg-red-300">
     <InternalDashboardSearch />

     <InternalSupport_Table />

      </div>



     
    </div>
  );
};

export default InternalDirectoryTable;
