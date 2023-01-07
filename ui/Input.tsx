import IconSearch from "./icons/IconSearch";
import { ChangeEventHandler } from "react";
import clsx from "clsx";

type Props = {
  type?: "search";
  value: string;
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
};

export default function Input({ type = "search", value, placeholder, onChange }: Props) {
  return (
    <div className="relative flex items-center font-dmsans">
      {type === "search" && <IconSearch className="absolute left-2 h-4 w-4" />}
      <input
        className={clsx(
          "w-full max-w-prose rounded-md border border-solid border-[#dddddd] py-1 pl-8 text-xl",
          type === "search" && "pl-8"
        )}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}
