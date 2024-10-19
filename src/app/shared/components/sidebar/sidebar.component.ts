import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  NavigationModel,
  NavigationService,
} from '../../../core/services/navigation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  public navigation$ = this.navigationService.navigation;
  public selectedItem$ = this.navigationService.selectedItem;

  constructor(
    private navigationService: NavigationService,
    private router: Router
  ) {}

  onSelectItem(item: NavigationModel, event: Event) {
    event.stopPropagation();
    this.navigationService.selectItem(item);

    if (item.navigate) {
      this.router.navigate([item.navigate]);
    }
  }
}
