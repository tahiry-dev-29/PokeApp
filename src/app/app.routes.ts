import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MonsterListComponent } from './pages/monster-list/monster-list.component';
import { Routes } from '@angular/router';
import { MonsterComponent } from './pages/monster/monster.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    title: 'Home',
    component: MonsterListComponent,
  },
  {
    path: 'monster',

    children: [
      {
        path: '',
        title: 'Add Monster',
        component: MonsterComponent,
      },
      {
        path: ':id',
        title: 'Edit Monster',
        component: MonsterComponent,
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
