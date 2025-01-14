import { Component, OnInit, OnDestroy } from '@angular/core';

interface Teacher {
  id: number;
  name: string;
  image: string;
  description?: string;
}

@Component({
  selector: 'app-teacher-slider',
  templateUrl: './teacher-slider.component.html',
  styleUrls: ['./teacher-slider.component.scss']
})
export class TeacherSliderComponent implements OnInit, OnDestroy {
  teachers: Teacher[] = [
    {
      id: 1,
      name: 'Đặng Phước Bảo Bảo',
      image: '../../../assets/image.png',
      description: 'Nghiên Cứu sinh Thạc sĩ Đặng Phước Bảo Bảo Thạc Sĩ Đặng Phước Bảo Bảo với hơn nhiều năm kinh dạy học và đồng thời là người sáng lập ra Trung Tâm Tiếng Trung Dengfu , và cũng là giáo viên chính trong đội ngũ Giảng Viện tại Trung tâm .Có gần 4 năm sinh sống và học tập tại Trung Quốc . Tốt nghiệp loại xuất sắc 3.93/4.0 hệ Đại Học ở Quảng Châu và là nghiên cứu sinh Thạc Sĩ tại Quảng châu .'
    },
    {
      id: 2,
      name: 'Đặng Phước Bảo Bảo',
      image: '../../../assets/image.png',
      description: 'Nghiên Cứu sinh Thạc sĩ Đặng Phước Bảo Bảo Thạc Sĩ Đặng Phước Bảo Bảo với hơn nhiều năm kinh dạy học và đồng thời là người sáng lập ra Trung Tâm Tiếng Trung Dengfu , và cũng là giáo viên chính trong đội ngũ Giảng Viện tại Trung tâm .Có gần 4 năm sinh sống và học tập tại Trung Quốc . Tốt nghiệp loại xuất sắc 3.93/4.0 hệ Đại Học ở Quảng Châu và là nghiên cứu sinh Thạc Sĩ tại Quảng châu .'
    },
    {
      id: 3,
      name: 'Đặng Phước Bảo Bảo',
      image: '../../../assets/image.png',
      description: 'Nghiên Cứu sinh Thạc sĩ Đặng Phước Bảo Bảo Thạc Sĩ Đặng Phước Bảo Bảo với hơn nhiều năm kinh dạy học và đồng thời là người sáng lập ra Trung Tâm Tiếng Trung Dengfu , và cũng là giáo viên chính trong đội ngũ Giảng Viện tại Trung tâm .Có gần 4 năm sinh sống và học tập tại Trung Quốc . Tốt nghiệp loại xuất sắc 3.93/4.0 hệ Đại Học ở Quảng Châu và là nghiên cứu sinh Thạc Sĩ tại Quảng châu .'
    },
    {
      id: 4,
      name: 'Đặng Phước Bảo Bảo',
      image: '../../../assets/image.png',
      description: 'Nghiên Cứu sinh Thạc sĩ Đặng Phước Bảo Bảo Thạc Sĩ Đặng Phước Bảo Bảo với hơn nhiều năm kinh dạy học và đồng thời là người sáng lập ra Trung Tâm Tiếng Trung Dengfu , và cũng là giáo viên chính trong đội ngũ Giảng Viện tại Trung tâm .Có gần 4 năm sinh sống và học tập tại Trung Quốc . Tốt nghiệp loại xuất sắc 3.93/4.0 hệ Đại Học ở Quảng Châu và là nghiên cứu sinh Thạc Sĩ tại Quảng châu .'
    }
  ];

  currentIndex = 2;
  title = 'NHÂN VẬT';
  showTooltip = false;
  private autoSlideInterval: any;

  ngOnInit() {
    this.startAutoSlide();
  }

  ngOnDestroy() {
    this.stopAutoSlide();
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
