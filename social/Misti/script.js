(() => {
  const messagesEl = document.querySelector(".messages");
  const messagesContentEl = document.querySelector(".messages-content");
  const inputEl = document.querySelector(".message-input");
  const submitBtn = document.querySelector(".message-submit");

  if (!messagesEl || !messagesContentEl || !inputEl || !submitBtn) return;

  const botReplies = [
    "Hmm.",
    "Haan… samajh rahi hoon.",
    "Thoda ruk ke sochne do.",
    "Theek hai, bolo.",
    "Aaj ka din kaisa tha?",
    "Purani baatein yaad aa rahi hain.",
    "Kuch cheezein waqt ke saath aur saaf ho jaati hain.",
    "Main zyada nahi bolti… par sunti zaroor hoon.",
    "Chalo, dheere-dheere.",
    "Waise… interesting.",
    "Bas thoda sa coffee hota to maza aa jata.",
    "Silence bhi kabhi-kabhi answer hota hai.",
    "Haan, continue.",
    "Hmm… acha.",
    "Sahi kaha.",
    "Aaj hawa me kuch alag sa hai.",
    "Okay. Main yahin hoon.",
    "Arre waah!",
    "Oho—yeh to badi baat hai!",
    "Nice!",
    "Batao batao!",
    "Hehe… good.",
    "Chalo, ab mujhe curiosity ho gayi.",
    "Sun ke acha laga.",
  ];

  let replyIndex = 0;
  let typingEl = null;

  function pad2(n) {
    return String(n).padStart(2, "0");
  }

  function timestamp() {
    const d = new Date();
    return `${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (c) => {
      switch (c) {
        case "&":
          return "&amp;";
        case "<":
          return "&lt;";
        case ">":
          return "&gt;";
        case '"':
          return "&quot;";
        case "'":
          return "&#039;";
        default:
          return c;
      }
    });
  }

  function scrollToBottom() {
    requestAnimationFrame(() => {
      messagesEl.scrollTop = messagesEl.scrollHeight;
    });
  }

  function makeMessage({ html, personal = false, loading = false }) {
    const msg = document.createElement("div");
    msg.className = "message new";
    if (personal) msg.classList.add("message-personal");
    if (loading) msg.classList.add("loading");

    msg.innerHTML = html;

    messagesContentEl.appendChild(msg);

    const ts = document.createElement("div");
    ts.className = "timestamp";
    ts.textContent = timestamp();
    msg.appendChild(ts);

    scrollToBottom();
    return msg;
  }

  function showTyping() {
    hideTyping();
    typingEl = makeMessage({
      loading: true,
      html: `
        <figure class="avatar">
          <img src="../../public/Misti.png" alt="Misti"/>
        </figure>
        <span></span>
      `,
    });
  }

  function hideTyping() {
    if (typingEl) {
      typingEl.remove();
      typingEl = null;
    }
  }

  function botRespond() {
    showTyping();

    const delay = 650 + Math.random() * 900;
    window.setTimeout(() => {
      hideTyping();

      const reply = botReplies[replyIndex] ?? "Tell me more.";
      replyIndex += 1;

      makeMessage({
        html: `
          <figure class="avatar">
            <img src="../../public/Misti.png" alt="Misti"/>
          </figure>
          ${escapeHtml(reply)}
        `,
      });
    }, delay);
  }

  function insertUserMessage() {
    const raw = inputEl.value;
    const msg = raw.trim();
    if (!msg) return;

    makeMessage({
      personal: true,
      html: escapeHtml(msg),
    });

    inputEl.value = "";
    inputEl.focus();

    botRespond();
  }

  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    insertUserMessage();
  });

  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      insertUserMessage();
    }
  });

  window.setTimeout(() => {
    makeMessage({
      html: `
        <figure class="avatar">
          <img src="../../public/Misti.png" alt="Misti"/>
        </figure>
        ${escapeHtml("Hey! Send a message to start the chat.")}
      `,
    });
  }, 150);
})();
