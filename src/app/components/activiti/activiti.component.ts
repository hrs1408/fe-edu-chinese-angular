import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ActivityService } from 'src/app/services/activity.service';
import { Activity } from 'src/app/models/activity.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-activiti',
  templateUrl: './activiti.component.html',
  styleUrls: ['./activiti.component.scss']
})
export class ActivitiComponent implements OnInit, OnDestroy {
  activities: Activity[] = [];
  currentIndex = 0;
  private destroy$ = new Subject<void>();
  private autoPlayInterval: any;
  isLoading = false;
  error: string | null = null;
  slidesPerView = 3;

  constructor(private activityService: ActivityService) {
    this.checkScreenSize();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    const width = window.innerWidth;
    if (width <= 768) {
      this.slidesPerView = 1;
    } else if (width <= 1200) {
      this.slidesPerView = 2;
    } else {
      this.slidesPerView = 3;
    }
  }

  ngOnInit(): void {
    this.loadActivities();
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.stopAutoPlay();
  }

  private loadActivities() {
    this.isLoading = true;
    this.error = null;

    this.activityService.getActivities()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.activities = data.data;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading activities:', error);
          this.error = 'Không thể tải dữ liệu hoạt động. Vui lòng thử lại sau.';
          this.isLoading = false;
        }
      });
  }

  get totalSlides(): number {
    if (!this.activities.length) return 0;
    return Math.ceil(this.activities.length / this.slidesPerView);
  }

  get slideStyle() {
    const width = this.slidesPerView === 1
      ? '100%'
      : `${(this.activities.length * 100) / this.slidesPerView}%`;

    return {
      transform: `translateX(-${this.currentIndex * (100 / this.slidesPerView)}%)`,
      transition: 'transform 0.5s ease-in-out',
      width: width,
      display: 'flex'
    };
  }

  prev(): void {
    if (this.totalSlides <= 1) return;
    this.stopAutoPlay();
    this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.totalSlides - 1;
    this.startAutoPlay();
  }

  next(): void {
    if (this.totalSlides <= 1) return;
    this.stopAutoPlay();
    this.currentIndex = this.currentIndex < this.totalSlides - 1 ? this.currentIndex + 1 : 0;
    this.startAutoPlay();
  }

  setCurrentSlide(index: number): void {
    if (index < 0 || index >= this.totalSlides) return;
    this.stopAutoPlay();
    this.currentIndex = index;
    this.startAutoPlay();
  }

  private startAutoPlay(): void {
    this.stopAutoPlay();
    if (this.totalSlides <= 1) return;
    this.autoPlayInterval = setInterval(() => {
      this.next();
    }, 5000);
  }

  private stopAutoPlay(): void {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  trackByFn(index: number, item: Activity): number {
    return item.id || index;
  }

  getDots(): number[] {
    return Array(this.totalSlides).fill(0).map((_, i) => i);
  }

  // Touch events
  touchStartX: number = 0;
  touchEndX: number = 0;

  onTouchStart(event: TouchEvent): void {
    this.stopAutoPlay();
    this.touchStartX = event.touches[0].clientX;
  }

  onTouchMove(event: TouchEvent): void {
    this.touchEndX = event.touches[0].clientX;
  }

  onTouchEnd(): void {
    const SWIPE_THRESHOLD = 50;
    const diff = this.touchStartX - this.touchEndX;

    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      if (diff > 0) {
        this.next();
      } else {
        this.prev();
      }
    }
    this.startAutoPlay();
  }

  isActiveDot(index: number): boolean {
    return this.currentIndex === index;
  }
}
