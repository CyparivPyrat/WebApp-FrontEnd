import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BookCategoryService} from "../../service/book-category.service";
import {BookDto} from "../../model/book-dto";
import {BookService} from "../../service/book.service";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MomentDateAdapter} from "@angular/material-moment-adapter";
import {DateService} from "../../service/date.service";
import * as moment from 'moment';

export const CUSTOM_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'DD/MM/YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'DD/MM/YYYY',
  },
};


@Component({
  selector: 'app-add-new-book',
  templateUrl: './add-new-book.component.html',
  styleUrls: ['./add-new-book.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS}
  ]
})
export class AddNewBookComponent implements OnInit, OnDestroy {
  title: any;
  type: any;
  bookAddEditForm!: FormGroup;
  bookDto = new BookDto();
  onSaveBookSubs = new Subscription();
  onGetAllBookCategoriesSubs = new Subscription();
  bookCategories: any = [];

  constructor(public dialogRef: MatDialogRef<AddNewBookComponent>,
              private formBuilder: FormBuilder,
              private bookService: BookService,
              private dateService: DateService,
              private bookCategoryService: BookCategoryService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnDestroy(): void {
    this.onSaveBookSubs.unsubscribe();
    this.onGetAllBookCategoriesSubs.unsubscribe();
  }

  onCancelClick($event: MouseEvent) {
    if ($event) {
      $event.stopPropagation();
      $event.preventDefault();
    }

    this.dialogRef.close(false);
  }

  ngOnInit(): void {
    this.bookCategories = this.bookCategoryService.bookCategories
    this.bookDto = new BookDto(this.data.book);
    this.title = this.data.title;
    this.type = this.data.type;

    this.initUserForm();

    this.onSaveBookSubs = this.bookService.onSaveBook
      .subscribe((data: any) => {
        if (data) {
          if (this.type == 'ADD') {
            alert("Saved successfully");
          } else {
            alert("Updated successfully");
          }

          this.dialogRef.close(true);
        }
      });
  }

  initUserForm() {
    this.bookAddEditForm = this.formBuilder.group({
      bookCategoryID: [this.bookDto.bookCategoryID, Validators.compose([
        Validators.required
      ])],
      title: [this.bookDto.title, Validators.compose([
        Validators.required
      ])],
      author: [this.bookDto.author, Validators.compose([
        Validators.required
      ])],
      noOfCopies: [this.bookDto.noOfCopies, Validators.compose([
        Validators.required
      ])],
      language: [this.bookDto.language, Validators.compose([
        Validators.required
      ])],
      publicationDateStr: [this.dateService.getMomentDateFromDateStr(this.bookDto.publicationDateStr), Validators.compose([
        Validators.required
      ])],
    });
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.bookAddEditForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isFormValid() {
    return this.bookAddEditForm.valid;
  }

  onSave($event: MouseEvent) {
    if ($event) {
      $event.stopPropagation();
      $event.preventDefault();
    }

    let submitData = Object.assign({}, this.bookAddEditForm.getRawValue());
    submitData.publicationDateStr = moment(submitData.publicationDateStr).format('DD/MM/YYYY');

    if (this.type == 'ADD') {
      //Save
      this.bookService.saveBook(submitData);
    } else {
      //Update
      submitData.bookID = this.bookDto.bookID;
      this.bookService.updateBook(this.bookDto.bookID, submitData);
    }
  }
}
