const myImage = new Image()

var dataList = [ 'sh2', 'vk', 'shreya', 'sadaf2', 'sadaf3', 'mummy',  'pro' , 'sadaf']
// var dataList = ['family',  'vk', 'mummy', 'vidisha', 'pro']



myImage.addEventListener('load', () => {
let imgData = dataList[Math.floor(Math.random() * dataList.length)];

fetch('imgData/' + imgData + '.txt').then(res => res.text()).then(src => myImage.src = src)

    const canvas = document.getElementById('canvas')

    canvas.width = 300
    canvas.height = 700
    

    const ctx = canvas.getContext('2d')

    ctx.drawImage(myImage, 0, 0, canvas.width, canvas.height)

    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // console.log('pisels', pixels)

    let particles = []
    const noOfParticles = 5000

    let mappedImage = []

    for (let y = 0; y < canvas.height; y++) {

        let row = []

        for (let x = 0; x < canvas.width; x++) {
            const red = pixels.data[(y * 4 * pixels.width) + (x * 4)]
            const green = pixels.data[(y * 4 * pixels.width) + (x * 4 + 1)]
            const blue = pixels.data[(y * 4 * pixels.width) + (x * 4 + 2)]
            const brightness = relativeBrightness(red, green, blue) 
            const cell = [
                brightness,
            ]
            row.push(cell)
        }

        mappedImage.push(row)
    }

    function relativeBrightness(r, g, b) {
        return Math.sqrt(
            (r * r) * 0.3 +
            (g * g) * 0.3 +
            (b * b) * 0.3
           
        ) / 100
    }

    function init() {
        for (let i = 0; i < noOfParticles; i++) {
            particles.push(new Particle(canvas.width, canvas.height))
        }
    }

    init()

    function animate() {

        ctx.globalAlpha = 0.05;
        ctx.fillStyle = 'black'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.globalAlpha = 0.2;

        for (let i = 0; i < particles.length; i++) {

            particles[i].update(mappedImage)
            ctx.globalAlpha = particles[i].speed * 0.5;
            particles[i].draw(ctx)
        }


        requestAnimationFrame(animate)
    }
    animate()

})


