import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BookCategoryService} from "../../service/book-category.service";
import {BookCategoryDto} from "../../model/book-category-dto";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-add-new-book-category',
  templateUrl: './add-new-book-category.component.html',
  styleUrls: ['./add-new-book-category.component.scss']
})
export class AddNewBookCategoryComponent implements OnInit {

  title: any;
  type: any;
  bookCategoryAddEditForm!: FormGroup;
  bookCategoryDto = new BookCategoryDto();
  onSaveBookCategorySubs = new Subscription();

  constructor(public dialogRef: MatDialogRef<AddNewBookCategoryComponent>,
              private formBuilder: FormBuilder,
              private bookCategoryService: BookCategoryService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onCancelClick($event: MouseEvent) {
    if ($event) {
      $event.stopPropagation();
      $event.preventDefault();
    }

    this.dialogRef.close(false);
  }

  ngOnInit(): void {
    this.bookCategoryDto = new BookCategoryDto(this.data.bookCategory);
    this.title = this.data.title;
    this.type = this.data.type;

    this.initUserForm();

    this.onSaveBookCategorySubs = this.bookCategoryService.onSaveBookCategory
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
    this.bookCategoryAddEditForm = this.formBuilder.group({
      subCategory: [this.bookCategoryDto.subCategory, Validators.compose([
        Validators.required
      ])],
      description: [this.bookCategoryDto.description, Validators.compose([
        Validators.required
      ])]
    });
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.bookCategoryAddEditForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isFormValid() {
    return this.bookCategoryAddEditForm.valid;
  }

  onSave($event: MouseEvent) {
    if ($event) {
      $event.stopPropagation();
      $event.preventDefault();
    }

    let submitData = Object.assign({}, this.bookCategoryAddEditForm.getRawValue());

    if (this.type == 'ADD') {
      //Save
      this.bookCategoryService.saveBookCategory(submitData);
    } else {
      //Update
      submitData.bookCategoryID = this.bookCategoryDto.bookCategoryID;
      this.bookCategoryService.updateBookCategory(this.bookCategoryDto.bookCategoryID, submitData);
    }
  }
}
