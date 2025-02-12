import { Component, OnInit } from '@angular/core';
import { ActivityService } from 'src/app/services/activity.service';
import { Activity } from 'src/app/models/activity.model';

@Component({
  selector: 'app-activiti',
  templateUrl: './activiti.component.html',
  styleUrls: ['./activiti.component.scss']
})
export class ActivitiComponent implements OnInit {
  activities: any[] = [];
  currentIndex = 0;

  constructor(private activityService: ActivityService) {}

  ngOnInit(): void {
    this.loadActivities();
  }

  loadActivities() {
    this.activityService.getActivities().subscribe({
      next: (data:any) => {
        this.activities = data.data;
      },
      error: (error) => {
        console.error('Error loading activities:', error);
      }
    });
  }

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
