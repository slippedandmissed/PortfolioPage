export type projectType = "python" | "website" | "processing" | "unity" | "java" | "pdf";

export interface Project {
    name: string;
    description: string;
    unfinished?: boolean;
    type: projectType;
    githubURL?: string;
    downloadURL?: string;
    liveURL?: string;
}

export interface Section {
    title: string;
    projects: Project[];
    path: string;
}

const sectionsByPath: { [key: string]: Section } = {}

export function sectionFromPath(path: string): Section {
    if (!sectionsByPath[path]) {
        for (const section of sections) {
            sectionsByPath[section.path] = section;
        }
    }

    return sectionsByPath[path];
}

export const sections: Section[] = [
    {
        title: "Games", path: "games", projects: [
            {
                name: "Colour Matcher",
                description: "Match the coloured rectangles to create a smooth gradient.",
                type: "python",
                githubURL: "https://github.com/slippedandmissed/Colour-Matcher"
            },
            {
                name: "NoVals Code Golf",
                description: "Write your code in as few characters as possible without using any raw values.",
                type: "website",
                liveURL: "http://novals.co.uk"
            },
            {
                name: "Doodle Jump Clone",
                description: "Copy of the popular app \"Doodle Jump\"",
                type: "processing",
                githubURL: "https://github.com/slippedandmissed/DoodleJumpClone",
            },
            {
                name: "CodeSnake",
                description: "A game of snake where the players are controlled by code.",
                type: "python",
                githubURL: "https://github.com/slippedandmissed/CodeSnake"
            },
            {
                name: "Zenosyne",
                description: "First person 3D puzzle game, based on speeding up and slowing down time.",
                unfinished: true,
                type: "unity",
                githubURL: "https://github.com/slippedandmissed/Zenosyne"
            },
            {
                name: "Dex",
                description: "An Undertale-style game adaptation of the TV series \"Dexter\".",
                unfinished: true,
                type: "java",
                githubURL: "https://github.com/slippedandmissed/Dex"
            },
            {
                name: "Bublé Wrap",
                description: "Bubble wrap simulation, but every time you pop a bubble, Michael Bublé's, \"I Just Haven't Met You Yet\" plays.",
                type: "processing",
                githubURL: "https://github.com/slippedandmissed/BubleWrap"
            }
        ]
    },
    { title: "Tools", path: "tools", projects: [] },
    { title: "Websites", path: "websites", projects: [] },
    { title: "Procedural Art", path: "art", projects: [] },
    { title: "Maths Papers", path: "maths-papers", projects: [] },
    { title: "Computer Science Papers", path: "comp-sci-papers", projects: [] },
    { title: "Miscellaneous Projects", path: "misc", projects: [] },
];