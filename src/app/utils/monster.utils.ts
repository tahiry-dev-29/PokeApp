export enum MonsterType {
  PLANT = 'plant',
  ELELCTRIC = 'electric',
  FIRE = 'fire',
  WATER = 'water',
  IRON = 'iron',
  AREA = 'area',
}

export interface IMonsterProperties {
  imageUrl: string;
  color: string;
}

export const MonsterTypeProperties: {
  [key: string]: IMonsterProperties;
} = {
  [MonsterType.PLANT]: {
    imageUrl: 'assets/images/plante.png',
    color: 'rgb(135, 255, 124)',
  },
  [MonsterType.ELELCTRIC]: {
    imageUrl: 'assets/images/electro.png',
    color: 'rgb(255, 255, 104)',
  },
  [MonsterType.FIRE]: {
    imageUrl: 'assets/images/fire.png',
    color: 'rgb(255 88 0 / 89%)',
  },
  [MonsterType.WATER]: {
    imageUrl: 'assets/images/watter.png',
    color: 'rgb(0 255 239 / 62%)',
  },
  [MonsterType.AREA]: {
    imageUrl: 'assets/images/area.png',
    color: 'rgb(76 88 92)',
  },
  [MonsterType.IRON]: {
    imageUrl: 'assets/images/blow.png',
    color: 'rgb(118, 235, 124)',
  },
};
