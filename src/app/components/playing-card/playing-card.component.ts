import { CommonModule } from '@angular/common';
import {
  Component,
  InputSignal,
  Signal,
  computed,
  input,
} from '@angular/core';
import { MonsterModule } from './../../modules/monster/monster.module';
import { MaterialModule } from '../../modules/material/material.module';
import { MonsterTypeProperties } from '../../utils/monster.utils';

@Component({
  selector: 'app-playing-card',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './playing-card.component.html',
  styleUrl: './playing-card.component.scss',
})
export class PlayingCardComponent {
  // @Input({ alias: 'my-monster' }) monster: MonsterModule = new MonsterModule();
  monster: InputSignal<MonsterModule> = input(new MonsterModule(), {
    alias: 'my-monster'
  });
  // monsterTypeIcon: string = 'assets/images/electro.png';
  monsterTypeIcon:Signal<string> = computed(() => {
    return MonsterTypeProperties[this.monster().type].imageUrl;
  });
  // backgroundColor: string = '$card-background-color';
  backgroundColor: Signal<string> = computed(() => {
    return MonsterTypeProperties[this.monster().type].color
  });

  /* ngOnChanges(changes: SimpleChanges): void {
    if (changes['monster']) {
      if (
        changes['monster'].previousValue?.type !=
        changes['monster'].currentValue.type
      ) {
        this.monsterTypeIcon =
          MonsterTypeProperties[this.monster().type].imageUrl;
        this.backgroundColor = MonsterTypeProperties[this.monster().type].color;
      }
    }
  } */
}
