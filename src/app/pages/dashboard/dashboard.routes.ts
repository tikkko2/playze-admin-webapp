import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'news',
        loadComponent: () =>
          import('../news/news.component').then((m) => m.NewsComponent),
      },
      { path: '', redirectTo: 'news', pathMatch: 'full' },
    ],
  },
];
