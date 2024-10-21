import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'announcement',
        loadComponent: () =>
          import('../announcement/announcement.component').then(
            (m) => m.AnnouncementComponent
          ),
      },
      {
        path: 'types',
        loadComponent: () =>
          import('../types/types.component').then(
            (m) => m.TypesComponent
          ),
      },
      {
        path: 'user',
        loadComponent: () =>
          import('../user/user.component').then(
            (m) => m.UserComponent
          ),
      },
      { path: '', redirectTo: '/dashboard/user', pathMatch: 'full' },
    ],
  },
];
