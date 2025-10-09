import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { PokemonList } from './pokemon-list/pokemon-list';

@Component({
  selector: 'app-root',
  imports: [FormsModule, PokemonList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = "Student of KBTU";
  greeting = "Hi, I'm Arlan Maximov!";

  photoUrl = "/user.jpg";
  isButtonDisabled = false;

  likes = 0;
  showMessage = false;
  
  addLike(){
    this.likes++;
  }

  toggleMessage(){
    this.showMessage = !this.showMessage;
  }

  name = "";
  email = "";
  subscribed = false;

  subscribe(){
    if(this.email){
    this.subscribed = true;
  }
}

  activeTab: string = 'hobbies'; 

  opentab(tabname: string) {
    this.activeTab = tabname;
  }
}