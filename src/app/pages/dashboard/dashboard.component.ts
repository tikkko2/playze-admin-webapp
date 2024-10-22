import { Component, inject } from '@angular/core';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { SidebarComponent } from "../../shared/components/sidebar/sidebar.component";
import { RouterOutlet } from '@angular/router';
import { NavigationService } from '../../core/services/navigation.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  public sidebarService = inject(NavigationService);
}
