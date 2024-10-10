
const movingText = {
    text: "This text is moving!",
    position: [0, 0],
    direction: [1, 1],
    speed: 10,
    move: function(element, elapsed) {
        this.position[0] += elapsed / 100 * this.speed * this.direction[0];
        this.position[1] += elapsed / 100 * this.speed * this.direction[1];

        if (document.body.clientWidth <= this.position[0] + element.clientWidth || this.position[0] <= 0) {
            this.direction[0] = -this.direction[0];
            
        }
        if (document.body.clientHeight <= this.position[1] + element.clientHeight || this.position[1] <= 0) {
            this.direction[1] = -this.direction[1];
        }

        console.log(this.text, "Position:", this.position);
    }
};

const textElement = document.createElement('div');
textElement.style.position = 'absolute';
textElement.style.left = `${movingText.position[0]}px`;
textElement.style.top = `${movingText.position[1]}px`;
textElement.innerText = movingText.text;
document.body.appendChild(textElement);


let prev;

function step(timestamp) {
    if (prev === undefined) {
        prev = timestamp;
    }
    const elapsed = timestamp - prev;

    movingText.move(textElement, elapsed);
    textElement.style.left = `${movingText.position[0]}px`;
    textElement.style.top = `${movingText.position[1]}px`;

    prev = timestamp;
    requestAnimationFrame(step);
}  

requestAnimationFrame(step);