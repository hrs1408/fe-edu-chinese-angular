import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface NewsItem {
  text: string;
  textEn?: string;
  date: string;
  link?: string;
}

@Component({
  selector: 'app-info-section',
  templateUrl: './info-section.component.html',
  styleUrls: ['./info-section.component.scss'],
})
export class InfoSectionComponent implements OnInit {
  registerForm: FormGroup;
  currentMonth: number;
  courses: string[] = [
    'Tiếng Trung cơ bản',
    'Tiếng Trung nâng cao',
    'Tiếng Trung giao tiếp',
    'Tiếng Trung thương mại',
  ];
  studyTypes: string[] = ['Học online', 'Học offline', 'Học 1 kèm 1'];

  constructor(private readonly fb: FormBuilder) {
    this.currentMonth = new Date().getMonth() + 1;
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      birthYear: ['', Validators.required],
      phone: ['', Validators.required],
      zalo: [''],
      email: ['', [Validators.required, Validators.email]],
      course: ['', Validators.required],
      studyType: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    //
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
    }
  }
}
