import {Injectable} from '@angular/core';
import {catchError, Observable, Subject, throwError} from "rxjs";
import {ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {BookCategoryService} from "./book-category.service";

@Injectable()
export class BookService {

  getAllBooksURL: string = "http://localhost:8090/book/getAllBooks";
  bookSaveURL: string = "http://localhost:8090/book/saveBook";
  bookUpdateURL: string = "http://localhost:8090/book/updateBook";
  bookDeleteURL: string = "http://localhost:8090/book/deleteBook";

  onGetAllBooks = new Subject();
  onSaveBook = new Subject();

  constructor(private httpClient: HttpClient,
              private bookCategoryService: BookCategoryService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

    return new Promise<void>((resolve, reject) => {

      Promise.all([
        this.getAllBooks(),
        this.bookCategoryService.getAllBookCategories()
      ]).then(
        () => {
          resolve();
        },
        reject
      );
    });
  }

  getAllBooks() {
    let response = this.httpClient.get(this.getAllBooksURL);
    response.subscribe((data: any) => {
      this.onGetAllBooks.next(data);
    });
  }

  saveBook(dataRQ: any) {
    let response = this.httpClient.post(this.bookSaveURL, dataRQ);
    response.subscribe((data: any) => {
      this.onSaveBook.next(data);
    });
  }

  updateBook(bookCategoryID: any, dataRQ: any) {
    const URL = this.bookUpdateURL + '/' + bookCategoryID;
    let response = this.httpClient.put(URL, dataRQ);
    response.subscribe((data: any) => {
      this.onSaveBook.next(data);
    });
  }

  public deleteBook(bookID: any): Observable<any> {
    const URL = this.bookDeleteURL + '/' + bookID;
    return this.httpClient.delete(URL, {
      reportProgress: true,
      responseType: "json",
    }).pipe(catchError(err => this.formatErrors(err)));
  }

  private formatErrors(error: any) {
    error.error.appsErrorMessages.forEach((msg: any) => {
      alert(msg.errorCode);
    })
    return throwError(error.error);
  }
}
