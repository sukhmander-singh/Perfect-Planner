const checkBoxList = document.querySelectorAll('.checkbox')
const errorLabel = document.querySelector('.error-label')
const inputFields = document.querySelectorAll('.input-field')
const progressLabel = document.querySelector('.progress-label')
const progressValue = document.querySelector('.progress-value')
const progressValueText = document.querySelector('.progress-value span')
const progressLabelText = [
    "Raise the bar by completing your goals!",
    "Keep going, you're on the right track!",
    "Almonst done! Keep pushing!",
    "You're almost there, just one more to go!",
    "Congratulations! You've completed all tasks. Well done!"
]

const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {}
let completedGoals = Object.values(allGoals).filter((goal) => goal.completed).length
progressValue.style.width = `${completedGoals / inputFields.length * 100}%`
progressValueText.innerText = `${completedGoals}/${inputFields.length} Completed`
progressLabel.innerText = progressLabelText[completedGoals]
errorLabel.innerText = `Please set all the ${inputFields.length} goals!`

checkBoxList.forEach((checkbox) => {
    checkbox.addEventListener('click', () => {
        const isAllInputFilled = [...inputFields].every((input) => {
            return input.value
        })
        if (isAllInputFilled) {
            checkbox.parentElement.classList.toggle('completed')
            const inputId = checkbox.nextElementSibling.id
            allGoals[inputId].completed = !allGoals[inputId].completed
            localStorage.setItem('allGoals', JSON.stringify(allGoals))
            completedGoals = Object.values(allGoals).filter((goal) => goal.completed).length
            progressValue.style.width = `${completedGoals / inputFields.length * 100}%`
            progressValueText.innerText = `${completedGoals}/${inputFields.length} Completed`
            progressLabel.innerText = progressLabelText[completedGoals]     
        }else{
            errorLabel.style.visibility = 'visible'
        }
    })
})

inputFields.forEach((input) => {
    if(allGoals[input.id]) {
        input.value = allGoals[input.id].name

        if (allGoals[input.id].completed) {
            input.parentElement.classList.add('completed')
        }
    }

    input.addEventListener('focus', () => {
        errorLabel.style.visibility = 'hidden'
    })
    input.addEventListener('input', (e) => {
        if (allGoals[input.id] && allGoals[input.id].completed) {
            input.value = allGoals[input.id].name
            return
        }
        if (allGoals[input.id]) {
            allGoals[e.target.id].name = e.target.value
        }else{
            allGoals[input.id] = {
                name : e.target.value,
                completed : false
            }
        }
        localStorage.setItem('allGoals', JSON.stringify(allGoals))
    })
})