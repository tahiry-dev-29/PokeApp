import { MonsterType } from "../../utils/monster.utils";

export class MonsterModule {
  id: number = -1;
  name: string = "Pikashu";
  image: string = 'assets/images/pikachu.png';
  type: MonsterType = MonsterType.ELELCTRIC;
  hp: number = 200;
  figureCaption: string = 'Geo Impact';
  attackName: string = 'Standard Attaque';
  attackStrength: number = 25;
  attackDescription: string = "This is the long description Lorem ipsum dolor sit amet consectetur adipisicing elit."
  
  copy(): MonsterModule{
    return Object.assign(new MonsterModule(), this)
  }
}
