import { Popover } from "@headlessui/react";

export function PopoverOverlay() {
  return (
    <Popover.Overlay className="w-100 h-100 fixed top-0 left-0 right-0 bottom-0 bg-transparent" />
  );
}

export function PopoverButton({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
}) {
  return (
    <Popover.Button
      onClick={onClick}
      className={[
        className,
        "flex justify-center rounded-[4px] border border-solid bg-[#ededed] px-2 hover:bg-[#e8e8e8]",
      ].join(" ")}
    >
      {children}
    </Popover.Button>
  );
}

export function PopoverPanel({ children }: { children: React.ReactNode }) {
  return (
    <Popover.Panel className="absolute top-8 z-10 w-[240px] rounded-md border border-solid border-[#c4c4c4] bg-[#f7f7f7] px-4 py-2 text-xl">
      {children}
    </Popover.Panel>
  );
}
