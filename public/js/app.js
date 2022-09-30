console.log('Client side java-script is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    console.log(location)
    const url = 'http://localhost:3000/weather?address=' + location + ''
    messageOne.textContent = 'Hello!'
    messageTwo.textContent = ''
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageTwo.textContent(data.error)
            }
            else {
                messageTwo.textContent = data.forecast + '. '+ data.temperature
                messageOne.textContent = data.location
            }
        })
    })
    // console.log('Testing!')
})