const leaderboard_data = [
  {
    name: "Satyam Raj",
    profile_pic: "../../public/Satyam.png",
    score: 2500,
  },
  {
    name: "Also Ananya",
    profile_pic: "../../public/Misti.jpeg",
    score: 2400,
  },
  {
    name: "Ananya",
    profile_pic: "../../public/profile.jpeg",
    score: 2300,
  },
{
    name: "Rohit Sharma",
    profile_pic: "../../public/profile.jpeg",
    score: 1250,
},
{
    name: "Priya Singh",
    profile_pic: "../../public/profile.jpeg",
    score: 1750,
},
{
    name: "Aarav Mehta",
    profile_pic: "../../public/profile.jpeg",
    score: 900,
},
{
    name: "Neha Verma",
    profile_pic: "../../public/profile.jpeg",
    score: 2200,
},
{
    name: "Kunal Jain",
    profile_pic: "../../public/profile.jpeg",
    score: 650,
},
];

(() => {
  const tbody = document.querySelector("tbody");
  const fragment = document.createDocumentFragment();

  leaderboard_data.sort((a, b) => b.score - a.score);

  leaderboard_data.forEach((user, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
            <td data-label="RANK">${index + 1}</td>
            <td data-label="USER">
                    ${user.name}
            </td>
            <td data-label="SCORE">${user.score}</td>
        `;
    fragment.appendChild(tr);
  });
  tbody.appendChild(fragment);
})();
