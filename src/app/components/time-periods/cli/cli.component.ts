import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { Project, projectType, sections } from 'src/app/data/sections';

const cowsayTemplate =
  ` 1
< 2 >
 3
        \\   ^__^
         \\  (oo)\_______
            (__)\       )\\/\\
                ||----w |
                ||     ||

`.replace(/ /g, " "); // replace the spaces with non-breakable spaces

interface Binary {
  description: string;
  usage: string;
  func: (...args: string[]) => string | HTMLElement;
}

interface File {
  project: Project;
}

type directory = { [key: string]: (directory | File) };

@Component({
  selector: 'app-cli',
  templateUrl: './cli.component.html',
  styleUrls: ['./cli.component.scss']
})
export class CliComponent implements AfterViewInit {

  private cowSay(prompt: string): string {
    return cowsayTemplate.replace("1", "_".repeat(prompt.length + 2)).replace("2", prompt).replace("3", "-".repeat(prompt.length + 2));
  }

  username = "guest";
  hostname = window.location.hostname;
  pwd: string[] = [];
  marker = "$";

  private fileSystem: directory = {};

  private getFilenameFromProject(project: Project): string {
    const flattened = project.name.replace(/ /g, "_").replace(/[^A-Za-z0-9_\-\.]/g, "");
    switch (project.type) {
      case "java":
        return flattened + ".java";
      case "pdf":
        return flattened + ".pdf";
      case "processing":
        return flattened + ".pde";
      case "python":
        return flattened + ".py";
      case "unity":
        return flattened + ".cs";
      case "website":
        return flattened + ".html"
    }
  }

  constructor() {
    for (const section of sections) {
      const dir: directory = {};

      for (const project of section.projects) {
        dir[this.getFilenameFromProject(project)] = { project };
      }

      this.fileSystem[section.path] = dir;
    }
  }

  private pathFromString(x: string, includeTrailingEmpty: boolean = false): string[] {
    const commandParts = (x || ".").split("/");
    let trailingSlash = false;
    if (commandParts.length > 1 && commandParts[commandParts.length - 1] === "") {
      trailingSlash = true;
      commandParts.pop();
    }
    let path = [...this.pwd];

    for (const part of commandParts) {
      if (part === "") {
        path = [];
      }
      else if (part === "..") {
        path.pop();
      } else if (part !== ".") {
        path.push(part);
      }
    }
    return (includeTrailingEmpty && trailingSlash) ? [...path, ""] : path;
  }

  private followPath(path: string[]): directory | File | null {
    let node: directory | File = this.fileSystem;

    for (const elt of path) {
      if (node instanceof File || !(node as directory)[elt]) {
        return null;
      }
      node = (node as directory)[elt];
    }

    return node;
  }

  getPWDString() {
    return "/" + this.pwd.join('/')
  }

  @ViewChild("log") log?: ElementRef;
  @ViewChild("prompt") prompt?: ElementRef;
  @ViewChild("main") main?: ElementRef;

  ngAfterViewInit(): void {
    this.prompt?.nativeElement.querySelector(".command").focus();
    if (this.log) {
      this.log.nativeElement.innerText = this.cowSay("Welcome to my portfolio") + "type 'help' for a list of commands\n\n";
    }
  }

  clicked(): void {
    if (!window.getSelection()?.toString()) {
      this.prompt?.nativeElement.querySelector(".command").focus();
    }
  }

  private history: string[] = [];
  private historyPointer = 0;

