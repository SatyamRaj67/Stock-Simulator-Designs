const achievements_data = [
  {
    id: 1,
    title: "First Trade",
    description: "Complete your first stock trade.",
    points: 10,
    needed_score: 1,
    current_score: 1,
  },
  {
    id: 2,
    title: "Portfolio Builder",
    description: "Build a portfolio with at least 5 different stocks.",
    points: 20,
    needed_score: 5,
    current_score: 3,
  },
  {
    id: 3,
    title: "Market Watcher",
    description: "Check the stock market daily for a week.",
    points: 15,
    needed_score: 7,
    current_score: 2,
  },
  {
    id: 4,
    title: "High Roller",
    description: "Make a trade worth over $10,000.",
    points: 25,
    needed_score: 10_000,
    current_score: 1_000,
  },
  {
    id: 5,
    title: "Diversifier",
    description: "Invest in at least 3 different sectors.",
    points: 30,
    needed_score: 3,
    current_score: 3,
  },
  {
    id: 6,
    title: "Long-Term Investor",
    description: "Hold a stock for more than 6 months.",
    points: 40,
    needed_score: 1,
    current_score: 0,
  },
];

(() => {
  const achievementsList = document.getElementById("achievements");
  const fragment = document.createDocumentFragment();

  achievements_data.forEach((achievement) => {
    const li = document.createElement("li");
    li.style.setProperty(
      "--completion-percent",
      `${(achievement.current_score / achievement.needed_score) * 100}%`,
    );

    if (achievement.current_score >= achievement.needed_score) {
      li.classList.add("completed");
    }

    li.innerHTML = `
      <h2>${achievement.title}</h2>
      <p>${achievement.description}</p>
      <span>Points: ${achievement.points}</span>
    `;
    fragment.appendChild(li);
  });
  achievementsList.appendChild(fragment);
})();
