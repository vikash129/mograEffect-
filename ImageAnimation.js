const myImage = new Image()

var dataList = [ 'sh2',  'shreya']
// var dataList = ['family',  'vk', 'mummy', 'vidisha', 'pro']

let imgData = dataList[Math.floor(Math.random() * dataList.length)];

fetch('imgData/' + imgData + '.txt').then(res => res.text()).then(src => myImage.src = src)



myImage.addEventListener('load', () => {

    let h = window.innerHeight
    let w = window.innerWidth
    // let h = 100
    // let w = 150

    const canvas = document.getElementById('canvas')

    if (w > 700 || h > 800){w = 700 ; h = 800}
    canvas.width = w
    canvas.height = h
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px'

    const ctx = canvas.getContext('2d')

    const grd1 = ctx.createLinearGradient( 0, 0, canvas.width, canvas.height)
    grd1.addColorStop(0 , 'green')
    grd1.addColorStop(0.1 , 'white')
    grd1.addColorStop(0.2 , 'pink')
    grd1.addColorStop(0.3 , 'orange')
    grd1.addColorStop(0.4 , 'yellow')
    grd1.addColorStop(0.5 , 'red')
    grd1.addColorStop(0.6 , 'blue')
    grd1.addColorStop(0.7 , 'green')
    grd1.addColorStop(0.8 , 'turquoise')
    grd1.addColorStop(0.9 , 'violet')
    grd1.addColorStop(1 , 'rgb(190 135 34)')

    ctx.drawImage(myImage, 0, 0, canvas.width, canvas.height)

    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height)
    
    ctx.clearRect(0, 0, canvas.width, canvas.height)


    let particles = []
    const noOfParticles = 7000

    let mappedImage = []

    for (let y = 0; y < canvas.height; y++) {

        let row = []

        for (let x = 0; x < canvas.width; x++) {

            const red = pixels.data[(y * 4 * pixels.width) + (x * 4)]
            const green = pixels.data[(y * 4 * pixels.width) + (x * 4 + 1)]
            const blue = pixels.data[(y * 4 * pixels.width) + (x * 4 + 2)]
//100 - 200

            const brightness = relativeBrightness(red, green, blue) // 0.1 - 1.9

            const cell = [
                brightness,
            ]
            // rgba(r , g , b , intensity)

            // console.log(brightness )
            row.push(cell)
        }

        mappedImage.push(row)

    }
// console.log(row.length , mappedImage.length)


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
        // ctx.fillStyle = '#33495f'
        ctx.fillStyle = '#000000'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.globalAlpha = 0.2;

        for (let i = 0; i < particles.length; i++) {

            particles[i].update(mappedImage)
            ctx.globalAlpha = particles[i].speed * 0.5;
            particles[i].draw(ctx , grd1)
        }


        requestAnimationFrame(animate)
    }
    animate()

})


