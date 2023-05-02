export class BookDto {
  bookID: any;
  bookCategoryID: any;
  title: any;
  author: any;
  noOfCopies: any;
  language: any;
  publicationDateStr: any;

  // @ts-ignore
  constructor(bookCategoryDTO?) {
    bookCategoryDTO = bookCategoryDTO || {};

    this.bookID = bookCategoryDTO.bookID || '';
    this.bookCategoryID = bookCategoryDTO.bookCategoryID || '';
    this.title = bookCategoryDTO.title || '';
    this.author = bookCategoryDTO.author || '';
    this.noOfCopies = bookCategoryDTO.noOfCopies || '';
    this.language = bookCategoryDTO.language || '';
    this.publicationDateStr = bookCategoryDTO.publicationDateStr || '';
  }
}
