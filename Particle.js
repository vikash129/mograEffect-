class Particle {

    constructor(w , h ) {
        this.w = w
        this.h = h
        this.x = Math.random() * w;
        this.y = 0;
        this.speed = 0;
        this.vel = Math.random() * 0.5 + 1 ;
        this.size = Math.random() * 1.5 + 1;
    }

    update(mappedImage) {
        
        this.posy = Math.floor(this.y)
        this.posx = Math.floor(this.x)
        
        this.speed = mappedImage[this.posy][this.posx][0]
       
        let movement = (2.5 - this.speed) + this.vel + 1
        this.y += movement  ;

        if (this.y >= this.h) {
            this.y = 0;
            this.x = Math.random() * this.w
        }
    }
    draw(ctx) {
        ctx.beginPath()
        ctx.fillStyle = '#FFFAFA'
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
    }


}
