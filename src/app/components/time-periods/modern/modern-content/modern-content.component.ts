import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Section, sections, sectionFromPath, Project } from 'src/app/data/sections';
import { faDownload, faShare } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faAmazon } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-modern-content',
  templateUrl: './modern-content.component.html',
  styleUrls: ['./modern-content.component.scss']
})
export class ModernContentComponent implements OnInit {

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

  ngOnInit(): void {
  }

  public getIcon(project: Project): string {
    if (!!project.iconSrc) {
      return project.iconSrc;
    }
    switch (project.type) {
      case "java":
        return "/assets/icons/java.png";
      case "pdf":
        return "/assets/icons/pdf.png"
      case "processing":
        return "/assets/icons/processing.png"
      case "python":
        return "/assets/icons/python.png"
      case "unity":
        return "/assets/icons/unity.svg"
      case "website":
        return "/assets/icons/website_new.png"
    }
  }
  
  faDownload = faDownload;
  faGithub = faGithub;
  faShare = faShare;
  faAmazon = faAmazon;

}
