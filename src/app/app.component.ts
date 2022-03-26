import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

const urlBase = 'http://localhost:3000';

interface Produto {
  id: number;
  nome: string;
  preco: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  produtos: Produto[] = [];
  form = new FormGroup({
    nome: new FormControl('', Validators.required),
    preco: new FormControl(0, [Validators.required, Validators.min(1)])
  })

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get<Produto[]>(`${urlBase}/produtos`)
      .subscribe(dados => {
        this.produtos = dados;
      });
  }

  adicionar() {
    const produto = this.form.value;
    this.httpClient.post<Produto>(`${urlBase}/produtos`, produto)
      .subscribe(novoProduto => {
        this.produtos.push(novoProduto);
      })
  }

  excluir(produto: Produto) {
    this.httpClient.delete(`${urlBase}/produtos/${produto.id}`)
      .subscribe(() => {
        const index = this.produtos.indexOf(produto);
        this.produtos.splice(index, 1);
      })
  }

}
