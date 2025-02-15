const port = 4001;

const socket = io(`http://localhost:${port}`, {
  auth: { token }
});

const scoreboardList = document.getElementById("scoreboard-list");

// Listen for live updates
socket.on("receiveMessage", (data) => {
  console.log("Received message:", data);
  updateScoreboard(data);
});

// Listen for user score updates
socket.on("userScoreUpdate", (data) => {
  console.log("Received updated scores:", data);
  updateScoreboard(data);
});

// Create score board
function scoreboard(scores) {
  // GET: Fetch user score data from the server
  // render it in html
  scoreboardList.innerHTML = "";
  scores.forEach((score) => {
    const li = document.createElement("li");
    li.classList.add("score-item");
    li.innerHTML = `<span>${score.userId}</span><span>${score.score}</span>`;
    scoreboardList.appendChild(li);
  });
}

// STEP 1: Client Logs In & Gets a JWT
// The client sends a login request (POST /login) to the server.
// The server verifies the credentials and responds with a JWT.
// The client stores this JWT in localStorage.

 function login(username, password) {
// This login function handles user authentication by sending a login request to the backend. 
// If the login is successful, it stores the JWT token in localStorage and establishes a WebSocket connection.
}

// STEP 2: Client Connects to WebSocket with JWT
// The client sends the JWT when connecting to WebSocket.
// The server validates the JWT before allowing the connection.

function connectSocket() {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No token found, WebSocket connection aborted.");
    return;
  }

  socket.on("receiveMessage", (data) => {
    console.log("Received message:", data);
  });
}

// STEP 4: Client Requests Protected Data
// The client sends an API request with the JWT in the Authorization header.
async function getProtectedData() {
  const token = localStorage.getItem('token');

  const res = await fetch('http://localhost:4001/protected', {
    headers: { Authorization: `Bearer ${token}` }
  });

  const data = await res.json();
  console.log('Protected data:', data);
}

// STEP 5: Client Sends Real-Time Score Updates
// The client emits the score update via WebSocket.
function updateScore(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const score = parseInt(document.getElementById("score").value);

  const scoreData = { username, score };
  socket.emit("userScoreUpdate", scoreData);
}
