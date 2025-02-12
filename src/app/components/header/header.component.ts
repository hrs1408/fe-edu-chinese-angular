import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { HeaderService } from './header.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isHeaderSticky: boolean = false;
  isMobileMenuOpen: boolean = false;
  isCourseMenuOpen: boolean = false;
  isDuHocMenuOpen: boolean = false;
  isDocMenuOpen: boolean = false;
  categoriesCourse: any[] = [];
  categoriesDocument: any[] = [];
  categoriesIntruction: any[] = [];
  categoriesDuHoc: any[] = [];
  private readonly STICKY_THRESHOLD = 100; // Pixels to scroll before header becomes sticky

  constructor(private headerService: HeaderService) { }

  ngOnInit(): void {
    // Check initial scroll position
    this.checkScroll();
    this.getCategoriesCourse();
    this.getCategoriesDocument();
    this.getCategoriesIntruction();
    this.getCategoriesDuHoc();
  }

  getCategoriesCourse() {
    this.headerService.getCategoriesCourseById(20).subscribe((categories) => {
      this.categoriesCourse = categories.data;
    });
  }

  getCategoriesDocument() {
    this.headerService.getCategoriesCourseById(30).subscribe((categories) => {
      this.categoriesDocument = categories.data;
    });
  }

  getCategoriesIntruction() {
    this.headerService.getCategoriesCourseById(40).subscribe((categories) => {
      this.categoriesIntruction = categories.data;
    });
  }

  getCategoriesDuHoc() {
    this.headerService.getCategoriesCourseById(50).subscribe((categories) => {
      this.categoriesDuHoc = categories.data;
    });
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

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (this.isMobileMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      this.closeAllDropdowns();
      document.body.classList.remove('menu-open');
    }
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    this.closeAllDropdowns();
    document.body.classList.remove('menu-open');
  }

  private closeAllDropdowns() {
    this.isCourseMenuOpen = false;
    this.isDuHocMenuOpen = false;
    this.isDocMenuOpen = false;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (window.innerWidth > 992 && this.isMobileMenuOpen) {
      this.closeMobileMenu();
    }
  }

  ngOnDestroy() {
    document.body.classList.remove('menu-open');
  }
}
