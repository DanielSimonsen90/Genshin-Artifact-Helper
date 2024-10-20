export type ArtifactPartName = 'Flower' | 'Feather' | 'Sands' | 'Goblet' | 'Circlet';
export type Element = 'Anemo' | 'Pyro' | 'Hydro' | 'Electro' | 'Cryo' | 'Geo' | 'Dendro';

export type Reaction =
  | 'Vaporize' | 'Overloaded' | 'Melt' | 'Burning'
  | 'Frozen' | 'Shatter' | 'Burgeon' | 'Hyperbloom' | 'Bloom'
  | 'Electro-Charged' | 'Superconduct' | 'Quicken' | 'Aggravate' | 'Spread'
  | 'Swirl' | 'Crystallize';

export enum Rarity {
  Common = 1,
  Uncommon = 2,
  Rare = 3,
  Epic = 4,
  Legendary = 5,
}

export enum ResinCost {
  Twenty = 20, // Basic domains
  Thirty = 30, // Weekly domains (3 times)
  Forty = 40, // World bosses
  Sixty = 60, // Weekly bosses (after 3 times)
}

export type Region = 'Mondstadt' | 'Liyue' | 'Inazuma' | 'Sumeru' | 'Fontaine' | 'Natlan' | 'Snezhnaya' | 'Unknown';