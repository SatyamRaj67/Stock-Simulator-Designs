const leaderboard_data = [
  {
    name: "Satyam Raj",
    profile_pic: "../../public/Satyam.png",
    score: 2500,
  },
  {
    name: "Also Ananya",
    profile_pic: "../../public/Misti.png",
    score: 2300,
  },
  {
    name: "Ananya",
    profile_pic: "../../public/profile.jpeg",
    score: 2400,
  },
  {
    name: "Aaradhya",
    profile_pic: "../../public/Aaradhya.jpg",
    score: 1250,
  },
  {
    name: "Priyanshi",
    profile_pic: "../../public/Priyanshi.jpg",
    score: 1750,
  },
  {
    name: "Ronit",
    profile_pic: "../../public/Ronit.png",
    score: 900,
  },
  {
    name: "Sanskriti",
    profile_pic: "../../public/Sanskriti.png",
    score: 2200,
  },
  {
    name: "Amisha",
    profile_pic: "../../public/Amisha.jpg",
    score: 650,
  },
];

(() => {
  // === Leaderboard Rendering ===
  const tbody = document.getElementById("leaderboard");
  const fragment = document.createDocumentFragment();

  leaderboard_data.sort((a, b) => b.score - a.score);
  const max_score = leaderboard_data[0].score;

  leaderboard_data.forEach((user, index) => {
    const li = document.createElement("li");
    li.style.setProperty(
      "--score-percent",
      ((user.score / max_score) * 100).toFixed(2) + "%",
    );
    li.style.setProperty("--i", index);
    li.innerHTML = `
            <span class="rank">${index + 1}</span>
            <div class="content">
              <img src="${user.profile_pic}" alt="${user.name}'s profile picture" class="profile-pic"/>
              <span class="name">${user.name}</span>
            </div>
            <span class="score">${user.score} pts</span>
        `;
    fragment.appendChild(li);
  });
  tbody.appendChild(fragment);

  // === Showcase Top 3 Users ===
  const ranks = ["first", "second", "third"];

  ranks.forEach((rankClass, index) => {
    const user = leaderboard_data[index];
    const element = document.querySelector(`.${rankClass}`);

    if (element && user) {
      element.querySelector("h2").textContent = user.name;
      element.querySelector("img").src = user.profile_pic;
    }
  });
})();
