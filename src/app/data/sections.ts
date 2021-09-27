export type projectType = "python" | "website" | "processing" | "unity" | "java" | "pdf";

export interface Project {
    name: string;
    description: string;
    unfinished?: boolean;
    type: projectType;
    githubURL?: string;
    downloadURL?: string;
    liveURL?: string;
    amazonURL?: string;
    iconSrc?: string;
    screenshotSrc?: string
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
        title: "Websites", path: "websites", projects: [
            {
                name: "Portfolio",
                description: "This website indexing my favourite projects.",
                type: "website",
                githubURL: "https://github.com/slippedandmissed/PortfolioPage"
            },
            {
                name: "CAUSE",
                description: "A social media platform connecting protesters to the organizers in a safe and secure way.",
                type: "website",
                liveURL: "https://cause.cx/",
                screenshotSrc: "/assets/screenshots/cause.png"
            },
            {
                name: "Original Spin",
                description: "The homepage for a manufacturer and supplier of gifts.",
                type: "website",
                liveURL: "https://original-spin.com/",
                screenshotSrc: "/assets/screenshots/os.png"
            },
            {
                name: "IcedGabriel",
                description: "Unofficial University of Cambridge programming challenges.",
                type: "website",
                githubURL: "https://github.com/Cause-App/IcedGabriel",
                liveURL: "https://icedgabriel.com/",
                screenshotSrc: "/assets/screenshots/icedgabriel.png"
            },
            {
                name: "Wafflecone",
                description: "Stream videos and video chat at the same time.",
                type: "website",
                githubURL: "https://github.com/slippedandmissed/Wafflecone",
            },
            {
                name: "I Have Anxiety, Make Calls For Me",
                description: "A website where introverts can get other people to make appointments or phone calls on their behalf.\nPart of a challenge to make a website in 10 hours.",
                type: "website",
                githubURL: "https://github.com/slippedandmissed/IHaveAnxietyMakeCallsForMe",
                liveURL: "https://ihaveanxietymakecallsforme.com",
                screenshotSrc: "/assets/screenshots/anxiety.png"
            },
            {
                name: "NoVals Code Golf",
                description: "Write your code in as few characters as possible without using any raw values.",
                type: "website",
                liveURL: "http://novals.co.uk",
                screenshotSrc: "/assets/screenshots/novals.png"
            },
            {
                name: "ConeSpace",
                description: "A PWA containing a virtual online pet, with hunger, thirst, and boredom.",
                type: "website",
                githubURL: "https://github.com/slippedandmissed/ConeSpace"
            },
            {
                name: "HeadpatMachine",
                description: "The webserver controlling a robot arm that let my friends give me headpats over the internet.",
                type: "website",
                githubURL: "https://github.com/slippedandmissed/HeadpatMachine"
            },
        ]
    },
    {
        title: "Tools", path: "tools", projects: [
            {
                name: "Nangular",
                description: "Command-line tool to generate a boilerplate Angular project served by a Node.js backend, which is Heroku-ready.",
                type: "python",
                githubURL: "https://github.com/slippedandmissed/nangular"
            },
            {
                name: "KiddoJS",
                description: "A sudoku-setting engine to help design sudoku puzzles.",
                type: "website",
                githubURL: "https://github.com/slippedandmissed/KiddoJS",
                liveURL: "http://kiddojs.herokuapp.com/",
                screenshotSrc: "/assets/screenshots/kiddojs.png"
            },
            {
                name: "BTR (Bypass The Router)",
                description: "Allows you to do \"port forwarding\" for TCP applications without needing access to your own router's settings.",
                type: "python",
                githubURL: "https://github.com/slippedandmissed/BTR"
            },
            {
                name: "Dashpot Phase Flow",
                description: "A tool to help visualise the phase flow of a phsyical dashpot system.",
                type: "website",
                githubURL: "https://github.com/slippedandmissed/DashpotPhaseFlow",
                liveURL: "https://slippedandmissed.github.io/DashpotPhaseFlow/",
                screenshotSrc: "/assets/screenshots/dashpot.png"
            },
            {
                name: "Rosanna",
                description: "A WhatsApp Web scraper/API for Python.",
                type: "python",
                githubURL: "https://github.com/slippedandmissed/Rosanna"
            },
            {
                name: "LiveConsole",
                description: "An interactive Python console for during runtime.",
                type: "python",
                githubURL: "https://github.com/slippedandmissed/liveconsole"
            },
            {
                name: "JEmPy",
                description: "Java Embedder for Python. Execute Java code from within a Python script.",
                type: "python",
                githubURL: "https://github.com/slippedandmissed/JEmPy"
            }
        ]
    },
    {
        title: "Books", path: "books", projects: [
            {
                name: "Art and Algorithmics: A World of Procedural Trees",
                description: "An introduction to algorithmic botany and Python graphics.",
                type: "pdf",
                downloadURL: "/assets/pdfs/Art_And_Algorithmics.pdf",
                iconSrc: "/assets/icons/art_and_algorithmics.jpg",
                amazonURL: "https://www.amazon.co.uk/Art-Algorithmics-World-Procedural-Trees/dp/1661793258"
            },
            {
                name: "For the Love of God, Don't Try to Implement That Yourself",
                description: "A beginner-level guide to HTML, CSS, and JavaScript.",
                unfinished: true,
                type: "pdf",
                downloadURL: "/assets/pdfs/For_the_Love_of_God__Don_t_Try_To_Implement_That_Yourself.pdf"
            }
        ]
    },
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
                liveURL: "http://novals.co.uk",
                screenshotSrc: "/assets/screenshots/novals.png"
            },
            {
                name: "Doodle Jump Clone",
                description: "Copy of the popular app \"Doodle Jump\".",
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
    {
        title: "Procedural Art", path: "art", projects: [
            {
                name: "RegBelle",
                description: "A somewhat automated animation engine. Automatically lip sync an animated character to your voice.",
                type: "python",
                githubURL: "https://github.com/Cause-App/RegBelle"
            },
            {
                name: "String and Nails",
                description: "Animate a string wrapping around a bed of nails to look like an image.",
                type: "python",
                githubURL: "https://github.com/slippedandmissed/String-and-Nails"
            },
            {
                name: "ASCII Art",
                description: "Create ASCII art of an image or video.",
                type: "python",
                githubURL: "https://github.com/slippedandmissed/python-ascii-art"
            },
            {
                name: "Whiteboard",
                description: "Create simulations of a hand drawing any image onto a whiteboard.",
                type: "python",
                githubURL: "https://github.com/slippedandmissed/Whiteboard"
            },
            {
                name: "Cat Tiler",
                description: "Turn any image into a collage of cat pictures.",
                type: "python",
                githubURL: "https://github.com/slippedandmissed/Cat-Tiler"
            },
            {
                name: "Maze Generator",
                description: "Generate a large maze PDF.",
                type: "processing",
                githubURL: "https://github.com/slippedandmissed/Maze-Generator"
            }
        ]
    },
    {
        title: "Maths Papers", path: "maths-papers", projects: [
            {
                name: "Cupcake Space",
                description: "A non-Euclidean space which fits within the unit circle.",
                type: "pdf",
                downloadURL: "/assets/pdfs/Cupcake_Space.pdf"
            },
            {
                name: "Axis Bending",
                description: "Transformations of curves when the x-axis is bent.",
                type: "pdf",
                downloadURL: "/assets/pdfs/Axis_Bending.pdf"
            },
            {
                name: "The Lemon Theorem",
                description: "Proof that 987654321/123456789 is suspiciously close to 8, extended to base n.",
                type: "pdf",
                downloadURL: "/assets/pdfs/The_Lemon_Theorem.pdf"
            },
            {
                name: "Polynomial Space",
                description: "An infinite-dimensional vector space of which each element represents a polynomial function.",
                type: "pdf",
                unfinished: true,
                downloadURL: "/assets/pdfs/Polynomial_Space.pdf"
            },
            {
                name: "See & Say Sequence",
                description: "Deriving a function which describes its input's digits in base-n positional notation.",
                type: "pdf",
                downloadURL: "/assets/pdfs/See___Say_Sequence.pdf"
            },
            {
                name: "High-Energy Economics",
                description: "A theoretical currency taking advantage of Lorentz transformations and the fact that gold has less mass when it is moving faster.",
                type: "pdf",
                downloadURL: "/assets/pdfs/High_Energy_Economics.pdf"
            }
        ]
    },
    {
        title: "Computer Science Papers", path: "comp-sci-papers", projects: [
            {
                name: "Algorithmic Functions as Mathematical Expressions",
                description: "A series of methods for converting algorithmic constructs into equations.",
                type: "pdf",
                downloadURL: "/assets/pdfs/Algorithmic_Functions_as_Mathematical_Expressions.pdf"
            },
            {
                name: "Drawing Images with Equations",
                description: "Methods for combining equations into a single equation whose graph is a given image.",
                type: "pdf",
                downloadURL: "/assets/pdfs/Drawing_Images_With_Equations.pdf"
            }
        ]
    },
    {
        title: "Miscellaneous Projects", path: "misc", projects: [
            {
                name: "Turing Machine Compiler",
                description: "A Turing Machine simulator and an assembly language which compiles into turing machine instructions. Includes an example program which generates arbitrarily accurate approximations of π.",
                type: "python",
                githubURL: "https://github.com/slippedandmissed/TuringMachineCompiler"
            },
            {
                name: "J++",
                description: "A visual programming language designed to teach an intuitive understanding of programming concepts.",
                type: "python",
                githubURL: "https://github.com/slippedandmissed/J-Plus-Plus"
            },
            {
                name: "Cheryl",
                description: "A Java-based IRC-style web chat client.",
                type: "java",
                githubURL: "https://github.com/slippedandmissed/Cheryl"
            }
        ]
    },
];