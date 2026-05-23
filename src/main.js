import './style.css'

const hourMinuteSeconds = document.querySelector('#hour-minute-second')
const canvas = document.querySelector('#canvas')

const width = 300
const height = 300

function drawClock() {

    if(canvas.getContext('2d')) {

        const ctx = canvas.getContext('2d')

        ctx.beginPath()

        ctx.arc(width / 2, height / 2, width / 2 - 5, 0, Math.PI * 2, true)
        ctx.lineWidth = 4
        ctx.stroke()

        ctx.closePath()

        // linhas das horas do relógio
        for(var i = 0; i < 12; i++) {

            ctx.beginPath()

            const cosNum = Math.cos((i/12)*(Math.PI*2))
            const sinNum = Math.sin((i/12)*(Math.PI*2))

            var endRadiusOffset = 30

            if([0, 3, 6, 9].includes(i)) {
                ctx.strokeStyle = 'red'
                endRadiusOffset = 55
            } else {
                ctx.strokeStyle = 'black'
            }

            const startRadius = ((width / 2) - 10)
            const endRadius = ((width / 2) - endRadiusOffset)

            const startX = (width / 2) + startRadius * cosNum
            const startY = (height / 2) + startRadius * sinNum

            const endX = (width / 2) + endRadius * cosNum
            const endY = (height / 2) + endRadius * sinNum
        
            ctx.moveTo(startX, startY)
            ctx.lineTo(endX, endY)

            ctx.lineWidth = 5

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

            const startRadius = ((width / 2) - (45 + fontHeight))

            const x = (width / 2) + startRadius * cosNum
            const y = (height / 2) + startRadius * sinNum

            if([0, 3, 6, 9].includes(i)) {
                ctx.fillText(hoursList[i], x, y)
            }

            ctx.closePath()

        }
    
    } else {

        console.log('Elemento canvas não suportado pelo navegador!')

    }

}

drawClock()

function updateClockTime() {

    const now = new Date()
    const hours = now.getHours()
    const minutes = now.getMinutes()
    const seconds = now.getSeconds()
    
    hourMinuteSeconds.innerHTML = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    
    setTimeout(updateClockTime, 1000)

}

updateClockTime()