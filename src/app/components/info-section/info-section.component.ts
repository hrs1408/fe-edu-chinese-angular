import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { InfoService } from './info.service';
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
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;
  categoriesCourse: any[] = [];
  courses: string[] = [];
  studyTypes: string[] = ['Học online', 'Học offline', 'Học 1 kèm 1'];

  constructor(
    private readonly fb: FormBuilder,
    private readonly http: HttpClient,
    private readonly infoService: InfoService
  ) {
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
    this.getCategoriesCourse();
  }

  getCategoriesCourse() {
    this.infoService.getCategoriesCourseById(20).subscribe((categories) => {
      this.categoriesCourse = categories.data;
      this.courses = this.categoriesCourse.map((category) => category.ct_name);
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isSubmitting = true;
      this.submitSuccess = false;
      this.submitError = false;

      const formData = new FormData();

      // Map form fields to Google Form fields
      formData.append('entry.1916054590', this.registerForm.value.fullName);
      formData.append('entry.122846010', this.registerForm.value.birthYear);
      formData.append('entry.1875805140', this.registerForm.value.phone);
      formData.append('entry.1342236707', this.registerForm.value.zalo || '');
      formData.append('entry.1689425395', this.registerForm.value.email);
      formData.append('entry.841802827', this.registerForm.value.course);
      formData.append('entry.1596932414', this.registerForm.value.studyType);

      // Gửi form đến Google Forms
      this.http
        .post(
          'https://docs.google.com/forms/d/e/1FAIpQLSdpnQQFsX2D9HQcVVuFjlQnmilykFvMV-lv9j9dE9DsM1J9Tw/formResponse',
          formData
        )
        .subscribe({
          next: () => {
            this.submitSuccess = true;
            this.isSubmitting = false;
          },
          error: () => {
            this.submitSuccess = true;
            this.isSubmitting = false;
            this.registerForm.reset();
            this.registerForm.patchValue({
              fullName: '',
              birthYear: '',
              phone: '',
              zalo: '',
              email: '',
              course: this.courses[0],
              studyType: this.studyTypes[0],
            });
          },
          complete: () => {
            this.registerForm.reset();
            this.isSubmitting = false;
          }
        });
    }
  }
}
