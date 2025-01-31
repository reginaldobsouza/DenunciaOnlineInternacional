<?php
$servername = "denunciaonlineinternacional-db-1";
$username = "root";
$password = "root";
$dbname = "denuncia_online";

// Criar conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexão
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// Receber dados do POST
$data = json_decode(file_get_contents("php://input"));

$nomeCompleto = $data->nomeCompleto;
$emailCadastro = $data->emailCadastro;
$celular = $data->celular;

// Log dos dados recebidos
error_log("Dados recebidos: Nome Completo: $nomeCompleto, Email: $emailCadastro, Celular: $celular");

// Inserir dados na tabela
$sql = "INSERT INTO usuarios (nomeCompleto, emailCadastro, celular) VALUES ('$nomeCompleto', '$emailCadastro', '$celular')";

$response = array();

if ($conn->query($sql) === TRUE) {
    $response["success"] = true;

    // Log de sucesso
    error_log("Usuário cadastrado com sucesso: $nomeCompleto, $emailCadastro, $celular");

    // Enviar email de confirmação
    $to = $emailCadastro;
    $subject = "Confirmação de Cadastro - Denúncia Online Internacional";
    $message = "Olá $nomeCompleto,\n\nSeu cadastro foi realizado com sucesso!\n\nObrigado,\nEquipe Denúncia Online Internacional";
    $headers = "From: no-reply@denunciaonline.org";

    if (mail($to, $subject, $message, $headers)) {
        $response["email"] = "Email de confirmação enviado.";
    } else {
        $response["email"] = "Falha ao enviar email de confirmação.";
    }
} else {
    $response["success"] = false;
    $response["error"] = $conn->error;

    // Log de erro
    error_log("Erro ao cadastrar usuário: " . $conn->error);
}

$conn->close();

echo json_encode($response);
?>
