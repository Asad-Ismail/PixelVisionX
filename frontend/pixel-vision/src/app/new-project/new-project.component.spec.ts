import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {

  constructor() {
   }

  ngOnInit(): void {
  }

  onFileSelected(event: any) {
    // handle file selection logic here
  }

  startTraining() {
    // get selected files
  }
}
