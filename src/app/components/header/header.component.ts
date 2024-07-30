import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  searchId: string = ''; // Initialize searchId

  constructor(private router: Router) {}

  onKeyUp(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.onSearch();
    }
  }

  onSearch(): void {
    if (this.searchId) {
      this.router.navigate(['/student', this.searchId]);
    } else {
      this.router.navigate(['/']);
    }
  }

  onSearchClick(): void {
    this.onSearch();
  }
}
