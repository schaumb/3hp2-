const colors = ['red', 'blue', 'yellow', 'purple', 'orange', 'pink'];

const dropdown = document.getElementById("the-dropdown");

const arr = []

class MovingText {
    constructor(text = "This text is moving!") {
        this.text = text;
        this.position = [Math.random() * document.body.clientWidth, Math.random() * document.body.clientHeight];
        this.direction = [Math.random() * (Math.random() < 0.5 ? -1 : 1), Math.random() * (Math.random() < 0.5 ? -1 : 1)];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.speed = 20;
        this.clicks = 0;

        const v = Math.sqrt(this.direction[0] * this.direction[0] + this.direction[1] * this.direction[1]); 
        this.direction[0] /= v;
        this.direction[1] /= v;

        
        this.element = document.createElement('button');

        this.element.classList.add('moving-text');
        
        this.element.style.left = `${this.position[0]}px`;
        this.element.style.top = `${this.position[1]}px`;
        this.element.innerText = this.text;
        this.element.addEventListener("click", () => {
            if (confirm("\"" + this.text + "\" clicked"+ (this.clicks == 0 ? "" : " again") + ". Are you sure?" + (this.clicks == 0 ? " \nThen click that button again!" : " \nThis is the final decision!"))) {
                this.clicks += 1;
                if (this.clicks >= 2) {
                    for (const e of arr)
                        e.element.style.visibility = 'hidden';
                    arr.length = 0;
                    dropdown.classList.remove("hidden");
                } else {
                    for (const e of arr)
                        e.speed *= 1.5;

                }
            } 
        })
        
        document.body.appendChild(this.element);
    }

    move(elapsed) {
            this.position[0] += elapsed / 100 * this.speed * this.direction[0];
            this.position[1] += elapsed / 100 * this.speed * this.direction[1];
    
            this.element.classList.remove(this.color);
            if ((this.position[0] < 0 && this.direction[0] < 0) || 
                (document.body.clientWidth <= this.position[0] + this.element.clientWidth && this.direction[0] > 0)
            ) {
                this.direction[0] = -this.direction[0];
                this.color = colors[Math.floor(Math.random() * colors.length)];
            }
    
            if ((this.position[1] < 0 && this.direction[1] < 0) || 
                (document.body.clientHeight <= this.position[1] + this.element.clientHeight && this.direction[1] > 0)
                ) {
                this.direction[1] = -this.direction[1];
                this.color = colors[Math.floor(Math.random() * colors.length)];
            }
            this.element.classList.add(this.color);
            
            this.element.style.left = `${this.position[0]}px`;
            this.element.style.top = `${this.position[1]}px`;
    }
}


const buttons = dropdown.childElementCount - 1;
dropdown.addEventListener("click", () => {
    console.log("START")
    dropdown.classList.add("hidden");
    for (let index = 0; index < buttons; index++) {
        arr.push(new MovingText(document.getElementById("op"+(index+1)).innerText));
    }
})



let prev;

function step(timestamp) {
    if (prev === undefined) {
        prev = timestamp;
    }
    const elapsed = Math.min(timestamp - prev, 200);

    for (const i of arr)
        i.move(elapsed);

    prev = timestamp;
    requestAnimationFrame(step);
}  

requestAnimationFrame(step);