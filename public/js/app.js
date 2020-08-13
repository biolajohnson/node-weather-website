
const search = document.querySelector('input');
const weatherForm = document.querySelector('form');
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    messageOne.textContent = 'Loading...'
    fetch('/weather?address=' + location ).then((response) => {
        response.json().then((data) => {
            messageOne.textContent = "";
            if(data.error){
               messageTwo.textContent = data.error
            }else{
                messageOne.textContent = data.location
                messageTwo.textContent = 'It\'s ' + data.temperature +' outside! It\'s also ' + data.forecast + '. Enjoy! if you will. '
            }
        })
    })
    console.log('testing!')
})