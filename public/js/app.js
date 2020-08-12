console.log('The client-side Javascript')


// fetch('http://localhost:3000/weather?address=ghana').then((response) => {
//     response.json().then((data) => {
//         if(data.error){
//             console.log(data.error)
//         } else{
//             console.log(data.forecast)
//             console.log(data.location)
//         }
        
//     })
// })
const search = document.querySelector('input');
const weatherForm = document.querySelector('form');
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    messageOne.textContent = 'Loading...'
    fetch('http://localhost:3000/weather?address=' + location ).then((response) => {
        response.json().then((data) => {
            if(data.error){
               messageTwo.textContent = data.error
            }else{
                messageTwo.textContent = data.forecast
            }
        })
    })
    console.log('testing!')
})