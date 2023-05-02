export class BookCategoryDto {
  bookCategoryID: any;
  subCategory: any;
  description: any;

  // @ts-ignore
  constructor(bookCategoryDTO?) {
    bookCategoryDTO = bookCategoryDTO || {};

    this.bookCategoryID = bookCategoryDTO.bookCategoryID || '';
    this.subCategory = bookCategoryDTO.subCategory || '';
    this.description = bookCategoryDTO.description || '';
  }
}
