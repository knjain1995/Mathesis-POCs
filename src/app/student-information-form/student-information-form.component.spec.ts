import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentInformationFormComponent } from './student-information-form.component';

describe('StudentInformationFormComponent', () => {
  let component: StudentInformationFormComponent;
  let fixture: ComponentFixture<StudentInformationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentInformationFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentInformationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
