import { isSelected, useFiltersStore } from "./store";
import IconSearch from "../../../ui/icons/IconSearch";
import { Popover } from "@headlessui/react";
import { PopoverButton, PopoverOverlay, PopoverPanel } from "../../../ui/popovers/Popover";
import { classesList } from "../../../lib/classesList";
import { abilityScoresList } from "../../../lib/abilityScoresList";
import { levels } from "../../../lib/levels";
import clsx from "clsx";

export default function SpellsHeader() {
  const filters = useFiltersStore();
  return (
    <div className="relative z-50 grid">
      <div className="relative flex items-center font-dmsans">
        <IconSearch className="absolute left-2 h-4 w-4" />
        <input
          className="w-full max-w-prose rounded-md border border-solid border-[#dddddd] py-1 pl-8 text-xl"
          value={filters.search}
          placeholder="Search by name, class or ability score"
          onChange={(event) => filters.dispatch({ item: event.target.value, type: "search" })}
        />
      </div>
      <div className="relative mt-2 flex gap-2 font-dmsans">
        <Popover className="relative z-40">
          {({ open }) => (
            <>
              <PopoverButton
                onClick={() => filters.togglePopover(!filters.isPopoverOpen)}
                className={clsx("text-lg", open ? "bg-[#e8e8e8]" : "")}
              >
                Class{!!filters.classes?.length && ` (${filters.classes?.length})`}
              </PopoverButton>
              <PopoverOverlay />
              <Popover.Overlay className="inset w-100 h-100 fixed top-0 left-0 right-0 bottom-0 bg-transparent" />
              <PopoverPanel>
                {classesList.map((clx) => (
                  <div key={clx.index} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={clx.index}
                      name={clx.index}
                      checked={isSelected(filters, { item: clx.index, type: "classes" })}
                      onChange={() => filters.dispatch({ item: clx.index, type: "classes" })}
                      className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-green-600 focus:ring-2 focus:ring-green-500"
                    />
                    <label htmlFor={clx.index} key={clx.index}>
                      {clx.name}
                    </label>
                  </div>
                ))}
              </PopoverPanel>
            </>
          )}
        </Popover>
        <Popover className="relative">
          {({ open }) => (
            <>
              <PopoverButton
                onClick={() => filters.togglePopover(!filters.isPopoverOpen)}
                className={clsx("text-lg", open ? "bg-[#e8e8e8]" : "")}
              >
                Ability score
                {!!filters.abilityScores?.length && ` (${filters.abilityScores?.length})`}
              </PopoverButton>
              <PopoverOverlay />
              <PopoverPanel>
                {abilityScoresList.map((score) => (
                  <div key={score.index} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={score.index}
                      name={score.index}
                      className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-green-600 focus:ring-2 focus:ring-green-500"
                      checked={isSelected(filters, { item: score.index, type: "abilityScores" })}
                      onChange={() =>
                        filters.dispatch({ item: score.index, type: "abilityScores" })
                      }
                    />
                    <label htmlFor={score.index}>{score.name}</label>
                  </div>
                ))}
              </PopoverPanel>
            </>
          )}
        </Popover>
        <Popover className="relative flex">
          {({ open }) => (
            <>
              <PopoverButton
                onClick={() => filters.togglePopover(!filters.isPopoverOpen)}
                className={clsx("text-lg", open ? "bg-[#e8e8e8]" : "")}
              >
                Level
              </PopoverButton>
              <PopoverOverlay />
              {/* <Popover.Overlay className="inset fixed bg-transparent" /> */}
              <PopoverPanel>
                {levels.map((level) => (
                  <div key={level.level} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value={level.level}
                      name={level.level.toString()}
                      className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-green-600 focus:ring-2 focus:ring-green-500"
                      checked={isSelected(filters, {
                        item: level.level.toString(),
                        type: "levels",
                      })}
                      onChange={() =>
                        filters.dispatch({ item: level.level.toString(), type: "levels" })
                      }
                    />
                    <label htmlFor={level.level.toString()}>{level.text}</label>
                  </div>
                ))}
              </PopoverPanel>
            </>
          )}
        </Popover>
      </div>
    </div>
  );
}
