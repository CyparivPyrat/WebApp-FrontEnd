import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewBookCategoryComponent } from './add-new-book-category.component';

describe('AddNewBookCategoryComponent', () => {
  let component: AddNewBookCategoryComponent;
  let fixture: ComponentFixture<AddNewBookCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewBookCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewBookCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
