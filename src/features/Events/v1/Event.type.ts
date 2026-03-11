export type Event = {
  id: number;
  name: string;
  subtitle: string;
  logo: React.ReactNode;
  date: string;
  status: "Live" | "Upcoming" | "Completed";
  teams: number;
  submissions: number | "-";
};
