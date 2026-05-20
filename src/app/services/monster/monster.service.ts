import { Injectable } from '@angular/core';
import { MonsterModule } from '../../modules/monster/monster.module';
import { MonsterType } from '../../utils/monster.utils';

@Injectable({
  providedIn: 'root',
})
export class MonsterService {
  monsters: MonsterModule[] = [];
  currentIndex: number = 1;

  constructor() {
    this.#load();
  }

  #save() {
    localStorage.setItem('monstersKey', JSON.stringify(this.monsters));
  }

  #load() {
    const monsterData = localStorage.getItem('monstersKey');
    if (monsterData) {
      // JSON parse qui prend le STRING JSON et le convertir en OBJ JS
      this.monsters = JSON.parse(monsterData).map((monsterJSON: any) =>
        Object.assign(new MonsterModule(), monsterJSON)
      );
      //recuper la valeur maximal d'un tableau
      this.currentIndex = Math.max(...this.monsters.map((m) => m.id));
    } else {
      this.#init();
      this.#save();
    }
  }

  #init() {
    this.monsters = [];
    const Pikashu = new MonsterModule();
    Pikashu.id = this.currentIndex++;
    Pikashu.name = 'Pikashu';
    Pikashu.hp = 200;
    Pikashu.figureCaption = 'N 001';
    this.monsters.push(Pikashu);

    const Salameche = new MonsterModule();
    Salameche.id = this.currentIndex++;
    Salameche.name = 'Salameche';
    Salameche.image = 'assets/images/salameche.png';
    Salameche.type = MonsterType.FIRE;
    Salameche.hp = 120;
    Salameche.figureCaption = 'N 003';
    this.monsters.push(Salameche);

    const Bulbizarre = new MonsterModule();
    Bulbizarre.id = this.currentIndex++;
    Bulbizarre.name = 'Bulbizarre';
    Bulbizarre.image = 'assets/images/bulbizarre.png';
    Bulbizarre.type = MonsterType.PLANT;
    Bulbizarre.hp = 180;
    Bulbizarre.figureCaption = 'N 004';
    this.monsters.push(Bulbizarre);

    const Abo = new MonsterModule();
    Abo.id = this.currentIndex++;
    Abo.name = 'Abo';
    Abo.image = 'assets/images/abo.png';
    Abo.type = MonsterType.AREA;
    Abo.hp = 160;
    Abo.figureCaption = 'N 005';
    this.monsters.push(Abo);

    const Carapuce = new MonsterModule();
    Carapuce.id = this.currentIndex++;
    Carapuce.name = 'Carapuce';
    Carapuce.image = 'assets/images/carapuce.png';
    Carapuce.type = MonsterType.WATER;
    Carapuce.hp = 180;
    Carapuce.figureCaption = 'N 006';
    this.monsters.push(Carapuce);
  }
  getAll(): MonsterModule[] {
    return this.monsters.map((m) => m.copy());
  }

  get(id: number): MonsterModule | undefined {
    const monster = this.monsters.find((m) => m.id === id);
    return monster ? monster.copy() : undefined;
  }

  add(monster: MonsterModule): MonsterModule {
    const monsterCopy = monster.copy();
    monsterCopy.id = this.currentIndex;
    this.monsters.push(monsterCopy.copy());
    this.currentIndex++;
    this.#save();

    return monsterCopy;
  }

  update(monster: MonsterModule): MonsterModule {
    const monsterCopy: MonsterModule = monster.copy();
    const monsterIndex: number = this.monsters.findIndex(
      (originalMonster: MonsterModule) => originalMonster.id === monster.id
    );
    if (monsterIndex != -1) {
      this.monsters[monsterIndex] = monsterCopy.copy();
      this.#save();
    }
    return monsterCopy;
  }

  delete(id: number): void {
    const monsterIndex: number = this.monsters.findIndex(
      (originalMonster) => originalMonster.id === id
    );

    if (monsterIndex != -1) {
      this.monsters.splice(monsterIndex, 1);
      this.#save();
    }
  }
}