  // Thanks https://stackoverflow.com/questions/1125292/how-to-move-cursor-to-end-of-contenteditable-entity
  private setEndOfContenteditable(contentEditableElement: HTMLElement) {
    if (contentEditableElement.innerText === "") {
      return;
    }
    let range, selection;
    if (document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
    {
      range = document.createRange();//Create a range (a range is a like the selection but invisible)
      range.setStart(contentEditableElement.childNodes[0], contentEditableElement.innerText.length);//Select the entire contents of the element with the range
      range.collapse(true);//collapse the range to the end point. false means collapse to end rather than the start
      selection = window.getSelection();//get the selection object (allows you to change selection)
      selection?.removeAllRanges();//remove any selections already made
      selection?.addRange(range);//make the range you have just created the visible selection
    }
    else if ((document as any).selection)//IE 8 and lower
    {
      range = (document.body as any).createTextRange();//Create a range (a range is a like the selection but invisible)
      range.moveToElementText(contentEditableElement);//Select the entire contents of the element with the range
      range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
      range.select();//Select the range (make it the visible selection
    }
  }


  historyBack() {
    if (!!this.prompt && this.historyPointer > 0) {
      const elt = this.prompt.nativeElement.querySelector(".command");
      elt.innerText = this.history[--this.historyPointer];
      this.setEndOfContenteditable(elt);
    }
  }

  historyForwards() {
    if (!this.prompt) {
      return;
    }

    const elt = this.prompt.nativeElement.querySelector(".command");
    if (this.historyPointer < this.history.length - 1) {
      elt.innerText = this.history[++this.historyPointer];
      this.setEndOfContenteditable(elt);
    }

    else if (this.historyPointer === this.history.length - 1) {
      elt.innerText = "";
      this.historyPointer++;
    }
  }

  keydown(event: any) {
    let keynum;

    if (window.event) { // IE                  
      keynum = event.keyCode;
    } else if (event.which) { // Netscape/Firefox/Opera                 
      keynum = event.which;
    }

    const char = String.fromCharCode(keynum);

    if (["\n", "\r"].includes(char)) {
      this.parseCommand();
      return false;
    }

    if (char === "\t") {
      this.tabComplete();
      return false;
    }

    return true;
  }

  // Transcribed from https://github.com/Cause-App/RegBelle/blob/main/belle/scriptparser.py
  private parseArgs(cmd: string, evenIfLastIsEmpty: boolean = false): string[] {
    const args: string[] = [];
    let currentArg = "";
    let inString: string | null = null;
    let escaping = false;

    for (const i of cmd.replace(/\n/g, "")) {
      if (inString !== null) {
        if (i === inString && !escaping) {
          inString = null;
        } else if (i == "\\" && !escaping) {
          escaping = true;
        } else {
          currentArg += i;
          escaping = false;
        }
      } else if (["\"", "'"].includes(i) && !escaping) {
        inString = i;
      } else if ([" ", " "].includes(i) && !escaping) { // Second element is non-breaking space (Char code 160)
        args.push(currentArg.replace(/^\s+|\s+$/g, ''));
        currentArg = "";
      } else if (i === "\\" && !escaping) {
        escaping = true;
      } else {
        currentArg += i;
        escaping = false;
      }
    }

    if (evenIfLastIsEmpty || currentArg !== "") {
      args.push(currentArg);
    }

    return args;
  }

  parseCommand(): void {
    if (!this.prompt) {
      return;
    }

    const commandElement = this.prompt?.nativeElement.querySelector(".command");
    const cmd = commandElement.innerText;

    if (!!cmd && (this.historyPointer === 0 || cmd !== this.history[this.historyPointer - 1])) {
      this.history = [...this.history.slice(0, this.historyPointer), cmd];
      this.historyPointer = this.history.length;
    }

    if (!!this.log) {
      const promptCopy = this.prompt.nativeElement.cloneNode(true);
      promptCopy.id = "";
      promptCopy.querySelector(".command").contentEditable = false;
      this.log.nativeElement.appendChild(promptCopy);
    }

    commandElement.innerHTML = "";

    const parts = this.parseArgs(cmd);

    if (!parts.length) {
      return;
    }


    if (!this.binaries[parts[0]]) {
      this.logString(`${parts[0]}: command not found`);
    } else {
      const output = this.binaries[parts[0]].func(...parts.slice(1));
      if (output instanceof HTMLElement) {
        this.log?.nativeElement.appendChild(output);
      } else {
        this.logString(output);
      }
    }

  }

  // Thanks https://duncan-mcardle.medium.com/leetcode-problem-14-longest-common-prefix-javascript-3bc6a2f777c4
  private longestCommonPrefix(strs: string[]): string {
    // Return early on empty input
    if (!strs.length) return '';

    // Loop through the letters of the first word
    for (let i = 0; i <= strs[0].length; i++) {
      // Check if this character is present in the same position of every string
      if (!strs.every((string) => string[i] === strs[0][i])) {
        // If not, return the string up to and including the previous character
        return strs[0].slice(0, i);
      }
    }

    return strs[0];
  };

  // Thanks https://stackoverflow.com/questions/3972014/get-contenteditable-caret-position
  private getCaretPosition(editableDiv: HTMLElement): number {
    let caretPos = 0,
      sel, range;
    if (window.getSelection) {
      sel = window.getSelection();
      if (sel?.rangeCount) {
        range = sel.getRangeAt(0);
        if (range.commonAncestorContainer.parentNode == editableDiv) {
          caretPos = range.endOffset;
        }
      }
    } else if ((document as any).selection && (document as any).selection.createRange) {
      range = (document as any).selection.createRange();
      if (range.parentElement() == editableDiv) {
        let tempEl = document.createElement("span");
        editableDiv.insertBefore(tempEl, editableDiv.firstChild);
        let tempRange = range.duplicate();
        tempRange.moveToElementText(tempEl);
        tempRange.setEndPoint("EndToEnd", range);
        caretPos = tempRange.text.length;
      }
    }
    return caretPos;
  }

  tabComplete(): void {
    if (!this.prompt) {
      return;
    }

    const commandElement = this.prompt?.nativeElement.querySelector(".command");
    const cmd = commandElement.innerText.slice(0, this.getCaretPosition(commandElement));

    const given = this.parseArgs(cmd, true).pop() || "";
    const path = this.pathFromString(given, true);
    const partial = path.pop() || "";

    let node = this.followPath(path);
    if (node === null || "project" in node) {
      return;
    }

    node = node as directory;

    const matches = Object.keys(node).filter(x => x.startsWith(partial)).map(x => "project" in (node as directory)[x] ? x : x + "/").sort();

    if (!matches.length) {
      return;
    }

    const lcp = this.longestCommonPrefix(matches);

    const addition = lcp.slice(partial.length);

    if (addition === "") {
      return;
    }

    commandElement.innerText = cmd + addition;
    this.setEndOfContenteditable(commandElement);
  }

  private descriptionOfType(type: projectType): string {
    switch (type) {
      case "java":
        return "Java project";
      case "pdf":
        return "PDF document";
      case "processing":
        return "Processing project";
      case "python":
        return "Python project";
      case "unity":
        return "Unity project";
      case "website":
        return "Website";
    }
  }

  private logString(x: string) {
    if (!this.log) {
      return;
    }
    const logDiv: HTMLDivElement = document.createElement("div");
    logDiv.innerText = x;
    this.log.nativeElement.appendChild(logDiv);
    if (this.main) {
      const elt = this.main.nativeElement.parentElement.parentElement;
      elt.scrollTop = elt.scrollHeight;
    }
  }

  private binaries: { [key: string]: Binary } = {
    man: {
      description: "an interface to the system reference manuals",
      usage: "man command\n\npositional arguments:\ncommand: the command to give help for",
      func: (cmd) => {
        const bin = this.binaries[cmd ?? "man"];
        if (bin) {
          return `${cmd ?? "man"} - ${bin.description}\n\nusage: ${bin.usage}\n`;
        } else {
          return `No manual entry for ${cmd}`;
        }
      }
    },
    help: {
      description: "gives a list of available commands",
      usage: "help",
      func: () => {
        let result = "";
        for (const bin in this.binaries) {
          result += `${bin} - ${this.binaries[bin].description}\n`;
        }
        return result;
      }
    },
    whoami: {
      description: "tells you your username",
      usage: "whoami",
      func: () => {
        return this.username;
      }
    },
    clear: {
      description: "clear the terminal screen",
      usage: "clear",
      func: () => {
        if (this.log) {
          this.log.nativeElement.innerHTML = "";
        }
        return "";
      }
    },
    ls: {
      description: "list directory contents",
      usage: "ls [directory]\n\noptional arguments:\ndirectory: the directory for which to list the contents (current directory used if not specified)",
      func: (dir) => {
        const path = this.pathFromString(dir);
        let node = this.followPath(path);

        if (node === null) {
          return `ls: cannot access '${dir}': No such file or directory`;
        }

        else if ("project" in node) {
          const file = node;
          node = {};
          node[path.pop() ?? ""] = file;
        }

        node = node as directory;

        return Object.keys(node).sort().map(x => (x.includes(" ") ? `'${x}'` : x)).join("\n");
      }
    },
    cd: {
      description: "change directory",
      usage: "cd directory\n\npositional arguments:\ndirectory: the directory to enter",
      func: (dir) => {
        const path = this.pathFromString(dir);
        const node = this.followPath(path);
        if (node === null) {
          return `cd: ${dir}: No such file or directory`;
        } else if ("project" in node) {
          return `cd: ${dir}: Not a directory`;
        }
        this.pwd = path;
        return "";
      }
    },
    cowsay: {
      description: "configurable speaking cow",
      usage: "cowsay string\n\npositional arguments:\nstring: the string for the cow to say",
      func: (x) => {
        return this.cowSay(x || "");
      }
    },
    file: {
      description: "give a description of a file",
      usage: "file path\n\npositional arguments:\npath: the path to the file",
      func: (path) => {
        let file = this.followPath(this.pathFromString(path));
        if (file === null) {
          return `cannot open \`${path}' (No such file or directory)`;
        }
        if (!("project" in file)) {
          return `${path}: directory`;
        }

        file = file as File;

        const output: HTMLDivElement = document.createElement("div");
        const firstLine: HTMLDivElement = document.createElement("div");
        const title: HTMLDivElement = document.createElement("div");
        const description: HTMLDivElement = document.createElement("div");
        const links: HTMLDivElement = document.createElement("div");

        firstLine.innerText = `${path}: ${this.descriptionOfType(file.project.type)}\n\n`;

        title.classList.add("project-title");
        title.innerText = `${file.project.name}\n\n`;

        description.classList.add("project-description");
        description.innerText = `${file.project.description}\n\n`;

        output.appendChild(firstLine);
        output.appendChild(title);
        output.appendChild(description);

        const generateLink = (label: string, url: string): HTMLElement => {
          const div: HTMLDivElement = document.createElement("div");
          const labelSpan: HTMLSpanElement = document.createElement("span");
          const anchor: HTMLAnchorElement = document.createElement("a");
          labelSpan.innerText = label + ": "; // non-breaking space
          anchor.innerText = url.startsWith("/") ? window.location.href + url : url;
          anchor.href = url;
          anchor.target = "_blank";
          div.appendChild(labelSpan);
          div.appendChild(anchor);
          return div;
        }

        if (!!file.project.downloadURL) {
          links.appendChild(generateLink("Download", file.project.downloadURL));
        }
        if (!!file.project.githubURL) {
          links.appendChild(generateLink("GitHub", file.project.githubURL));
        }
        if (!!file.project.liveURL) {
          links.appendChild(generateLink("Visit", file.project.liveURL));
        }
        if (!!file.project.amazonURL) {
          links.appendChild(generateLink("View on Amazon", file.project.amazonURL));
        }

        if (!!links.innerHTML) {
          links.innerHTML += "<br>";
        }

        output.append(links);

        return output;
      }
    }
  }

}
