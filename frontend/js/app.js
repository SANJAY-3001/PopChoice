import { saveSession } from "./session.js"


const startBtn = document.getElementById("start-btn")
startBtn.addEventListener('click' , () => {
    
    const noOfPeople = Number(document.getElementById("no-people").value)
    const timeStr = document.getElementById("time").value

    if(noOfPeople <= 0) {
        const error = document.getElementById("error")

        error.textContent = `Number of people can't be less than or equal to zero`

        setTimeout(()=>{
            error.textContent = ""
        } , 3000)

        return
    }

    const movieSession = {
        noOfPeople : noOfPeople,
        timeStr : timeStr,

        currentPerson : 1,

        answers : []
    }

    saveSession(movieSession)

    window.location.href = './questions.html'
})
