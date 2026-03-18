// ottieni il form.
const form = document.getElementById('registerForm');
// ottieni il risultato per modificarlo.
const message = document.getElementById('result');

form.addEventListener('submit', async (e) => {
  // non ricaricare la pagina, API.
  e.preventDefault();

  // ottieni i valori dei campi.
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // fa la richiesta.
  try {
    const res = await fetch('http://localhost:3000/register', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
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