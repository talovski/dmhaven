"use client";

import { useState } from "react";
import { useSelectedLayoutSegments } from "next/navigation";
import { categories } from "../lib/categories";
import Link from "next/link";
import clsx from "clsx";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  const segment = useSelectedLayoutSegments();
  console.log("segment", segment);

  return (
    <div className="fixed top-0 left-0 w-full flex-col border-b font-dmsans lg:bottom-0 lg:z-auto lg:w-72 lg:border-r lg:border-gray-500">
      <div className="flex h-14 items-center p-4 lg:h-auto">
        <Link href="/" className="group flex w-full items-center">
          <h3 className="font-semibold tracking-wide text-gray-700 group-hover:text-black">
            DM Haven
          </h3>
        </Link>
      </div>

      <button
        type="button"
        className="group absolute right-0 top-0 flex h-14 items-center space-x-2 px-4 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        Menu
      </button>

      <div
        className={clsx("overflow-y-auto lg:static lg:block", {
          "fixed inset-x-0 bottom-0 top-14 mt-px": isOpen,
          hidden: !isOpen,
        })}
      >
        {categories.map((category) => (
          <Item key={category.index} category={category} />
        ))}
      </div>
    </div>
  );
}

function Item({ category }: { category: { index: string; text: string } }) {
  const segment = useSelectedLayoutSegments();
  const isActive = category.index === segment[0];

  return (
    <Link
      href={`/library/${category.index}/`}
      className={clsx("flex rounded-md py-1 px-1", {
        "text-black hover:bg-orange-100": !isActive,
        "bg-orange-200 text-black": isActive,
      })}
    >
      <div className="flex text-sm font-semibold uppercase tracking-wider text-gray-700">
        <p>{category.text}</p>
      </div>
    </Link>
  );
}
