import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivityService } from 'src/app/services/activity.service';
import { Activity } from 'src/app/models/activity.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

Swiper.use([Navigation, Pagination, Autoplay]);

@Component({
  selector: 'app-activiti',
  templateUrl: './activiti.component.html',
  styleUrls: ['./activiti.component.scss']
})
export class ActivitiComponent implements OnInit, OnDestroy {
  activities: Activity[] = [];
  private destroy$ = new Subject<void>();
  isLoading = false;
  error: string | null = null;
  swiper?: Swiper;

  constructor(private activityService: ActivityService) {}

  ngOnInit(): void {
    this.loadActivities();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.swiper) {
      this.swiper.destroy();
    }
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
          this.initSwiper();
        },
        error: (error) => {
          console.error('Error loading activities:', error);
          this.error = 'Không thể tải dữ liệu hoạt động. Vui lòng thử lại sau.';
          this.isLoading = false;
        }
      });
  }

  private initSwiper() {
    setTimeout(() => {
      this.swiper = new Swiper('.activities-slider', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        centeredSlides: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        },
      });
    });
  }

  getImageUrl(activity: Activity): string {
    if (!activity.drive_id) return 'assets/images/activity-placeholder.jpg';
    return `https://lh3.googleusercontent.com/d/${activity.drive_id}`;
  }
}
