import { Component } from '@angular/core';
import { Chien } from '../../models/chien';
import { Cheval } from '../../models/cheval';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-animal-view',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './animal-view.component.html',
  styleUrl: './animal-view.component.scss'
})
export class AnimalViewComponent {
  monchien: Chien;
  moncontenu: string = "toto fait du vélo";
  chiens: Chien[];
  horses: Cheval[];
  shuffleHorses: Cheval[] = [];
  winners: string[] = [];
  chevalImage: string = './assets/images/horse.png'

  constructor() {
    this.monchien = new Chien("Nemo");
    this.chiens = [];
    this.horses = [];
  }
  ngOnInit(): void {
    this.initChiens();
    this.initHorses();
  }

  initChiens() {
    this.chiens = [];
    this.chiens.push(new Chien('Iris'));
    this.chiens.push(new Chien('Noumea'));
    this.chiens.push(new Chien('Goofy'));
    this.chiens.push(new Chien('Rova'));
  }
  changeText() {
    this.moncontenu = "toto fait du skate";
    this.monchien.name = "Mia";
  }

  initHorses() {
    this.horses = [];
    this.horses.push(new Cheval('Nemesis',20,40)); 
    this.horses.push(new Cheval('Groot',40,20)); 
    this.horses.push(new Cheval('Raiponce',50,10)); 
    this.horses.push(new Cheval('Ratatouille',5,40)); 
    this.horses.push(new Cheval('Luchito',50,5)); 
  }

  runCourse() {
    const intervalID = setInterval(() => {
      this.shuffleHorses = [...this.horses];
      this.shuffleHorses.sort(() => Math.random()- 0.5);
      for (let i = 0; i< this.shuffleHorses.length; i++) {
          if (!this.shuffleHorses[i].finished && !this.winners.includes(this.shuffleHorses[i].getName())) {// cheks if the horse hasn't finished with variable finished and also checks if the currents horse hasn't already won
              if (this.checkDifference(this.shuffleHorses[i].getPos())) {;// call of the function that checks if there is or isnt a 100m difference 
                  this.shuffleHorses[i].runHorse(); // the horse runs
                  this.checkWinner(i,this.shuffleHorses[i].getPos()); // then i go and check if the horse won
              }
              else {
                  this.shuffleHorses[i].flip = 0;
                  this.shuffleHorses[i].runHorse(); 
                  this.checkWinner(i,this.shuffleHorses[i].getPos());
              }
          }
          else {
              continue;
          }
          console.log(this.shuffleHorses[i].name, this.shuffleHorses[i].getPos());
      }
    if (this.winners.length === this.shuffleHorses.length) {
      clearInterval(intervalID); // Stop the interval if all horses have finished
    }
  }, 1000);
    
    
  }

  checkWinner(index: number,position: number) {
    if (position >= this.shuffleHorses[index].MAX_LINE && !(this.shuffleHorses[index].finished)) { // checks if the horse didn't pass the line
        // Not sure if i need the other condition since it's
        //also on line 34 in the "if"
        this.shuffleHorses[index].finished = true;// the horse won so finished is true
        this.winners.push(this.shuffleHorses[index].getName()) // i get the name of the horse and i put it in the array of winners
        // this.horses[index].initPos(); initialize positions.
    }
  }

  checkDifference(position: number): boolean {
    for (let i = 0; i < this.shuffleHorses.length; i++) {
        if (Math.abs(this.shuffleHorses[i].getPos() - position) <= 100 && i != position) {
            return true; // there's at least a horse with 100 or less difference with the actual
        }
    }
    return false; // there's no horse with that difference
  }
  clearWinners() {
    this.winners = [];
    this.initHorses();
  }


}
