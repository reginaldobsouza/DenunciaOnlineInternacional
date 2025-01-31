document.addEventListener('DOMContentLoaded', function() {
    var modal = document.getElementById("modalCadastro");
    var btnAbrir = document.getElementById("abrirCadastro");
    var spanFechar = document.getElementsByClassName("close")[0];
    var btnConfirmar = document.getElementById("confirmarCadastro");
    var formDenuncia = document.getElementById("formDenuncia");
    var btnCadastrarUsuario = document.getElementById("cadastrarUsuario");

    btnAbrir.onclick = function() {
        modal.style.display = "block";
    }

    spanFechar.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    function validarEmail(email) {
        var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(String(email).toLowerCase());
    }

    function validarCelular(celular) {
        var re = /^\(?\d{2}\)?[\s-]?\d{4,5}[\s-]?\d{4}$/;
        return re.test(String(celular));
    }

    btnConfirmar.onclick = function() {
        var nomeCompleto = document.getElementById("nomeCompleto").value;
        var emailCadastro = document.getElementById("emailCadastro").value;
        var celular = document.getElementById("celular").value;

        if (nomeCompleto === "" || emailCadastro === "" || celular === "") {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        if (!validarEmail(emailCadastro)) {
            alert("Formato de email inválido. O email deve estar no formato exemplo@dominio.com.");
            return;
        }

        if (!validarCelular(celular)) {
            alert("Formato de número de celular inválido. O número deve estar no formato (XX) XXXXX-XXXX ou (XX) XXXX-XXXX.");
            return;
        }

        // Salvar dados no banco de dados
        fetch('salvar_usuario.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nomeCompleto: nomeCompleto,
                emailCadastro: emailCadastro,
                celular: celular
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Usuário cadastrado com sucesso.");
                modal.style.display = "none";
            } else {
                alert("Erro ao cadastrar usuário.");
            }
        })
        .catch(error => console.error('Erro:', error));
    }

    btnCadastrarUsuario.onclick = function() {
        modal.style.display = "block";
    }
});
