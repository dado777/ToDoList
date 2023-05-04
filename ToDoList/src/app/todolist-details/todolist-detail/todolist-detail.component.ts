import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TodolistDetailService } from 'src/app/shared/todolist-detail.service';
import { NgForm, FormControl, FormGroupDirective, Validators, FormGroup} from '@angular/forms';
import { ErrorStateMatcher} from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-todolist-detail',
  templateUrl: './todolist-detail.component.html',
  styles: []
})

export class TodolistDetailComponent {
  
  currentDate: Date;

  ToDoForm = new FormGroup ({
    TaskNameLength: new FormControl('', [ Validators.required, Validators.minLength(10), Validators.maxLength(100)]),
    StatusLength: new FormControl('', [ Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
    StartDate: new FormControl('', [ Validators.required]),
    EndDate: new FormControl('', [ Validators.required]),
  });
  
  constructor(public service:TodolistDetailService, public toastr: ToastrService) {
    this.currentDate = new Date(Date.now());
  }

  ngOnInit() {
    this.clearForm();
  }

  matcher = new MyErrorStateMatcher();

  clearForm(form?: NgForm) {
    if(form != null)
      form.resetForm();
    
      this.service.formData = {
      Id: 0,
      TaskName: '',
      Status: '',
      StartDate: new Date(),
      EndDate: new Date(Date.now() + (5 * 60 * 1000)) // EndDate going forward 5 minutes
    }
  }

  onSubmit(form: NgForm) {
    if(this.service.formData.Id == 0){
      this.toLocalTimeZone(form)
      this.insertRecord(form);
    }
    
    else{
      this.toLocalTimeZone(form)
      this.updateRecord(form);
    }
  }

  toLocalTimeZone(form: NgForm){
    const localUTCStart = this.service.formData.StartDate;
    const localUTCEnd = this.service.formData.EndDate;
    this.service.formData.StartDate = new Date(localUTCStart.setHours(localUTCStart.getHours() + 5));
    this.service.formData.EndDate = new Date(localUTCEnd.setHours(localUTCEnd.getHours() + 5));
    
    console.log(localUTCEnd);
  }

  insertRecord(form: NgForm) {
    this.service.postToDoList().subscribe(
      result => {
        this.clearForm(form);
        this.toastr.success('Запись успешно сохранена!', 'Список дел')
        this.service.updateList();
      },
      error => {
        console.log(error)
      }
      )
  }

  updateRecord(form: NgForm) {
    this.service.putToDoList().subscribe(
      result => {
        this.clearForm(form);
        this.toastr.info('Запись успешно изменена!', 'Список дел')
        this.service.updateList();
      },
      error => {
        console.log(error)
      }
      )
  }
}
