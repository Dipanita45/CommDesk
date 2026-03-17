import { getTheme } from "@/config/them.config";
import ContactHeader from "../Section/ContactHeader";
import InternalDirectoryTable from "../Section/InternalDirectoryTable";

const Contact = () => {
  let theme = getTheme("light");
  return (
    <div className="w-full h-full flex flex-col" style={{ background: theme.background.secondary }}>
      <ContactHeader />

      <div className="p-[3vw] flex flex-col">
        <InternalDirectoryTable />
      </div>
    </div>
  );
};

export default Contact;
