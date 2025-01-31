<?php
$servername = "denunciaonlineinternacional-db-1";
$username = "root";
$password = "root";
$dbname = "denuncia_online";

// Corrigir o caminho do socket do MySQL
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexão
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// Receber dados do POST
$nome = $_POST['nome'];
$email = $_POST['email'];
$denuncia = $_POST['denuncia'];

// Log dos dados recebidos
error_log("Dados recebidos: Nome: $nome, Email: $email, Denúncia: $denuncia");

// Inserir denúncia na tabela
$sql = "INSERT INTO denuncias (denuncia) VALUES ('$denuncia')";

$response = array();

if ($conn->query($sql) === TRUE) {
    $denuncia_id = $conn->insert_id;

    // Log de sucesso
    error_log("Denúncia cadastrada com sucesso: ID $denuncia_id");

    // Criar pasta para os arquivos do usuário
    $uploadDir = 'uploads/' . $denuncia_id . '/';
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    // Processar arquivos
    foreach ($_FILES['arquivos']['tmp_name'] as $key => $tmp_name) {
        $fileName = basename($_FILES['arquivos']['name'][$key]);
        $fileSize = $_FILES['arquivos']['size'][$key];
        $fileTmp = $_FILES['arquivos']['tmp_name'][$key];
        $fileType = $_FILES['arquivos']['type'][$key];

        if ($fileSize > 5242880) {
            $response["success"] = false;
            $response["error"] = "Erro: Arquivo $fileName excede o tamanho máximo de 5MB.";
            echo json_encode($response);
            continue;
        }

        $filePath = $uploadDir . $fileName;
        if (move_uploaded_file($fileTmp, $filePath)) {
            $sql = "INSERT INTO arquivos (denuncia_id, nome_arquivo, caminho_arquivo, tipo_arquivo, tamanho_arquivo) VALUES ('$denuncia_id', '$fileName', '$filePath', '$fileType', '$fileSize')";
            if (!$conn->query($sql)) {
                $response["success"] = false;
                $response["error"] = "Erro ao salvar arquivo $fileName no banco de dados: " . $conn->error;
                echo json_encode($response);
                continue;
            }
        } else {
            $response["success"] = false;
            $response["error"] = "Erro ao fazer upload do arquivo $fileName.";
            echo json_encode($response);
            continue;
        }
    }

    // Gravar dados do usuário na tabela de usuários
    $sql = "INSERT INTO usuarios (nomeCompleto, emailCadastro) VALUES ('$nome', '$email')";
    if ($conn->query($sql) === TRUE) {
        $response["success"] = true;
        echo json_encode($response);
    } else {
        $response["success"] = false;
        $response["error"] = "Erro ao salvar dados do usuário: " . $conn->error;
        echo json_encode($response);
    }
} else {
    $response["success"] = false;
    $response["error"] = $conn->error;

    // Log de erro
    error_log("Erro ao cadastrar denúncia: " . $conn->error);
    echo json_encode($response);
}

$conn->close();
?>
