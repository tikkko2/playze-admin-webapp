import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostListener } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  isDropdownOpen = false;

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) {}

  logout() {
    this._authService.signOut();
    this._router.navigate(['/sign-in'])
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const dropdownButton = document.getElementById('user-menu-button');
    const dropdownMenu = document.getElementById('user-dropdown');

    if (dropdownButton && dropdownMenu) {
      if (!dropdownButton.contains(event.target as Node) && !dropdownMenu.contains(event.target as Node)) {
        this.isDropdownOpen = false;
      }
    }
  }
}
