import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  todo: Todo = {
    titulo: '',
    descricao: '',
    dataParaFinalizar: new Date(),
    finalizado: false
  }

  constructor(private router: Router, private service: TodoService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.todo.id = this.route.snapshot.paramMap.get("id")!;
    this.findById();
  }

  findById(): void {
    this.service.findById(this.todo.id).subscribe((response) => {
      this.todo = response;
    })
  }

  update(): void {
    this.service.update(this.todo).subscribe((response) => {
      this.service.message('To-do atualizado com sucesso');
      this.router.navigate(['']);
    }, error => {
      this.service.message('Falha ao atualizar To-do');
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