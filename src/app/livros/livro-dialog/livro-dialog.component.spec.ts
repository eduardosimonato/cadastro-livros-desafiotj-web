import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivroDialogComponent } from './livro-dialog.component';

describe('LivroDialogComponent', () => {
  let component: LivroDialogComponent;
  let fixture: ComponentFixture<LivroDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LivroDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LivroDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
