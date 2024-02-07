import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TaskModel } from 'src/app/common/models/task.model';
import { TaskService } from 'src/app/common/services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  public taskList = [];
  public updateStatus: FormGroup;
  constructor(
    private taskService: TaskService,
    private formBuilder: FormBuilder
  ) {
    this.updateStatus = this.formBuilder.group({
      status: [null, null],
    });
  }

  ngOnInit(): void {
    this.getTaskList();
  }

  private getTaskList() {
    this.taskService.getAll().subscribe(
      (response: TaskModel[]) => {
        this.taskList = response;
      },
      (error: Error) => {
        //console.log('Error: ', error);
      }
    );
  }

  public onDelete(id: number) {
    this.taskService.delete(id).subscribe(
      (response: any) => {
        this.getTaskList();
      },
      (error: Error) => {
        //console.log('Error: ', error);
      }
    );
  }

  public changeStatus(task: TaskModel) {
    const updateObj = {id: task.id, status: !task.status };
    this.taskService.updateTask(updateObj).subscribe(
      (response: any) => {
        this.getTaskList();
      },
      (error: Error) => {
        //console.log('Error: ', error);
      }
    );
  }
}
