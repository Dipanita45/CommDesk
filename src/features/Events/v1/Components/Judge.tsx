import { useMemo, useState } from "react";
import Input from "@/Component/ui/Input";
import { getTheme } from "@/config/them.config";
import { CiSearch } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import JudgeCard from "./JudgeCard";

const JUDGES = [
  {
    id: 1,
    image: "https://randomuser.me/api/portraits/men/36.jpg",
    name: "Kabir Shah",
    role: "Technical Judge",
  },
  {
    id: 2,
    image: "https://randomuser.me/api/portraits/women/31.jpg",
    name: "Meera Joshi",
    role: "Design Judge",
  },
];

const Judge = () => {
  const theme = getTheme("light");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredJudges = useMemo(() => {
    const normalizedQuery = searchTerm.trim().toLowerCase();

    if (!normalizedQuery) {
      return JUDGES;
    }

    return JUDGES.filter((judge) => {
      const searchableText = `${judge.name} ${judge.role}`.toLowerCase();
      return searchableText.includes(normalizedQuery);
    });
  }, [searchTerm]);

  return (
    <div
      className="flex flex-col w-full p-4 border-2 rounded-lg shadow-sm"
      style={{
        background: theme.background.primary,
        borderColor: theme.borderColor.primary,
      }}
    >
      <div className="mb-1 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <h2 className="font-bold text-lg text-black uppercase">Judges</h2>
          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">
            {filteredJudges.length}
          </span>
        </div>

        <button
          type="button"
          className="flex items-center justify-center gap-1 rounded-md border border-amber-200 bg-amber-50 px-2.5 py-1.5 text-sm font-semibold text-amber-700 transition-colors hover:bg-amber-100"
        >
          <IoMdAdd className="text-base" />
          Add
        </button>
      </div>

      <div className="Search">
        <Input
          name="SearchJudge"
          placeholder="Search Judges..."
          leftIcon={<CiSearch />}
          value={searchTerm}
          onChange={(_, value) => setSearchTerm(value)}
        />
      </div>

      <div className="mt-1 grid grid-cols-1 gap-3">
        {filteredJudges.length === 0 ? (
          <p className="rounded-md border border-dashed border-gray-300 px-3 py-4 text-sm text-gray-500">
            No judges found.
          </p>
        ) : (
          filteredJudges.map((judge) => (
            <JudgeCard key={`judge-${judge.id}`} image={judge.image} name={judge.name} role={judge.role} />
          ))
        )}
      </div>
    </div>
  );
};

export default Judge;