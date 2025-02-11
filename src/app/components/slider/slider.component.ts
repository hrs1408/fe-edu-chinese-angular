import { Component, OnInit, OnDestroy } from '@angular/core';
import { SliderService } from './slider.service';
interface Slide {
  image: any;
  title: string;
  description: string;
  primaryLink: string;
  secondaryLink: string;
}

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit, OnDestroy {
  slides: Slide[] = [];

  currentSlide = 0;
  private autoSlideInterval: any;
  private readonly AUTO_SLIDE_INTERVAL = 8000; // 8 seconds for better viewing experience

  constructor(private sliderService: SliderService) {}

  ngOnInit() {
    this.getBanners();
    this.startAutoSlide();
  }

  ngOnDestroy() {
    this.stopAutoSlide();
  }

  getBanners() {
    this.sliderService.getBanners().subscribe((banners) => {
      this.slides = banners.data;
      console.log(this.slides);
    });
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
    this.currentSlide =
      (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.resetAutoSlide();
  }

  goToSlide(index: number) {
    this.currentSlide = index;
    this.resetAutoSlide();
  }
}
