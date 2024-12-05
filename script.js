// const deafultBoard = document.getElementById('deafult-layout'),
//         wood = document.getElementById('wood'),
//         marble = document.getElementById('marble'),
// var dark = 
//     light =

// function boardCells() {
//     if 
// }


document.addEventListener("DOMContentLoaded", () => {
    const radioButtons = document.querySelectorAll('input[name="board-cells"]');
    const lightSquares = document.querySelectorAll(".square.light");
    const darkSquares = document.querySelectorAll(".square.dark");

    // Function to apply the board theme
    const applyBoardTheme = (theme) => {
        switch (theme) {
            case "wood":
                lightSquares.forEach(square => square.style.backgroundColor = "#f5deb3"); // Light wood
                darkSquares.forEach(square => square.style.backgroundColor = "#8b4513"); // Dark wood
                break;
            case "marble":
                lightSquares.forEach(square => square.style.backgroundColor = "#f8f8f8"); // Light marble
                darkSquares.forEach(square => square.style.backgroundColor = "#a9a9a9"); // Dark marble
                break;
            default: // "deafult-layout"
                lightSquares.forEach(square => square.style.backgroundColor = "white");
                darkSquares.forEach(square => square.style.backgroundColor = "black");
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
    applyBoardTheme("deafult-layout");
});
