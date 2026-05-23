import './style.css'

const hourMinuteSeconds = document.querySelector('#hour-minute-second')
const canvas = document.querySelector('#canvas')

function updateClockTime() {
    const now = new Date()
    const hours = now.getHours()
    const minutes = now.getMinutes()
    const seconds = now.getSeconds()
    
    hourMinuteSeconds.innerHTML = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    
    setTimeout(updateClockTime, 1000)
}

updateClockTime()