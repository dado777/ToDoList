import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TodolistDetail } from 'src/app/shared/todolist-detail.model';
import { TodolistDetailService } from 'src/app/shared/todolist-detail.service';

@Component({
  selector: 'app-todolist-detail-list',
  templateUrl: './todolist-detail-list.component.html',
  styles: []
})
export class TodolistDetailListComponent {
  
  constructor(public service: TodolistDetailService, public toastr: ToastrService) {
  }

  ngOnInit() {
    this.service.updateList();
  }

  updateForm(tdd: TodolistDetail) {
    this.service.formData = Object.assign({}, tdd);
  }

  onDelete(Id: Number) {
    if(confirm("Вы точно хотите удалить этот запись?")) {
      this.service.deleteToDoList(Id).subscribe(
        result => {
          this.service.updateList();
          this.toastr.warning("Успешно удалена", "Список дел");
        },
        error => {console.log(error)}
        )
    }
  }
}
