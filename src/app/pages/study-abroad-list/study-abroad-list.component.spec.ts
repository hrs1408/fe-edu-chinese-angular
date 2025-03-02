import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyAbroadListComponent } from './study-abroad-list.component';

describe('StudyAbroadListComponent', () => {
  let component: StudyAbroadListComponent;
  let fixture: ComponentFixture<StudyAbroadListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudyAbroadListComponent]
    });
    fixture = TestBed.createComponent(StudyAbroadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
