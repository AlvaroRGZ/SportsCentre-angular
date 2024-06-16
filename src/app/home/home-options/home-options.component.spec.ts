import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeOptionsComponent } from './home-options.component';

describe('HomeOptionsComponent', () => {
  let component: HomeOptionsComponent;
  let fixture: ComponentFixture<HomeOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeOptionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
