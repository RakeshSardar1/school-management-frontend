import { useRef } from "react";
import type { DocumentUploadFieldProps } from "../../utilities/types";
import { Icons } from "../icons";

const DocumentUploadField: React.FC<DocumentUploadFieldProps> = ({
  label,
  optional,
  file,
  onFileSelect,
  onRemove,
  fullWidth,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className={`space-y-1.5 ${fullWidth ? "col-span-full" : ""}`}>
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
          {label}{" "}
          {optional && (
            <span className="text-slate-400 font-normal">(Optional)</span>
          )}
        </label>
        <Icons name="FileText" className="w-3.5 h-3.5 text-slate-400" />
      </div>

      <div className="relative">
        <div className="flex items-center border border-slate-200 bg-slate-50/50 rounded-xl p-1.5 pl-3 transition-all hover:border-slate-300">
          <label className="cursor-pointer bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition-colors shrink-0">
            Choose File
            <input
              ref={inputRef}
              type="file"
              onChange={onFileSelect}
              className="hidden"
            />
          </label>

          <span className="text-xs text-slate-500 truncate px-3 flex-1">
            {file ? file.name : "No file chosen"}
          </span>

          {file && (
            <button
              type="button"
              onClick={() => {
                onRemove();
                if (inputRef.current) inputRef.current.value = "";
              }}
              aria-label={`Remove ${label}`}
              className="shrink-0 rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
            >
              <Icons name="X" className="h-4 w-4 cursor-pointer" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentUploadField;
