import {Injectable} from '@angular/core';
import {catchError, Observable, Subject, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";

@Injectable()
export class BookCategoryService {

  getAllBookCategoryURL: string = "http://localhost:8090/book/getAllBookCategories";
  bookCategorySaveURL: string = "http://localhost:8090/book/saveBookCategory";
  bookCategoryUpdateURL: string = "http://localhost:8090/book/updateBookCategory";
  bookCategoryDeleteURL: string = "http://localhost:8090/book/deleteBookCategory";

  onGetAllBookCategories = new Subject();
  onSaveBookCategory = new Subject();

  bookCategories: any = [];

  constructor(private httpClient: HttpClient) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

    return new Promise<void>((resolve, reject) => {

      Promise.all([
        this.getAllBookCategories(),
      ]).then(
        () => {
          resolve();
        },
        reject
      );
    });
  }

  getAllBookCategories() {
    let response = this.httpClient.get(this.getAllBookCategoryURL);
    response.subscribe((data: any) => {
      this.bookCategories = data.result;
      this.onGetAllBookCategories.next(data);
    });
  }

  saveBookCategory(dataRQ: any) {
    let response = this.httpClient.post(this.bookCategorySaveURL, dataRQ);
    response.subscribe((data: any) => {
      this.onSaveBookCategory.next(data);
    });
  }

  updateBookCategory(bookCategoryID: any, dataRQ: any) {
    const URL = this.bookCategoryUpdateURL + '/' + bookCategoryID;
    let response = this.httpClient.put(URL, dataRQ);
    response.subscribe((data: any) => {
      this.onSaveBookCategory.next(data);
    });
  }

  public deleteBookCategory(bookCategoryID: any): Observable<any> {
    const URL = this.bookCategoryDeleteURL + '/' + bookCategoryID;
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
