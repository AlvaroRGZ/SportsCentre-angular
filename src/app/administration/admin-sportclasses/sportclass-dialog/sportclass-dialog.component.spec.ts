import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportclassDialogComponent } from './sportclass-dialog.component';

describe('SportclassDialogComponent', () => {
  let component: SportclassDialogComponent;
  let fixture: ComponentFixture<SportclassDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SportclassDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SportclassDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
