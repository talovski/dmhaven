import create from "zustand";

type Filters = {
  search: string;
  openedSpells: string[];
  classes: string[];
  levels: string[];
  abilityScores: string[];
};

type FilterKeys = keyof Filters;

type Args = {
  type: FilterKeys;
  item: string;
};

type Actions = {
  dispatch: (args: Args) => void;
  togglePopover: (x: boolean) => void;
};

type Store = Actions &
  Filters & {
    isPopoverOpen: boolean;
  };

function updateFilters(field: keyof Omit<Filters, "search">, filters: Filters, item: string) {
  return filters[field].includes(item)
    ? filters[field].filter((fieldItem) => fieldItem !== item)
    : [...filters[field], item];
}

function filtersReducer(filters: Filters, { type, item }: Args) {
  console.log("filters", filters);
  console.log("type", type);
  console.log("item", item);
  switch (type) {
    case "search":
      return { search: item };
    case "abilityScores":
      return {
        abilityScores: updateFilters("abilityScores", filters, item),
      };
    case "classes":
      return {
        classes: updateFilters("classes", filters, item),
      };
    case "levels":
      return {
        levels: updateFilters("levels", filters, item),
      };
    case "openedSpells":
      return {
        openedSpells: updateFilters("openedSpells", filters, item),
      };
  }
}

export const useFiltersStore = create<Store>((set) => ({
  search: "",
  openedSpells: [],
  abilityScores: [],
  levels: [],
  classes: [],
  isPopoverOpen: false,
  dispatch: (args) => set((state) => filtersReducer(state, args)),
  togglePopover: (popover) => set(() => ({ isPopoverOpen: popover })),
}));

export function isSelected(filters: Filters, { type, item }: Args): boolean {
  return filters[type].includes(item);
}
