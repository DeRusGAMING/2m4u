const { join } = require("path");
const fetch = require("node-fetch");
const { writeFileSync } = require("fs");

const WriteReadMe = async () => {
  const ReadMe = join(__dirname, "..", "README.md");
  const date = new Date();

  let data = await fetch(
    `https://fortnite-api.com/v2/stats/br/v2?name=${process.env.FORTNITE_USERNAME}`,
    {
      headers: {
        Authorization: process.env.API_SECRET, 
      },
    }
  ).then((res) => res.json());
 
  const text = `
  Welcome **Github User** to the Code Land of 2M4U (me),<br>
  What you see below is a future project for updating my<br>
  In-Game Fortnite Statistics, Feel free to Fork this repository<br>
  If you wish to see how this works. <br>
  🏆 Current Level: ${data.data.battlePass.level}<br>
  🎉 Progress To Next Level: ![](https://geps.dev/progress/${
    data.data.battlePass.progress
  })<br>
  🎯 Total Kills: ${data.data.stats.all.overall.kills.toLocaleString()}<br>
  💀 Total Deaths: ${data.data.stats.all.overall.deaths.toLocaleString()}<br>
  👑 Total Wins: ${data.data.stats.all.overall.wins.toLocaleString()}<br>
\`\`\`js
const Fortnite_Stats = {
    Season: {    
      Current_Level: "${data.data.battlePass.level}",
      Progress_To_Next_Level: "${data.data.battlePass.progress}%",
      Kills: "${data.data.stats.all.overall.kills.toLocaleString()}",
      Deaths: "${data.data.stats.all.overall.deaths.toLocaleString()}"
    },
    Total_Wins: "${data.data.stats.all.overall.wins.toLocaleString()}",
}; 
\`\`\`

<!-- Last updated on ${date.toString()} ;-;-->
<i>Last updated on ${date.getDate()}${
    date.getDate() === 1
      ? "st"
      : date.getDate() === 2
      ? "nd"
      : date.getDate() === 3
      ? "rd"
      : "th"
  } ${
    [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ][date.getMonth()]
  } ${date.getFullYear()} @ ${
    ("0" + date.getHours()).slice(-2) +
    ":" +
    ("0" + date.getMinutes()).slice(-2) +
    ";" +
    ("0" + date.getSeconds()).slice(-2)
  } using magic</i>✨`;
  writeFileSync(ReadMe, text);
};

(() => {
  WriteReadMe();
})();

