

const choicesContainers = document.querySelectorAll('.choices-container')

choicesContainers.forEach(choiceContainer => {
    const choiceBtns = choiceContainer.querySelectorAll('.choice-btn')
    choiceBtns.forEach(choiceBtn => {
        choiceBtn.addEventListener('click' , () => {
            console.log('clicked')
            choiceBtns.forEach(choiceBtn => choiceBtn.classList.remove('selected'))

            choiceBtn.classList.add('selected')
        })
    })
})