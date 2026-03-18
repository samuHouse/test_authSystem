// ottieni il form.
const form = document.getElementById('loginForm');
// ottieni il risultato per modificarlo.
const message = document.getElementById('result');

form.addEventListener('submit', async (e) => {
  // Non ricaricare la pagina, API.
  e.preventDefault();

  // prende i valori dei campi.
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // fa la richiesta.
  try {
    const res = await fetch('http://localhost:3000/login', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if(res.ok){
      message.style.color = 'green';
      message.textContent = await res.text();
      // reindirizza alla home.
      window.location.href = 'home.html';
    } else {
      message.style.color = 'red';
      message.textContent = await res.text();
    }
  } catch(err) {
    message.style.color = 'red';
    message.textContent = 'Error connecting to the server';
  }
});