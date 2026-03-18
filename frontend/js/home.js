// fetch dello username attuale per precompilare il titolo.
window.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch('http://localhost:3000/user/profile', {
      method: 'GET',
      credentials: 'include'
    });

    if(res.ok){
      const data = await res.json();
      document.getElementById('welcome-message').textContent += ' ' + data.username + '!';
    }
  } catch(err) {
    document.getElementById('welcome-message').textContent += ' (Error fetching username)';
  }
});