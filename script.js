// Website's name in curvy shape
const curvedText = document.querySelector('#pseudo');
const text = curvedText.textContent.trim();
    curvedText.textContent = ''; // Clear original text

    const radius = 300; // Distance from the center to the text (curve height) → here where should you play 😉
    const totalAngle = Math.PI / 4; // Total angle for the curve (Math.PI = semi-circle) → and here too (change the divisor, or eliminate it)

  // Create spans for each character
    [...text].forEach((char, i, arr) => {
    const span = document.createElement('span');
    span.textContent = char;

    // Calculate angle for the character
    const charAngle = (i / (arr.length - 1)) * totalAngle - totalAngle / 2;

    // Position and rotate the character along the curve
    const x = radius * Math.sin(charAngle); // Horizontal position
    const y = radius * (1 - Math.cos(charAngle)); // Vertical position (offset for flatter curve)

    span.style.transform = `translate(${x}px, ${y}px) rotate(${charAngle}rad)`;
    curvedText.appendChild(span);
});





// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //
// Chess board cells design selecting :

document.addEventListener("DOMContentLoaded", () => {
    const radioButtons = document.querySelectorAll('input[name="board-cells"]');
    const lightSquares = document.querySelectorAll(".square.light");
    const darkSquares = document.querySelectorAll(".square.dark");

    // Function to apply the board theme
    const applyBoardTheme = (theme) => {
        switch (theme) {
            case "classic":
                lightSquares.forEach(square => square.style.backgroundColor = "white"); 
                darkSquares.forEach(square => square.style.backgroundColor = "black"); 
                break;
            case "marble":
                lightSquares.forEach(square => square.style.backgroundColor = "#f8f8f8"); // Light marble
                darkSquares.forEach(square => square.style.backgroundColor = "#a9a9a9"); // Dark marble
                break;
            default: // "deafult-layout" → the wooden one, because it suits better the chess pieces (classic ones → black & white)
                lightSquares.forEach(square => square.style.backgroundColor = "#f5deb3"); // Light wood
                darkSquares.forEach(square => square.style.backgroundColor = "#8b4513"); // Dark wood
                break;
        }
    };

    // Add event listeners to each radio button
    radioButtons.forEach(button => {
        button.addEventListener("change", (event) => {
            applyBoardTheme(event.target.value);
        });
    });

    // Initialize the board with the default theme
    applyBoardTheme("wood");
});






// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //
// Game initialization :

document.addEventListener("DOMContentLoaded", () => {
    const boardElement = document.getElementById("board");
    const startButton = document.querySelector("button:first-of-type");
    const teamRadios = document.querySelectorAll("input[name='team']");
    let currentPlayerColor = "light"; // Default player color
    let timerInterval = null;

    // Initialize piece setup
    const piecePositions = {
    light: {
        pawns: ["a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2"],
        backRow: ["a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1"],
    },
    dark: {
        pawns: ["a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7"],
        backRow: ["a8", "b8", "c8", "d8", "e8", "f8", "g8", "h8"],
    },
    };

    const pieceFiles = {
        pawns: "pawn",
        rooks: "rook",
        knights: "knight",
        bishops: "bishop",
        queen: "queen",
        king: "king",
    };

    const createPiece = (type, color, position) => {
    const img = document.createElement("img");
    img.src = `./media/${color}/${color === "light" ? "white" : "black"}-${pieceFiles[type]}.svg`;
    img.alt = `${color} ${type}`;
    img.classList.add("chess-piece");
    document.getElementById(position).appendChild(img);
    };

    const setupPieces = (playerColor) => {
    const opponentColor = playerColor === "light" ? "dark" : "light";

    // Clear any existing pieces
    document.querySelectorAll(".chess-piece").forEach((piece) => piece.remove());

    // Set up player's pieces
    piecePositions[playerColor].pawns.forEach((pos) =>
        createPiece("pawns", playerColor, pos)
    );
    ["a1", "h1"].forEach((pos) => createPiece("rooks", playerColor, pos));
    ["b1", "g1"].forEach((pos) => createPiece("knights", playerColor, pos));
    ["c1", "f1"].forEach((pos) => createPiece("bishops", playerColor, pos));
    createPiece("queen", playerColor, "d1");
    createPiece("king", playerColor, "e1");

      // Set up opponent's pieces
    piecePositions[opponentColor].pawns.forEach((pos) =>
        createPiece("pawns", opponentColor, pos)
    );
    ["a8", "h8"].forEach((pos) => createPiece("rooks", opponentColor, pos));
    ["b8", "g8"].forEach((pos) => createPiece("knights", opponentColor, pos));
    ["c8", "f8"].forEach((pos) => createPiece("bishops", opponentColor, pos));
    createPiece("queen", opponentColor, "d8");
    createPiece("king", opponentColor, "e8");
    };

    const startCountdown = () => {
    const countdownElement = document.createElement("div");
    countdownElement.id = "countdown";
    countdownElement.style.position = "absolute";
    countdownElement.style.top = "700px";
    countdownElement.style.right = "10px";
    countdownElement.style.background = "rgba(0, 0, 0, 0.7)";
    countdownElement.style.color = "white";
    countdownElement.style.padding = "10px";
    countdownElement.style.borderRadius = "5px";
    document.body.appendChild(countdownElement);

      let timeRemaining = 120; // 2 minutes in seconds

    const updateTimer = () => {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        countdownElement.textContent = `Time remaining: ${minutes}:${seconds
        .toString()
        .padStart(2, "0")}`;

        if (timeRemaining <= 0) {
        clearInterval(timerInterval);
        alert("Time is up! Opponent's turn.");
        // Logic for switching turns can go here
        }

        timeRemaining -= 1;
    };

    updateTimer(); // Initial update
    timerInterval = setInterval(updateTimer, 1000);
    };

    startButton.addEventListener("click", () => {
    // Get the selected team color
    const selectedTeam = Array.from(teamRadios).find((radio) => radio.checked);
    if (!selectedTeam) {
    alert("Please select a team color!");
    return;
    }

    currentPlayerColor = selectedTeam.value;

      // Set up pieces and start the game
    setupPieces(currentPlayerColor);

      // Start the timer
    startCountdown();
    });
});