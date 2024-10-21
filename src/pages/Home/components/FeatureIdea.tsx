import { Arrayable } from "@/common/types";

type Props = {
  title: string;
  features: Array<string | Record<string, Array<string | Record<string, Array<string | Record<string, Array<string>>>>>>>;
  version: number;
};

export const FeatureIdea = ({ title, features, version }: Props) => (
  <section className="feature-idea">
    <h4>{title} - v{version}</h4>
    <section>
      <ul>
        {features.map((feature, i) => (
          <RenderArray key={i} listItem={feature} />
        ))}
      </ul>
    </section>
  </section>
);

const RenderArray = ({ listItem }: { listItem: Props['features'] extends Array<infer T> ? T : Props['features'] }) => {
  if (typeof listItem === 'string')  return <li>{listItem}</li>;
  const children = Object.keys(listItem).map((key) => (
    <li key={key}>
      <span>{key}</span>
      <ul>
        {listItem[key].map((item, i) => (
          <RenderArray key={i} listItem={item} />
        ))}
      </ul>
    </li>
  ));

  return <>{children}</>;
}