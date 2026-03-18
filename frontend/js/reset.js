// ottieni il form.
const form = document.getElementById('resetPasswordForm');
// ottieni il risultato per modificarlo.
const message = document.getElementById('result');

form.addEventListener('submit', async (e) => {
  // Non ricaricare la pagina, API.
  e.preventDefault();

  // prende i valori dei campi.
  const newPassword = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  // Controllo sulla corrispondenza delle password.
  if (newPassword !== confirmPassword) {
    message.style.color = 'red';
    message.textContent = 'Le password non corrispondono.';
    return;
  }
  // se passa il controllo fa la richiesta.
  try {
    // Estraggo il token dal path.
    const pathParts = window.location.pathname.split('/');
    const token = pathParts[pathParts.length - 1];

    const res = await fetch('http://localhost:3000/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newPassword, token })
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