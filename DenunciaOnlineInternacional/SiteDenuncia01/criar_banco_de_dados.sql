CREATE DATABASE denuncia_online;

USE denuncia_online;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nomeCompleto VARCHAR(255) NOT NULL,
    emailCadastro VARCHAR(255) NOT NULL,
    celular VARCHAR(20) NOT NULL
);

CREATE TABLE denuncias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    denuncia TEXT NOT NULL
);

CREATE TABLE arquivos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    denuncia_id INT NOT NULL,
    nome_arquivo VARCHAR(255) NOT NULL,
    caminho_arquivo VARCHAR(255) NOT NULL,
    tipo_arquivo VARCHAR(50) NOT NULL,
    tamanho_arquivo INT NOT NULL,
    FOREIGN KEY (denuncia_id) REFERENCES denuncias(id)
);
