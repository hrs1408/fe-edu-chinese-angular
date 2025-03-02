import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { HeaderService } from './header.service';
import { Subject, forkJoin } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
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
    this.loadAllCategories();
  }

  private loadAllCategories(): void {
    forkJoin({
      course: this.headerService.getCategoriesCourseById(20),
      document: this.headerService.getCategoriesCourseById(30),
      instruction: this.headerService.getCategoriesCourseById(40),
      duHoc: this.headerService.getCategoriesCourseById(50)
    }).pipe(
      takeUntil(this.destroy$)
    ).subscribe(result => {
      this.categoriesCourse = result.course.data;
      this.categoriesDocument = result.document.data;
      this.categoriesIntruction = result.instruction.data;
      this.categoriesDuHoc = result.duHoc.data;
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
    this.destroy$.next();
    this.destroy$.complete();
    document.body.classList.remove('menu-open');
  }
}
