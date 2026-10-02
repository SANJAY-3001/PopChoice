import { getSession, saveSession } from "./session.js"

let movieSession = getSession()

if (!movieSession) window.location.href = 'index.html'




displayQuestions()


const nxtBtn = document.getElementById("nxt-btn")
nxtBtn.addEventListener('click' , async() => {
    const answers = getFormData()


    if(!allQuestionsAnswered(answers)) {
        const error = document.getElementById("error")
        error.textContent = "Select and Answer all the fields !"

        setTimeout(()=>{
            error.textContent = ""
        } , 3000)

        return
    }


    movieSession.answers.push({
        person : movieSession.currentPerson,
        answers : answers
    })

    if (movieSession.currentPerson < movieSession.noOfPeople) {

        movieSession.currentPerson++;

        saveSession(movieSession)

        resetQuestions()
        displayQuestions()
    }
    else {
        await sendToBackEnd()
    }

})


function getFormData() {

    const favoriteMovie = document.getElementById("favorite-movie").value
    const islandCompanion = document.getElementById("island-companion").value

    const moodAgeSelected = document.querySelector("#mood-age-group .choice-btn.selected")
    const moodTypeSelected = document.querySelector("#mood-type-group .choice-btn.selected")

    const moodAgeValue = moodAgeSelected ? moodAgeSelected.textContent : null
    const moodTypeValue = moodTypeSelected ? moodTypeSelected.textContent : null

    return {
        favoriteMovie : favoriteMovie,
        moodAgeValue : moodAgeValue,
        moodTypeValue : moodTypeValue,
        islandCompanion : islandCompanion
    }
}


function allQuestionsAnswered(data) {
    if (data.favoriteMovie.trim() === "" || data.islandCompanion.trim() === "")
        return false
    if (!data.moodAgeValue || !data.moodTypeValue) 
        return false

    return true
}

function resetQuestions() {
    document.getElementById("favorite-movie").value = ""
    document.getElementById("island-companion").value = ""

    const choiceBtns = document.querySelectorAll(".choice-btn")

    choiceBtns.forEach(choiceBtns => {
        choiceBtns.classList.remove("selected")
    })
}


function displayQuestions() {
    document.getElementById("question-no").textContent = movieSession.currentPerson


    const choicesContainers = document.querySelectorAll('.choices-container')

    choicesContainers.forEach(choiceContainer => {
        const choiceBtns = choiceContainer.querySelectorAll('.choice-btn')
        choiceBtns.forEach(choiceBtn => {
            choiceBtn.addEventListener('click' , () => {
                choiceBtns.forEach(choiceBtn => choiceBtn.classList.remove('selected'))

                choiceBtn.classList.add('selected')
            })
        })
    })

}



async function sendToBackEnd() {
    try {
        console.log("Sending to backend:", JSON.stringify(movieSession, null, 2))

        const response = await fetch("http://localhost:3001/api/recommend" , {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(movieSession)
        })

        if (!response.ok) {
            throw new Error("Failed to recommend movie now")
        }

        const result = await response.json()

        sessionStorage.setItem("recommendations" , 
            JSON.stringify(result)
        )

        window.location.href = 'movies.html'

    }
    catch (err) {
        console.error(err)
    }
}