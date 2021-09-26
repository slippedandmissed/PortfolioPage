import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { projectType, Section, sectionFromPath, sections } from 'src/app/data/sections';

@Component({
  selector: 'app-nineties-content',
  templateUrl: './nineties-content.component.html',
  styleUrls: ['./nineties-content.component.scss']
})
export class NinetiesContentComponent implements OnInit {

  public section: Section;

  constructor(private route: ActivatedRoute) {
    this.section = sections[0];

    route.url.subscribe((path) => {
      if (path.length > 0) {
        this.section = sectionFromPath(path[0].path);
      } else {
        this.section = sections[0];
      }
    });
  }

  public getIcon(type: projectType): string {
    switch (type) {
      case "java":
        return "/assets/icons/java_old.svg";
      case "pdf":
        return "/assets/icons/pdf_old.png"
      case "processing":
        return "/assets/icons/processing.png"
      case "python":
        return "/assets/icons/python_old.png"
      case "unity":
        return "/assets/icons/unity.svg"
      case "website":
        return "/assets/icons/website.png"
    }
  }

  ngOnInit(): void {
  }

}
