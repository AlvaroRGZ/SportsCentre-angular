import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportClassesComponent } from './sport-classes.component';

describe('SportClassesComponent', () => {
  let component: SportClassesComponent;
  let fixture: ComponentFixture<SportClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SportClassesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SportClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
