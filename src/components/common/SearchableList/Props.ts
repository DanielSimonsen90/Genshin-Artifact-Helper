import { Dispatch, SetStateAction, ReactNode } from "react";
import { List } from "@/common/models/List";
import { FilterObject } from "../Filter/Filter";

export type FilterProps<TItem, FilterKeys extends string> = {
  filterChecks?: FilterObject<FilterKeys, TItem>,
}

export type OptionalProps<TItem, FilterKeys extends string> = FilterProps<TItem, FilterKeys> & {
  defaultSearch?: string,
  placeholder?: string,
  filterPlaceholder?: string,

  onShowMore?: () => void,

  className?: string,
  ulClassName?: string
  liClassName?: string | ((item: TItem) => string),
}

export type ControlledProps<TItem, FilterKeys extends string> = {
  search: string,
  setSearch: Dispatch<SetStateAction<string>>,

  filters: FilterObject<FilterKeys, TItem, boolean>,
  setFilters: Dispatch<SetStateAction<FilterObject<FilterKeys, TItem, boolean>>>,
  onFilterChange: (filters: FilterObject<FilterKeys, TItem, boolean>) => void,
  children: [ReactNode, TItem][],
};

type RenderItemOrChildren<TItem> = {
  renderItem: (item: TItem) => ReactNode,
} | {
  children: (item: TItem) => ReactNode,
};
export type UncrontrolledProps<TItem, FilterKeys extends string> = RenderItemOrChildren<TItem> & {
  items: Array<TItem> | List<TItem>,  
  onSearch: (search: string, itemMatch: TItem) => boolean,
};

export type Props<TItem, FilterKeys extends string = string> = 
  & OptionalProps<TItem, FilterKeys> 
  & (ControlledProps<TItem, FilterKeys> | UncrontrolledProps<TItem, FilterKeys>);