import { SearchResult } from '@/services/SearchService';
import TabBar from '@/components/TabBar';
import TabContent, { TabContentProps } from './components/TabContent';
import { useEffect, useState } from 'react';
import { classNames } from '@/common/functions/strings';

type Props = {
  result: SearchResult;
};

export const SearchResultComponent = ({ result: {
  form, id, set,
  ...props
} }: Props) => {
  const [showNotSave, setShowNotSave] = useState(false);
  const [resultsCount, setResultsCount] = useState(0);
  const [tab, setCurrentTab] = useState('combined');
  const [wrap, setWrap] = useState(false);

  const tabBarProps = { 
    set, 
    showNotSave, 
    onShowMore: showNotSave ? undefined : () => setShowNotSave(true) 
  } /*satisfies Partial<TabContentProps>;*/ // Webpack doesn't understand "satisfies"

  // TODO: Replace with Checkbox component
  const ShowAll = () => (
    <div className="search-result__show-all-container">
      <input type="checkbox" checked={showNotSave} onChange={() => setShowNotSave(!showNotSave)} disabled={resultsCount < 1} />
      <label>Show all ({resultsCount})</label>
    </div>
  );
  const Wrap = () => (
    <div className="search-result__wrap-container">
      <input type="checkbox" checked={wrap} onChange={() => setWrap(!wrap)} />
      <label>Wrap</label>
    </div>
  );

  useEffect(() => {
    const results = (
      tab === 'combined' ? props.combined
      : tab === 'characters' ? props.byCharacterRecommendation
      : props.byArtifact
    );
    const showAll = results.length;
    const showShouldSave = results.filter(({ shouldSave }) => shouldSave).length;
    const showShouldNotSave = showAll - showShouldSave;
    setResultsCount(showShouldNotSave === 0 ? 0 : showNotSave ? showAll : showShouldSave);
  }, [tab, showNotSave]);

  return (
    <div className={classNames(
      "search-result", 
      showNotSave && "search-result--show-not-save", 
      wrap && 'search-result--wrap'
    )}>
      {/* @ts-ignore */}
      <TabBar tabs={[
        ['combined', 'Combined'],
        ['artifacts', 'By Artifacts'],
        ['characters', 'By Character Recommendation'],
      ]}
        combined={<TabContent results={props.combined} {...tabBarProps} />}
        characters={<TabContent results={props.byCharacterRecommendation} {...tabBarProps} />}
        artifacts={<TabContent results={props.byArtifact} {...tabBarProps} />}
        onTabChange={setCurrentTab}
      >
        <ShowAll />
        <Wrap />
      </TabBar>
    </div>
  );
};

export default SearchResultComponent;