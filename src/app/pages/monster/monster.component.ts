import { MatInputModule } from '@angular/material/input';
import { MaterialModule } from './../../modules/material/material.module';
import { Subscription } from 'rxjs';
import {
  Component,
  OnDestroy,
  OnInit,
  computed,
  inject,
  input,
  output,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MonsterType } from '../../utils/monster.utils';
import { PlayingCardComponent } from '../../components/playing-card/playing-card.component';
import { MonsterModule } from '../../modules/monster/monster.module';
import { MonsterService } from '../../services/monster/monster.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteMonsterDialogueComponent } from '../../components/delete-monster-dialogue/delete-monster-dialogue.component';

@Component({
  selector: 'app-monster',
  standalone: true,
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    MaterialModule,
    PlayingCardComponent,
  ],
  templateUrl: './monster.component.html',
  styleUrl: './monster.component.scss',
})
export class MonsterComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private monsterService = inject(MonsterService);
  readonly #dialog = inject(MatDialog);

  /*   name = new FormControl('', [Validators.required]);
   hp = new FormControl(0, [Validators.required, Validators.min(1), Validators.max(200)]); */
  private routeSubscription: Subscription | null = null;
  private formValueSubscription: Subscription | null = null;

  // formGroup = new FormGroup({
  formGroup = this.fb.group({
    name: ['', [Validators.required]],
    image: ['', [Validators.required]],
    type: [MonsterType.ELELCTRIC, [Validators.required]],
    hp: [50, [Validators.required, Validators.min(50), Validators.max(200)]],
    figureCaption: ['', [Validators.required]],
    attackName: ['', [Validators.required]],
    attackStrength: [
      20,
      [Validators.required, Validators.min(20), Validators.max(100)],
    ],
    attackDescription: ['', [Validators.required]],
  });

  monster: MonsterModule = Object.assign(
    new MonsterModule(),
    this.formGroup.value
  );

  monsterTypes: MonsterType[] = Object.values(MonsterType);
  // monsterId = signal<number | undefined>(undefined);
  monsterId: number = -1;

  ngOnInit(): void {
    this.formValueSubscription = this.formGroup.valueChanges.subscribe(
      (data) => {
        this.monster = Object.assign(new MonsterModule(), data);
      }
    );

    // const params = this.route.snapshot.params;
    this.routeSubscription = this.route.params.subscribe((params) => {
      // this.monsterId.set(params['id'] ? parseInt(params['id']) : undefined);
      if (params['id']) {
        this.monsterId = parseInt(params['id']);
        const monsterFound = this.monsterService.get(this.monsterId);
        if (monsterFound) {
          this.monster = monsterFound;
          this.formGroup.patchValue(this.monster);
        }
      }
    });
  }
  ngOnDestroy(): void {
    this.formValueSubscription?.unsubscribe();
    this.routeSubscription?.unsubscribe();
  }
  /*  next() {
    let nextId = this.monsterId() || 0;
    nextId++;
    this.router.navigate(['/monster/' + nextId])
  } */

  isFiledValid(name: string) {
    const formControl = this.formGroup.get(name);
    return formControl?.invalid && (formControl?.dirty || formControl?.touched);
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.formGroup.patchValue({
          image: reader.result as string,
        });
      };
    }
  }

  navigateBack() {
    this.router.navigate(['home']);
  }

  submit(event: Event) {
    event.preventDefault();
    if (this.monsterId === -1) {
      this.monsterService.add(this.monster);
    } else {
      this.monster.id = this.monsterId;
      this.monsterService.update(this.monster);
    }
    this.navigateBack();
  }

  deleteMonster() {
    const dialogRef = this.#dialog.open(DeleteMonsterDialogueComponent);
    dialogRef.afterClosed().subscribe((confirmation) => {
      if (confirmation) {
        this.monsterService.delete(this.monsterId);
        this.navigateBack();
      }
    });
  }
}
