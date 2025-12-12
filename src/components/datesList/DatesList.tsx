import { Date } from "@/models";

export const DatesList = ({ dates }: { dates: Date[] }) => {
  return (
    <div>
      {dates.map((date) => (
        <div key={date.id}>{date.date.toString()}</div>
      ))}
    </div>
  );
};