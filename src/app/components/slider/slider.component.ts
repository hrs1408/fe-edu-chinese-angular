import { Component, OnInit, OnDestroy } from '@angular/core';

interface Slide {
  image: string;
  title: string;
  description: string;
  primaryLink: string;
  secondaryLink: string;
}

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit, OnDestroy {
  slides: Slide[] = [
    {
      image: '../../../assets/logo/banner-1.png',
      title: 'Đại Học Ngoại Ngữ Ngoại Thương Quảng Đông',
      description: 'Đào tạo nhân tài chất lượng cao, đa ngành nghề với tầm nhìn quốc tế',
      primaryLink: '#',
      secondaryLink: '#'
    },
    {
      image: '../../../assets/logo/banner-1.png',
      title: 'Khuôn Viên Xanh',
      description: 'Môi trường học tập hiện đại, năng động và sáng tạo',
      primaryLink: '#',
      secondaryLink: '#'
    }
  ];

  currentSlide = 0;
  private autoSlideInterval: any;
  private readonly AUTO_SLIDE_INTERVAL = 8000; // 8 seconds for better viewing experience

  ngOnInit() {
    this.startAutoSlide();
  }

  ngOnDestroy() {
    this.stopAutoSlide();
  }

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, this.AUTO_SLIDE_INTERVAL);
  }

  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  resetAutoSlide() {
    this.stopAutoSlide();
    this.startAutoSlide();
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.resetAutoSlide();
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.resetAutoSlide();
  }

  goToSlide(index: number) {
    this.currentSlide = index;
    this.resetAutoSlide();
  }
}
