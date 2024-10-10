const movingText = {
    text: "This text is moving!",
    position: 0,
    speed: 1,
    move: function() {
        this.position += this.speed;
        console.log(this.text, "Position:", this.position);
    }
};

setInterval(() => {
    movingText.move();
}, 100);

