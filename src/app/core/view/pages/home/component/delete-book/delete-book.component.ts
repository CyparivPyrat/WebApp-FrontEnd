import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BookCategoryService} from "../../service/book-category.service";
import {BookService} from "../../service/book.service";

@Component({
  selector: 'app-delete-book',
  templateUrl: './delete-book.component.html',
  styleUrls: ['./delete-book.component.scss']
})
export class DeleteBookComponent implements OnInit {

  bookID: any;

  constructor(public dialogRef: MatDialogRef<DeleteBookComponent>,
              private bookService: BookService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.bookID = this.data.itemData.bookID;

  }

  onCancelClick($event: MouseEvent) {
    if ($event) {
      $event.stopPropagation();
      $event.preventDefault();
    }

    this.dialogRef.close(false);
  }

  onConfirm($event: MouseEvent) {
    this.bookService.deleteBook(this.bookID).subscribe((result: any) => {
      alert("Book is deleted");
      this.bookService.getAllBooks();
      this.dialogRef.close(true);
    });
  }
}
