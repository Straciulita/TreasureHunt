var getRandomNumber = function(size) {
    return Math.floor(Math.random() * size);
}

let w = 700; // Set the width of the map
let h = 700; // Set the height of the map
let clicks = 0; // Counter for the number of clicks

var target = {
    x: getRandomNumber(w), // Random X coordinate for the target
    y: getRandomNumber(h)  // Random Y coordinate for the target
};

// Update the hint text and display it on the webpage
var updateHint = function(distance) {
    let hint = getDistanceHint(distance); 
    $("#hint").text(hint);  // Display the hint
};

var updateClicks = function() {
    $("#clicks").text(clicks); // Update the click counter

    // Display messages based on the number of clicks in the encouragement div
    if (clicks > 70) {
        $("#mesaj").text("GIVE UP ON THIS GAME!"); // Message for more than 70 clicks
    } else if (clicks > 50) {
        $("#mesaj").text("Congrats! You've passed 50 clicks! Almost there... 🔥");
    } else if (clicks === 30) {
        $("#mesaj").text("You're doing great! Keep it up! 😎");
    } else if (clicks === 10) {
        $("#mesaj").text("You're getting closer to the treasure! 🔍");
    }
};

// Event listener for map click
$("#map").click(function(event) {
    clicks++; // Increment the number of clicks
    let clickX = event.pageX - this.offsetLeft; // Get X coordinate of the click
    let clickY = event.pageY - this.offsetTop; // Get Y coordinate of the click

    let distance = Math.sqrt(Math.pow(target.x - clickX, 2) + Math.pow(target.y - clickY, 2)); // Calculate the distance to the target

    updateHint(distance); // Update the hint based on the distance
    updateClicks(); // Update the click count

    if (distance < 10) { // If the player clicks near the target
        alert("You found the treasure! 🏆"); // Show a pop-up message
        resetGame(); // Reset the game after finding the treasure
    }
});

// Function to give hints based on distance
var getDistanceHint = function(distance) {
    if (distance < 10) return "Super HOT🥵!";
    else if (distance < 20) return "Very HOT!";
    else if (distance < 40) return "HOT!";
    else if (distance < 80) return "Warm!";
    else if (distance < 160) return "COLD";
    else if (distance < 320) return "Very COLD";
    else return "FREEZING!🥶";
};

// Reset the game when the treasure is found or at the start
var resetGame = function() {
    clicks = 0; // Reset the click counter
    target = {
        x: getRandomNumber(w),
        y: getRandomNumber(h)
    }; // Generate a new random target location

    updateClicks(); // Update the click count display
    $("#hint").text("Start clicking to find the treasure!"); // Reset the hint
    $("#mesaj").text(""); // Clear the encouragement message when game resets
};

// Reset game when the page is loaded for the first time
$(document).ready(function() {
    resetGame(); // Start the game
});
