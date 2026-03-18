// ottieni il form.
const form = document.getElementById('forgotPasswordForm');
// ottieni il risultato per modificarlo.
const message = document.getElementById('result');

form.addEventListener('submit', async (e) => {
  // Non ricaricare la pagina, API.
  e.preventDefault();

  // prende i valori dei campi.
  const email = document.getElementById('email').value;

  // fa la richiesta.
  try {
    const res = await fetch('http://localhost:3000/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    if(res.ok){
      message.style.color = 'green';
      message.textContent = await res.text();
    } else {
      message.style.color = 'red';
      message.textContent = await res.text();
    }
  } catch(err) {
    message.style.color = 'red';
    message.textContent = 'Error connecting to the server';
  }
});