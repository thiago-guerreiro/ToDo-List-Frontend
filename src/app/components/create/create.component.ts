import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  todo: Todo = {
    titulo: '',
    descricao: '',
    dataParaFinalizar: new Date(),
    finalizado: false
  }

  constructor(private router: Router, private service: TodoService) { }

  ngOnInit(): void {
  }

  create(): void {
    this.dateFormart();
    this.service.create(this.todo).subscribe((response) => {
      this.service.message('To-do criado com sucesso!');
      this.router.navigate(['']);
    }, err => {
      this.service.message('Falha ao criar To-do');
      this.router.navigate(['']);
    })
  }

  cancel(): void {
    this.router.navigate(['']);
  }

  dateFormart(): void {
    let date = new Date(this.todo.dataParaFinalizar);
    this.todo.dataParaFinalizar = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

}
