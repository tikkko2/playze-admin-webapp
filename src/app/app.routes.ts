import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './core/guards/auth.gurad';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { NewsComponent } from './pages/news/news.component';

export const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES),
    canActivate: [AuthGuard]
  },
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
];
