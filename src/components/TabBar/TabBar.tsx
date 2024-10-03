import { classNames } from "@/common/functions/strings";
import { Functionable } from "@/common/types";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";

type Props<
  TTabKey extends string,
> = {
  defaultTab?: TTabKey,
  tabs: [TTabKey, ReactNode][],

  id?: string,
  children?: ReactNode,

  beforeTabChange?: (tab: TTabKey) => void,
  onTabChange?: (tab: TTabKey) => void,
} & Record<TTabKey, Functionable<ReactNode>>;

export default function TabBar<TTabKey extends string>({ tabs, ...props }: Props<TTabKey>) {
  const [activeTab, _setActiveTab] = useState<TTabKey>(props.defaultTab ?? tabs.some(([key, value]) =>
    typeof value === 'string' ? value === props.defaultTab : key === props.defaultTab
  ) ? props.defaultTab as TTabKey : tabs[0][0] as TTabKey);

  const internalTabs = useMemo(() => {
    const set = tabs
      .filter(([_, value]) => value !== undefined)
      .reduce((acc, [key, value]) => acc.set(key, value), new Map<TTabKey, ReactNode>());
    return [...set.entries()];
  }, [tabs, props.id]);

  const getKeyName = useCallback((key: any) => props.id ? `#${props.id}-${key}` : key, [props.id]);
  const TabContent = useCallback(() => {
    const contentChildren = internalTabs.map(([tab]) => [tab, typeof props[tab as keyof typeof props] === 'function'
      ? props[tab as keyof typeof props] as () => JSX.Element
      : () => props[tab as keyof typeof props] as JSX.Element] as const);

    return (<>{contentChildren.map(([tab, Content], key) => (
      <div key={getKeyName(`content-${key}`)} className={classNames("tab-bar__content-page", tab === activeTab && 'tab-bar__content-page--active')}>
        <Content />
      </div>
    ))}</>);
  }, [tabs, activeTab]);
  const setActiveTab = useCallback((tab: TTabKey) => {
    if (props.beforeTabChange) props.beforeTabChange(tab);
    _setActiveTab(tab);
  }, [props.beforeTabChange, props.onTabChange, tabs]);

  useEffect(() => {
    if (props.onTabChange) props.onTabChange(activeTab);
  }, [activeTab, props.onTabChange]);

  useEffect(() => {
    // if active tab key is not in tabs or the value is falsy, set it to the first tab
    if (!tabs.find(([key]) => key === activeTab)?.[1]) {
      _setActiveTab(tabs[0][0] as TTabKey);
    }
  }, [tabs]);

  return (
    <div className="tab-bar">
      <header className={classNames('tab-bar__tabs')}>
        {internalTabs.map(([tab, title]) => title && <button key={getKeyName(tab)} className={classNames("tab-bar__tab", activeTab === tab && 'tab-bar__tab--active')} onClick={() => setActiveTab(tab)}>{title}</button>)}
        {props.children}
      </header>
      <section className={classNames('tab-bar__content')}>
        <TabContent />
      </section>
    </div>
  );
}