import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentInformationDashboardComponent } from './student-information-dashboard.component';

describe('StudentInformationDashboardComponent', () => {
  let component: StudentInformationDashboardComponent;
  let fixture: ComponentFixture<StudentInformationDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentInformationDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentInformationDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
