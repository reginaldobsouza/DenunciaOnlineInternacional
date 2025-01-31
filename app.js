const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');

registerBtn.addEventListener('click', () => {
    container.classList.add('active');
})

loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
})

const registerForm = document.querySelector('.form-box.register form');

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(registerForm);
    fetch('cadastro.php', {
        method: 'POST',
        body: formData
    }).then(response => response.json())
      .then(data => {
          if (data.success) {
              alert('Cadastro realizado com sucesso!');
              container.classList.remove('active');
          } else {
              alert('Erro no cadastro: ' + data.message);
          }
      });
});

function openRegisterPage() {
    window.location.href = 'cadastro.html';
}
