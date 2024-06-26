import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNoticesComponent } from './admin-notices.component';

describe('AdminNoticesComponent', () => {
  let component: AdminNoticesComponent;
  let fixture: ComponentFixture<AdminNoticesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminNoticesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminNoticesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
