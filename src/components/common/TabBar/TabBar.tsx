import { Dispatch, ReactNode, SetStateAction, useCallback, useEffect, useMemo, useState } from "react";
import { classNames } from "@/common/functions/strings";
import { Functionable } from "@/common/types";
import { Chevron } from "../icons";

type Props<
  TTabKey extends string,
> = {
  defaultTab?: TTabKey,
  tabs: [TTabKey, ReactNode][],
  noTabs?: JSX.Element,

  tab?: TTabKey,
  setTab?: Dispatch<SetStateAction<TTabKey>>,

  id?: string,
  children?: ReactNode,

  beforeTabChange?: (tab: TTabKey) => void,
  onTabChange?: (tab: TTabKey) => void,
} & Record<TTabKey, Functionable<ReactNode>> & {
  className?: string,
};

export default function TabBar<TTabKey extends string>({ tabs, ...props }: Props<TTabKey>) {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, _setActiveTab] = useState<TTabKey>(
    props.defaultTab
    ?? tabs.filter(([_, value]) => value)[0]?.[0]
  );

  const internalTabs = useMemo(() => {
    const set = tabs
      .filter(([_, value]) => value !== undefined)
      .reduce((acc, [key, value]) => acc.set(key, value), new Map<TTabKey, ReactNode>());
    return [...set.entries()];
  }, [tabs, props.id]);

  const getKeyName = useCallback((key: any) => props.id ? `#${props.id}-${key}` : key, [props.id]);
  const TabContent = useCallback(function TabContent() {
    const contentChildren = internalTabs.map(([tab]) => [tab, typeof props[tab as keyof typeof props] === 'function'
      ? props[tab as keyof typeof props] as () => JSX.Element
      : () => props[tab as keyof typeof props] as JSX.Element] as const);

    return (<>{contentChildren.map(([tab, Content], key) => (
      <div data-tab={tab} key={getKeyName(`content-${key}`)} className={classNames("tab-bar__content-page", tab === (props.tab ?? activeTab) && 'tab-bar__content-page--active')}>
        <Content />
      </div>
    ))}</>);
  }, [tabs, activeTab, props.tab]);
  const setActiveTab = useCallback((tab: TTabKey) => {
    if (!tab) return;
    if (props.beforeTabChange) props.beforeTabChange(tab);
    (props.setTab ?? _setActiveTab)(tab);
  }, [props.beforeTabChange, props.setTab]);

  useEffect(function onTabChanged() {
    if (props.onTabChange) props.onTabChange(props.tab ?? activeTab);
  }, [activeTab, props.tab, props.onTabChange]);

  useEffect(function onTabsOptionsChanged() {
    // if active tab key is not in tabs or the value is falsy, set it to the first tab
    if (!tabs.find(([key]) => key === (props.tab ?? activeTab))?.[1]) {
      setActiveTab(props.defaultTab ?? tabs[0]?.[0] as TTabKey);
    }
  }, [tabs]);

  useEffect(function onControlledTabChanged() {
    if (props.tab) setActiveTab(props.tab);
  }, [props.tab]);

  return tabs.filter(([_, v]) => v)[0] ? (
    <div className={classNames("tab-bar", props.className)}>
      <header className={classNames('tab-bar__tabs')}>
        {internalTabs.map(([tab, title]) => title &&
          <button key={getKeyName(tab)}
            className={classNames("tab-bar__tab", activeTab === tab && 'tab-bar__tab--active')}
            onClick={() => setActiveTab(tab)}
          >
            {title}
          </button>)}
        {props.children}
        <Chevron role="button" tabIndex={0} point={collapsed ? 'down' : 'up'} onClick={() => setCollapsed(v => !v)} onKeyDown={e => {
          if (e.key === 'Enter' || e.key === 'NumpadEnter' || e.key === ' ') setCollapsed(v => !v);
        }} />
      </header>
      <section className={classNames('tab-bar__content', collapsed && 'tab-bar__content--collapsed')}>
        <TabContent />
      </section>
    </div>
  ) : props.noTabs;
}