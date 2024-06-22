import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSportclassesComponent } from './admin-sportclasses.component';

describe('AdminSportclassesComponent', () => {
  let component: AdminSportclassesComponent;
  let fixture: ComponentFixture<AdminSportclassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSportclassesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminSportclassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
