import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBookCategoryComponent } from './delete-book-category.component';

describe('DeleteBookCategoryComponent', () => {
  let component: DeleteBookCategoryComponent;
  let fixture: ComponentFixture<DeleteBookCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteBookCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteBookCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
