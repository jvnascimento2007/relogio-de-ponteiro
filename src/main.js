import './style.css'

const hourMinuteSeconds = document.querySelector('#hour-minute-second')
const canvas = document.querySelector('#canvas')

const width = 300
const height = 300

function drawClock(ctx) {

    ctx.clearRect(0, 0, width, height)

    ctx.beginPath()

    ctx.arc(width / 2, height / 2, width / 2 - 5, 0, Math.PI * 2, true)
    ctx.lineWidth = 4
    ctx.strokeStyle = 'black'
    ctx.stroke()

    ctx.closePath()

    // linhas das horas do relógio
    for(var i = 0; i < 12; i++) {

        ctx.beginPath()

        const cosNum = Math.cos((i/12)*(Math.PI*2))
        const sinNum = Math.sin((i/12)*(Math.PI*2))

        var endRadiusOffset = 35

        const startRadius = ((width / 2) - 10)
        const endRadius = ((width / 2) - endRadiusOffset)

        const startX = (width / 2) + startRadius * cosNum
        const startY = (height / 2) + startRadius * sinNum

        const endX = (width / 2) + endRadius * cosNum
        const endY = (height / 2) + endRadius * sinNum
    
        ctx.moveTo(startX, startY)
        ctx.lineTo(endX, endY)

        ctx.lineWidth = 5
        ctx.lineCap = 'butt'
        ctx.stroke()

        ctx.closePath()
    
    }

    // números das horas do relógio
    for(var i = 0; i < 12; i++) {

        const hoursList = ['3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '1', '2']

        ctx.beginPath()

        ctx.font = '25px monospace'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle';

        const measures = ctx.measureText(hoursList[i])

        const cosNum = Math.cos((i/12)*(Math.PI*2))
        const sinNum = Math.sin((i/12)*(Math.PI*2))

        const fontHeight = measures.fontBoundingBoxAscent + measures.fontBoundingBoxDescent;

        const startRadius = ((width / 2) - (25 + fontHeight))

        const x = (width / 2) + startRadius * cosNum
        const y = (height / 2) + startRadius * sinNum

        if([0, 3, 6, 9].includes(i)) {
            ctx.fillText(hoursList[i], x, y)
        }

        ctx.closePath()

    }

    // linhas dos minutos do relógio
    for(var i = 0; i < 60; i++) {

        ctx.beginPath()

        const cosNum = Math.cos((i/60)*(Math.PI*2))
        const sinNum = Math.sin((i/60)*(Math.PI*2))

        const startRadius = ((width / 2) - 10)
        const endRadius = ((width / 2) - 15)

        const startX = (width / 2) + startRadius * cosNum
        const startY = (height / 2) + startRadius * sinNum

        const endX = (width / 2) + endRadius * cosNum
        const endY = (height / 2) + endRadius * sinNum
    
        ctx.moveTo(startX, startY)
        ctx.lineTo(endX, endY)

        ctx.lineWidth = 2
        ctx.lineCap = 'butt'
        // só desenha dentro do intervalo de cinco minutos
        if(i % 5 != 0) {
            ctx.stroke()
        }

        ctx.closePath()

    }
}

function drawPointers(ctx, hours, minutes, seconds) {

    // ponteiro de horas
    // angulo ponteiro horas [(hora em segundos)/43200] * [Math.PI * 2]
    // centro do relógio segurando os ponteiros
    ctx.beginPath()

    var cosNum = Math.cos((hours/43200)*(Math.PI*2))
    var sinNum = Math.sin((hours/43200)*(Math.PI*2))

    var startX = (width/2) + 1 * cosNum
    var startY = (height/2) + 1 * sinNum

    var endX = (width/2) + 80 * cosNum
    var endY = (height/2) + 80 * sinNum

    ctx.moveTo(startX, startY)
    ctx.lineTo(endX, endY)

    ctx.lineWidth = 8
    ctx.strokeStyle = 'red'
    ctx.lineCap = 'round'
    ctx.stroke()

    ctx.closePath()

    // ponteiro de minutos
    // angulo ponteiro minutos [(minuto em segunods)/3600] * [Math.PI * 2]
    ctx.beginPath()

    cosNum = Math.cos((minutes/3600)*(Math.PI*2))
    sinNum = Math.sin((minutes/3600)*(Math.PI*2))

    startX = (width/2) + 1 * cosNum
    startY = (height/2) + 1 * sinNum

    endX = (width/2) + 95 * cosNum
    endY = (height/2) + 95 * sinNum

    ctx.moveTo(startX, startY)
    ctx.lineTo(endX, endY)

    ctx.lineWidth = 5
    ctx.strokeStyle = 'black'
    ctx.lineCap = 'round'
    ctx.stroke()

    ctx.closePath()

    // ponteiro de segundos
    ctx.beginPath()

    cosNum = Math.cos((seconds/60)*(Math.PI*2))
    sinNum = Math.sin((seconds/60)*(Math.PI*2))

    startX = (width/2) + 1 * cosNum
    startY = (height/2) + 1 * sinNum

    endX = (width/2) + 130 * cosNum
    endY = (height/2) + 130 * sinNum

    ctx.moveTo(startX, startY)
    ctx.lineTo(endX, endY)

    ctx.lineWidth = 2
    ctx.strokeStyle = 'black'
    ctx.lineCap = 'round'
    ctx.stroke()

    ctx.closePath()

    // centro do relógio segurando os ponteiros
    ctx.beginPath()

    ctx.arc(width / 2, height / 2, 5, 0, Math.PI * 2, true)
    ctx.fill()

    ctx.closePath()

}

function updateClockTime() {

    const now = new Date()
    const hours = now.getHours()
    const minutes = now.getMinutes()
    const seconds = now.getSeconds()
    
    hourMinuteSeconds.innerHTML = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

    if(canvas.getContext('2d')) {

        const ctx = canvas.getContext('2d')
        
        drawClock(ctx)

        var hoursInSeconds = (hours - 3) * 3600
        var minutesInSeconds = (minutes - 15) * 60

        drawPointers(ctx, hoursInSeconds, minutesInSeconds, seconds)

    } else {

        console.error('Navegador não suporta elemento canvas!')

    }
    
    window.requestAnimationFrame(updateClockTime)

}

window.requestAnimationFrame(updateClockTime)