// Simulação de banco de dados com usuários
const usuarios = [
    { email: 'admin@ifce.edu.br', senha: 'admin123', role: 'admin' },
    { email: 'usuario@ifce.edu.br', senha: 'user123', role: 'user' }
  ];
  
  // Função para login
  document.getElementById('formLogin')?.addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário
  
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const mensagemErro = document.getElementById('mensagemErro');
  
    // Verifica se o usuário existe no "banco de dados"
    const usuario = usuarios.find(user => user.email === email && user.senha === senha);
  
    if (usuario) {
      mensagemErro.style.display = 'none';
  
      // Redireciona com base no nível de acesso
      if (usuario.role === 'admin') {
        alert('Bem-vindo, Administrador!');
        window.location.href = 'arquivos.html'; // Página do administrador
      } else if (usuario.role === 'user') {
        alert('Bem-vindo ao sistema!');
        window.location.href = 'chat.html'; // Página do usuário comum
      }
    } else {
      // Exibe mensagem de erro
      mensagemErro.style.display = 'block';
    }
  });
  
  // Validação no cadastro de usuários
  document.getElementById('formCadastro')?.addEventListener('submit', function(event) {
    event.preventDefault();
  
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const mensagemErro = document.getElementById('mensagemErro');
  
    // Verifica se o e-mail é válido (exemplo: domínio específico)
    if (!email.endsWith('@ifce.edu.br')) {
      mensagemErro.textContent = 'E-mail inválido. Use um domínio permitido (@ifce.edu.br).';
      mensagemErro.style.display = 'block';
      return;
    }
  
    // Simula o cadastro do usuário
    usuarios.push({ email, senha, role: 'user' });
    alert('Cadastro realizado com sucesso!');
    window.location.href = 'login.html'; // Redireciona para a tela de login
  });
  
  // Upload de arquivos (somente para administradores)
  document.getElementById('formUpload')?.addEventListener('submit', function(event) {
    event.preventDefault();
  
    const fileInput = document.getElementById('file');
    
    if (fileInput.files.length > 0) {
      alert(`Arquivo "${fileInput.files[0].name}" enviado!`);
  
      // Atualiza a lista de arquivos cadastrados (simulação)
      const fileList = document.getElementById('fileList');
      const listItem = document.createElement('li');
      listItem.textContent = fileInput.files[0].name;
  
      fileList.appendChild(listItem);
  
      fileInput.value = ''; // Limpa o campo de upload
    } else {
      alert('Por favor, selecione um arquivo.');
    }
  });
  
  // Chatbot funcionalidade básica
  document.getElementById('chatForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
  
    const input = document.getElementById('chatInput');
    
    if (input.value.trim()) {
      const chatWindow = document.getElementById('chatWindow');
  
      // Exibe a mensagem do usuário
      const userMessage = document.createElement('p');
      userMessage.textContent = `Você: ${input.value}`;
      chatWindow.appendChild(userMessage);
  
      // Simula uma resposta do chatbot
      const botMessage = document.createElement('p');
      botMessage.textContent = 'Chatbot: Essa é uma resposta simulada.';
      chatWindow.appendChild(botMessage);
  
      input.value = ''; // Limpa o campo de entrada
    }
  });
  

// Função para cadastrar novos administradores
document.getElementById('formCadastroAdmin')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();
    const mensagemSucesso = document.getElementById('mensagemSucesso');

    // Verifica se o e-mail já está cadastrado
    const usuarioExistente = usuarios.find(user => user.email === email);

    if (usuarioExistente) {
        alert('Este e-mail já está cadastrado!');
        return;
    }

    // Adiciona o novo administrador ao "banco de dados"
    usuarios.push({ email, senha, role: 'admin' });

    // Exibe mensagem de sucesso
    mensagemSucesso.style.display = 'block';

    // Limpa os campos do formulário
    document.getElementById('formCadastroAdmin').reset();
});

document.getElementById('chatForm')?.addEventListener('submit', function(event) {
  event.preventDefault();

  const input = document.getElementById('chatInput');
  const message = input.value.trim();

  if (message) {
      const chatWindow = document.getElementById('chatWindow');

      // Adiciona a mensagem do usuário
      const userMessage = document.createElement('div');
      userMessage.classList.add('message', 'user');
      userMessage.textContent = message;

      chatWindow.appendChild(userMessage);

      // Rola automaticamente para a última mensagem
      chatWindow.scrollTop = chatWindow.scrollHeight;

      // Simula digitação do chatbot
      const typingIndicator = document.createElement('div');
      typingIndicator.classList.add('message', 'bot');
      typingIndicator.textContent = 'Chatbot está digitando...';

      chatWindow.appendChild(typingIndicator);

      setTimeout(() => {
          // Substitui pela resposta final após um tempo
          typingIndicator.remove();

          const botMessage = document.createElement('div');
          botMessage.classList.add('message', 'bot');
          botMessage.textContent = 'Chatbot: Essa é uma resposta simulada.';
          
          chatWindow.appendChild(botMessage);

          // Rola automaticamente para a última mensagem
          chatWindow.scrollTop = chatWindow.scrollHeight;

      }, Math.random() * (2000 - 1000) + 1000); // Resposta após 1-2 segundos

      // Limpa o campo de entrada
      input.value = '';
  }
});
