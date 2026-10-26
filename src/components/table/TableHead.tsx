import React from "react";
import { type TableHeader } from "../../utilities/types";

interface TableHeadProps {
  headers: TableHeader[];
}
const TableHead: React.FC<TableHeadProps> = ({ headers }) => {
  const alignClass = (align: TableHeader["align"]) =>
    align === "right"
      ? "text-right"
      : align === "center"
        ? "text-center"
        : "text-left";

  return (
    <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
      {headers?.map((h) => (
        <th
          key={h.key}
          scope="col"
          className={`py-4 px-6 ${alignClass(h.align)} ${h.className ?? ""}`}
        >
          {h.label}
        </th>
      ))}
    </tr>
  );
};
export default TableHead;
