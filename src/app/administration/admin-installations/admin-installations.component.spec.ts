import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInstallationsComponent } from './admin-installations.component';

describe('AdminInstallationsComponent', () => {
  let component: AdminInstallationsComponent;
  let fixture: ComponentFixture<AdminInstallationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminInstallationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminInstallationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
