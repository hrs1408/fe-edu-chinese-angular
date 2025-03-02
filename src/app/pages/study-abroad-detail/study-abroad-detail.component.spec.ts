import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyAbroadDetailComponent } from './study-abroad-detail.component';

describe('StudyAbroadDetailComponent', () => {
  let component: StudyAbroadDetailComponent;
  let fixture: ComponentFixture<StudyAbroadDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudyAbroadDetailComponent]
    });
    fixture = TestBed.createComponent(StudyAbroadDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
