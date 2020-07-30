const portfolio = [
  {
    src: "./img/mineSweeper.png", 
    alt: "Minesweeper Game", 
    view: "https://game-minesweeper.glitch.me/",
    code: "https://github.com/eoja82/Mine-Sweeper",
    about: "A full stack app built with Node.js, Express, Mongoose, and MongoDB to store users' scores, and JavaScript for the game logic.",
    skills: ["JavaScript", "Node.js", "Express", "Mongoose", "MongoDB"]
  },
  {
    src: "./img/lakesideDemo.png",
    alt: "Gatsby / React Demo Website",
    view: "https://eoja82.github.io/lakeside-demo/",
    code: "https://github.com/eoja82/lakeside-demo",
    about: "A demonstration Gatsby/React website.  By simply adding images and updating a JSON file, (1) a new product page will be created, (2) a link to the product page will be added to the navigation, (3) a link in the products pages sidebar navigation will be added, and (4) a card like link to the product page will be added to the home page.",
    skills: ["React", "Gatsby", "GraphQL", "HTML", "CSS"]
  },
  {
    src: "./img/issueTracker.png", 
    alt: "Issue Tracker", 
    view: "https://multi-project-issue-tracker.glitch.me/",
    code: "https://github.com/eoja82/multi-project-issue-tracker",
    about: "Tracks issues for multiple projects.  Issues can be sorted by date and filtered by project, the user that created the issue, the user the issue is asigned to, and whether the issue is open or closed.",
    skills: ["JavaScript", "Node.js", "Express", "Mongoose", "MongoDB"]
  },
  {
    src: "./img/stockPriceChecker.png", 
    alt: "Stock Price Checker", 
    view: "https://fccstockpricecheck.glitch.me/",
    code: "https://github.com/eoja82/Stock-Price-Checker",
    about: "A full stack app built with JavaScript, Node.js, Mongoose, Express and MongoDB that gets current stock prices from an API.  The app also includes Chai assertion testing and Helmet information security.",
    skills: ["Node.js", "Express", "Mongoose", "MongoDB", "Chai", "JavaScript"]
  },
  {
    src: "./img/chatRoom.png", 
    alt: "Chat Room", 
    view: "https://rapid-powder.glitch.me/",
    code: "https://glitch.com/edit/#!/rapid-powder?path=server.js:1:0",
    about: "A full stack Socket.IO chat app.  Login with GitHub authentication strategy for Passport.",
    skills: ["JavaScript", "Node.js", "Express", "MongoDB", "Socket.IO", "Passport"]
  },
  {
    src: "./img/choroplethMap.png", 
    alt: "US Education Choropleth Map", 
    view: "https://codepen.io/EOJA/full/OePXNb",
    code: "https://github.com/eoja82/fcc-Data-Visualization-Projects/tree/master/ChoroplethMap",
    about: 'A D3.js data visualization project.  Follow the "View" link to see more D3.js projects.',
    skills: ["JavaScript", "D3.js", "HTML", "CSS"]
  },
  {
    src: "./img/pomodoroClock.png", 
    alt: "Pomodoro Clock", 
    view: "https://eoja82.github.io/Pomodoro-Clock",
    code: "https://github.com/eoja82/Pomodoro-Clock",
    about: "Built with React",
    skills: ["React", "HTML", "CSS"]
  },
  {
    src: "./img/calculator.png", 
    alt: "Calculator", 
    view: "https://eoja82.github.io/Calculator",
    code: "https://github.com/eoja82/Calculator",
    about: "Built with React, Bootstrap, HTML, and CSS",
    skills: ["React", "Bootstrap", "HTML", "CSS"]
  },
  {
    src: "./img/randomQuotes.png", 
    alt: "Random Quote Generator", 
    view: "https://eoja82.github.io/Random-Quote-Generator",
    code: "https://github.com/eoja82/Random-Quote-Generator",
    about: "Built with React, Bootstrap, HTML, and CSS.",
    skills: ["React", "Bootstrap", "HTML", "CSS"]
  }
];

const filters = [
  "JavaScript", "React", "Node.js", "MongoDB", "D3.js", "All"
];

export { portfolio, filters }