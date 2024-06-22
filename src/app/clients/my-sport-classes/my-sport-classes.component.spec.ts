import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySportClassesComponent } from './my-sport-classes.component';

describe('MySportClassesComponent', () => {
  let component: MySportClassesComponent;
  let fixture: ComponentFixture<MySportClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MySportClassesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MySportClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
