document.addEventListener("keydown", checkLaunch);

function checkLaunch(event) {
    if (event.shiftKey && event.ctrlKey && event.key === "K") {
        setupReadingBracket();
    }
    if (event.key == "]"){
        readingBoxDistance += incrementAmmount;
    } else if(event.key == "[") {
        readingBoxDistance = Math.max(readingBoxDistance-incrementAmmount, 0);
    };
}

let readingBoxDistance = 10;
let incrementAmmount = 3

function setupReadingBracket() {
    // Create top bar
    const topbar = document.createElement("div");
    topbar.id = "topbar"; // Unique ID
    topbar.style.position = "fixed";
    topbar.style.display = "block";
    topbar.style.width = "100%";
    topbar.style.height = "100%"; // Fixed height
    topbar.style.backgroundColor = "rgba(0,0,0,0.7)"; // Fixed syntax
    topbar.style.zIndex = "10";
    document.body.appendChild(topbar);

    // Create bottom bar
    const botbar = document.createElement("div");
    botbar.id = "botbar"; // Unique ID
    botbar.style.position = "fixed";
    botbar.style.display = "block";
    botbar.style.width = "100%";
    botbar.style.height = "100%"; // Fixed height
    botbar.style.backgroundColor = "rgba(0,0,0,0.7)"; // Fixed syntax
    botbar.style.zIndex = "10";
    document.body.appendChild(botbar);

    // Define mousemove handler
    const mouseMoveHandler = (event) => {
        // Update top bar position (bottom of topbar 10px above mouse)
        topbar.style.top = `${event.clientY - topbar.offsetHeight - readingBoxDistance}px`;
        // Update bottom bar position (top of bottom bar 10px below mouse)
        botbar.style.top = `${event.clientY + readingBoxDistance}px`;
    };

    // Add mousemove event listener
    document.addEventListener("mousemove", mouseMoveHandler);

    // Add click event listener to remove bars and mousemove listener
    const clickHandler = () => {
        topbar.remove();
        botbar.remove();
        document.removeEventListener("mousemove", mouseMoveHandler);
        document.removeEventListener("click", clickHandler);
    };

    // Attach click event listener
    document.addEventListener("click", clickHandler);
}