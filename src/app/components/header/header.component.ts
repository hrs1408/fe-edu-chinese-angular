import { Component, OnInit, HostListener } from '@angular/core';
import { HeaderService } from './header.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isHeaderSticky = false;
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
}
