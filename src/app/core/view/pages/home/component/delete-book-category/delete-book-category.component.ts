import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder} from "@angular/forms";
import {BookCategoryService} from "../../service/book-category.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-delete-book-category',
  templateUrl: './delete-book-category.component.html',
  styleUrls: ['./delete-book-category.component.scss']
})
export class DeleteBookCategoryComponent implements OnInit, OnDestroy {

  bookCategoryID: any;

  constructor(public dialogRef: MatDialogRef<DeleteBookCategoryComponent>,
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

  onConfirm($event: MouseEvent) {
    this.bookCategoryService.deleteBookCategory(this.bookCategoryID).subscribe((result: any) => {
      alert("Book Category is deleted");
      this.bookCategoryService.getAllBookCategories();
      this.dialogRef.close(true);
    });
  }

  ngOnInit(): void {
    this.bookCategoryID = this.data.itemData.bookCategoryID;
  }

  ngOnDestroy(): void {

  }
}
