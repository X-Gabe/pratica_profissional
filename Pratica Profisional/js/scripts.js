// Login
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  // Aqui você faria a verificação com o backend
  if (email === 'admin@example.com' && password === 'admin123') {
      window.location.href = 'admin.html';
  } else {
      alert('Credenciais inválidas');
  }
});

// Cadastro
document.getElementById('cadastroForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  if (!email.endsWith('@ifce.edu.br')) {
      alert('Use um e-mail do domínio @ifce.edu.br');
      return;
  }
  // Aqui você enviaria os dados para o backend
  alert('Cadastro realizado com sucesso!');
});

// Chat
document.getElementById('chatForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const messageInput = document.getElementById('messageInput');
  const message = messageInput.value.trim();
  if (message) {
      addMessage('user', message);
      messageInput.value = '';
      // Simula resposta do chatbot
      setTimeout(() => {
          addMessage('bot', 'Esta é uma resposta simulada do chatbot.');
      }, 1000);
  }
});

function addMessage(sender, text) {
  const chatWindow = document.getElementById('chatWindow');
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', sender === 'user' ? 'user-message' : 'bot-message');
  messageElement.textContent = text;
  chatWindow.appendChild(messageElement);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Cadastro de Administradores
document.getElementById('cadastroAdminForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const nome = document.getElementById('nomeAdmin').value;
  const email = document.getElementById('emailAdmin').value;
  const senha = document.getElementById('senhaAdmin').value;
  // Aqui você enviaria os dados para o backend
  alert('Administrador cadastrado com sucesso!');
  // Redireciona de volta para a página do administrador
  window.location.href = 'admin.html';
});
