import { useDomainData } from "@/stores";
import DomainCard from "../DomainCard";
import TabBar from "@/components/common/TabBar";

type Props = {
  title: string;
  domainNames: string[];
} & {
  showDetails?: boolean;
  showRewards?: boolean;
}

export default function DomainList({ title = "Domains", domainNames, ...props }: Props) {
  const { findDomainByName } = useDomainData();
  const checkIsBossDrop = (name: string) => name === 'BOSS_DROP';

  return (
    <section className="domain-list-section">
      <h2>{title}</h2>
      <TabBar tabs={domainNames.map(name => [name, checkIsBossDrop(name) ? 'World Bosses' : name])}
        {...domainNames.reduce((acc, name) => ({ 
          ...acc, 
          // TODO: Render custom component that displays "Dropped from bosses" + resin count
          [name]: checkIsBossDrop(name) ? <p>Dropped from world bosses.</p> : <DomainCard domain={findDomainByName(name)} {...props} showNavButton /> 
        }), {} as any)}
      />
    </section>
  );
}