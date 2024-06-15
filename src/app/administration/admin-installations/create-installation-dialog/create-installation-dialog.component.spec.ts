import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInstallationDialogComponent } from './create-installation-dialog.component';

describe('CreateInstallationDialogComponent', () => {
  let component: CreateInstallationDialogComponent;
  let fixture: ComponentFixture<CreateInstallationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateInstallationDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateInstallationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
