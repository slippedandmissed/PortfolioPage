import { Component, OnInit } from '@angular/core';
import { personal } from 'src/app/data/personal';
import { sections } from 'src/app/data/sections';

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

@Component({
  selector: 'app-nineties',
  templateUrl: './nineties.component.html',
  styleUrls: ['./nineties.component.scss']
})
export class NinetiesComponent implements OnInit {


  sections = sections;
  personal = personal;

  month: string;
  day: number;

  constructor() {
    const now = new Date();
    this.month = monthNames[now.getMonth()];
    this.day = now.getDate();
  }

  ngOnInit(): void {
  }

  buttonClicked(): void {
    alert("Welcome to my portfolio!")
  }

}
