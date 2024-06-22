import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportClassDetailsComponent } from './sport-class-details.component';

describe('SportClassDetailsComponent', () => {
  let component: SportClassDetailsComponent;
  let fixture: ComponentFixture<SportClassDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SportClassDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SportClassDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
