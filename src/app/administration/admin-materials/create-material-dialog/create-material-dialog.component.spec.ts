import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMaterialDialogComponent } from './create-material-dialog.component';

describe('CreateMaterialDialogComponent', () => {
  let component: CreateMaterialDialogComponent;
  let fixture: ComponentFixture<CreateMaterialDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateMaterialDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateMaterialDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
