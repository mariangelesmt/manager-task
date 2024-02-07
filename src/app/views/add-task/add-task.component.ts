import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from 'src/app/common/services/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  public taskForm: FormGroup;
  public showSuccessfullMessage = false;
  public showRequiredMessage = false;
  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService
  ) {
    this.taskForm = this.formBuilder.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      status: [false, null],
    });
  }

  ngOnInit(): void {}

  public addTask() {
    if (this.taskForm.valid) {
      const task = this.taskForm.value;
      this.taskService.addTask(task).subscribe(
        (response: any) => {
          this.showSuccessfullMessage = true;
        },
        (error: Error) => {
          //console.log('Error: ', error);
        }
      );
    } else {
      this.showRequiredMessage = true;
    }
  }
}
