import { Component } from '@angular/core';

@Component({
  selector: 'app-activiti',
  templateUrl: './activiti.component.html',
  styleUrls: ['./activiti.component.scss']
})
export class ActivitiComponent {
  activities = [
    {
      image: 'https://fangfang.edu.vn/wp-content/uploads/2023/12/1-2.jpg',
    },
    {
      image: 'https://fangfang.edu.vn/wp-content/uploads/2023/12/1-2.jpg',
    },
    {
      image: 'https://fangfang.edu.vn/wp-content/uploads/2023/12/1-2.jpg',
    },
    {
      image: 'https://fangfang.edu.vn/wp-content/uploads/2023/12/1-2.jpg',
    },
    {
      image: 'https://fangfang.edu.vn/wp-content/uploads/2023/12/1-2.jpg',
    },
    {
      image: 'https://fangfang.edu.vn/wp-content/uploads/2023/12/1-2.jpg',
    }
  ];
  currentIndex = 0;

  get totalSlides() {
    return Math.ceil(this.activities.length / 3);
  }

  prev() {
    this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.totalSlides - 1;
  }

  next() {
    this.currentIndex = this.currentIndex < this.totalSlides - 1 ? this.currentIndex + 1 : 0;
  }

  setCurrentSlide(index: number) {
    this.currentIndex = index;
  }
}
