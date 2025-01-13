import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isHeaderSticky = false;
  private readonly STICKY_THRESHOLD = 100; // Pixels to scroll before header becomes sticky

  constructor() { }

  ngOnInit(): void {
    // Check initial scroll position
    this.checkScroll();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkScroll();
  }

  private checkScroll() {
    this.isHeaderSticky = window.pageYOffset > this.STICKY_THRESHOLD;
  }

  toggleSearch() {
    // Implement search functionality
  }
}
