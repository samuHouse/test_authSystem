// ottieni il form.
const form = document.getElementById('userEditForm');
// ottieni il risultato per modificarlo.
const message = document.getElementById('result');

// fetch dello username attuale per precompilare il campo.
window.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch('http://localhost:3000/user/profile', {
      method: 'GET',
      credentials: 'include'
    });

    if(res.ok){
      const data = await res.json();
      document.getElementsByTagName('label')[0].textContent = 'Username (' + data.username + '):';
    }
  } catch(err) {}
});

form.addEventListener('submit', async (e) => {
  // Non ricaricare la pagina, API.
  e.preventDefault();

  // prende i valori dei campi.
  const newUsername = document.getElementById('username').value;

  try {
    const res = await fetch('http://localhost:3000/user/edit', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newUsername })
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