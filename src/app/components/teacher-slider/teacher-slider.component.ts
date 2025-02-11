import { Component, OnInit, OnDestroy } from '@angular/core';
import { TeacherSliderService } from './teacher-slider.service';

@Component({
  selector: 'app-teacher-slider',
  templateUrl: './teacher-slider.component.html',
  styleUrls: ['./teacher-slider.component.scss']
})
export class TeacherSliderComponent implements OnInit, OnDestroy {
  teachers: any[] = [];

  currentIndex = 2;
  title = 'NHÂN VẬT';
  showTooltip = false;
  private autoSlideInterval: any;

  constructor(private teacherSliderService: TeacherSliderService) {}

  ngOnInit() {
    this.getTeachers();
    this.startAutoSlide();
  }


  ngOnDestroy() {
    this.stopAutoSlide();
  }

  getTeachers() {
    this.teacherSliderService.getTeachers().subscribe((teachers) => {
      this.teachers = teachers.data;
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
    this.autoSlideInterval = setInterval(() => {
      this.next();
    }, 5000);
  }

  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.teachers.length) % this.teachers.length;
    this.showTooltip = false;
    this.resetAutoSlide();
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.teachers.length;
    this.showTooltip = false;
    this.resetAutoSlide();
  }

  resetAutoSlide() {
    this.stopAutoSlide();
    this.startAutoSlide();
  }
}
