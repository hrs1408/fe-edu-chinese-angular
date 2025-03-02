import { Component, OnInit, OnDestroy } from '@angular/core';
import { TeacherSliderService } from './teacher-slider.service';
import { Teacher } from '../../models/teacher.model';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-teacher-slider',
  templateUrl: './teacher-slider.component.html',
  styleUrls: ['./teacher-slider.component.scss']
})
export class TeacherSliderComponent implements OnInit, OnDestroy {
  teachers: Teacher[] = [];
  isLoading = false;
  error: string | null = null;

  currentIndex = 0;
  title = 'NHÂN VẬT';
  showTooltip = false;
  isAnimating = false;
  private autoSlideInterval: number | null = null;
  private readonly AUTO_SLIDE_DELAY = 8000; // 8 giây

  constructor(private teacherSliderService: TeacherSliderService) {}

  ngOnInit() {
    this.getTeachers();
  }

  ngOnDestroy() {
    this.stopAutoSlide();
  }

  getTeachers() {
    this.isLoading = true;
    this.error = null;

    this.teacherSliderService.getTeachers()
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (response) => {
          if (!response.meta.error) {
            this.teachers = response.data;
            if (this.teachers.length > 1) {
              this.startAutoSlide();
            }
          } else {
            this.error = response.meta.message || 'Có lỗi xảy ra khi tải danh sách giảng viên';
          }
        },
        error: (error) => {
          console.error('Error loading teachers:', error);
          this.error = 'Không thể tải danh sách giảng viên. Vui lòng thử lại sau.';
        }
      });
  }

  onDescriptionHover(isHovering: boolean) {
    this.showTooltip = isHovering;
    if (isHovering) {
      this.stopAutoSlide();
    } else {
      this.startAutoSlide();
    }
  }

  startAutoSlide() {
    if (this.autoSlideInterval) {
      this.stopAutoSlide();
    }

    if (this.teachers.length > 1 && !this.showTooltip) {
      this.autoSlideInterval = window.setInterval(() => {
        if (!this.isAnimating && !this.showTooltip) {
          this.next();
        }
      }, this.AUTO_SLIDE_DELAY);
    }
  }

  stopAutoSlide() {
    if (this.autoSlideInterval) {
      window.clearInterval(this.autoSlideInterval);
      this.autoSlideInterval = null;
    }
  }

  prev() {
    if (this.teachers.length > 0 && !this.isAnimating) {
      this.isAnimating = true;
      this.currentIndex = (this.currentIndex - 1 + this.teachers.length) % this.teachers.length;
      this.showTooltip = false;

      // Đợi animation hoàn thành
      setTimeout(() => {
        this.isAnimating = false;
      }, 500); // Thời gian bằng với thời gian transition trong CSS

      this.resetAutoSlide();
    }
  }

  next() {
    if (this.teachers.length > 0 && !this.isAnimating) {
      this.isAnimating = true;
      this.currentIndex = (this.currentIndex + 1) % this.teachers.length;
      this.showTooltip = false;

      // Đợi animation hoàn thành
      setTimeout(() => {
        this.isAnimating = false;
      }, 500); // Thời gian bằng với thời gian transition trong CSS

      this.resetAutoSlide();
    }
  }

  resetAutoSlide() {
    if (!this.showTooltip) {
      this.startAutoSlide();
    }
  }

  getImageUrl(teacher: Teacher): string {
    if (!teacher.image?.drive_id) return 'https://png.pngtree.com/png-clipart/20230913/original/pngtree-picture-of-a-teacher-vector-png-image_11078651.png';
    return `https://lh3.googleusercontent.com/d/${teacher.image.drive_id}`;
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img) {
      img.src = 'https://png.pngtree.com/png-clipart/20230913/original/pngtree-picture-of-a-teacher-vector-png-image_11078651.png';
    }
  }

  isActive(index: number): boolean {
    return index === this.currentIndex;
  }

  isPrev(index: number): boolean {
    return index === (this.currentIndex - 1 + this.teachers.length) % this.teachers.length;
  }

  isNext(index: number): boolean {
    return index === (this.currentIndex + 1) % this.teachers.length;
  }
}
