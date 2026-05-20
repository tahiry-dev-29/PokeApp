import {
  Component,
  ModelSignal,
  Signal,
  WritableSignal,
  computed,
  inject,
  model,
  signal,
} from '@angular/core';
import { MonsterModule } from '../../modules/monster/monster.module';
import { MonsterService } from '../../services/monster/monster.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../modules/material/material.module';
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";
import { PlayingCardComponent } from "../../components/playing-card/playing-card.component";
import { Router } from '@angular/router';

@Component({
    selector: 'app-monster-list',
    standalone: true,
    templateUrl: './monster-list.component.html',
    styleUrl: './monster-list.component.scss',
    imports: [MaterialModule, CommonModule, SearchBarComponent, PlayingCardComponent]
})
export class MonsterListComponent {
  private monsterService = inject(MonsterService);
  private router= inject(Router)

  monsters = signal<MonsterModule[]>([]);
  /* count: number = 0;
  search: string = ''; */
  search: ModelSignal<string> = model('');
  filterMonsters: Signal<MonsterModule[]> = computed((): MonsterModule[] => {
    return this.monsters().filter((monster) =>
      monster.name.includes(this.search())
    );
  });

  selectedMonsterIndex: WritableSignal<number> = signal(0);
  selectedMonster: Signal<MonsterModule> = computed(() => {
    return this.monsters()[this.selectedMonsterIndex()];
  });
  constructor() {
    /* effect(() => {
      console.log(this.selectedMonster());
    }); */
    this.monsters.set(this.monsterService.getAll());
  }
  addMonster() {
    /* const genericMonster = new MonsterModule();
    this.monsterService.add(genericMonster);
    this.monsters.set(this.monsterService.getAll()); */
    this.router.navigate(['monster'])
  }

  /* increaseCount() {
    this.count++;
  }

  toggleMonster() {
    this.selectedMonsterIndex.set(
      (this.selectedMonsterIndex() + 1) % this.monsters.length
    );
  } */

  openMonster(monster: MonsterModule) {
    this.router.navigate(['monster', monster.id])
  }

}
