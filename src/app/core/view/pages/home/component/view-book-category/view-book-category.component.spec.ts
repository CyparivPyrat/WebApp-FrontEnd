import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBookCategoryComponent } from './view-book-category.component';

describe('ViewBookCategoryComponent', () => {
  let component: ViewBookCategoryComponent;
  let fixture: ComponentFixture<ViewBookCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewBookCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewBookCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
