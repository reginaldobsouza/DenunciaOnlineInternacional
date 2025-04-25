# Denuncia Online Internacional

Este projeto é uma aplicação web desenvolvida com o Spring Framework, que permite aos usuários acessar e criar contas para denúncias online. A aplicação é estruturada em uma arquitetura MVC (Model-View-Controller) e utiliza o Spring Boot para facilitar a configuração e o desenvolvimento.

## Estrutura do Projeto

O projeto possui a seguinte estrutura de diretórios:

```
DenunciaOnlineInternacional
├── src
│   ├── main
│   │   ├── java
│   │   │   └── com
│   │   │       └── denunciaonlineinternacional
│   │   │           ├── DenunciaOnlineInternacionalApplication.java
│   │   │           ├── controller
│   │   │           │   └── MainController.java
│   │   │           ├── model
│   │   │           │   └── User.java
│   │   │           └── service
│   │   │               └── UserService.java
│   │   └── resources
│   │       ├── static
│   │       │   ├── css
│   │       │   │   └── styles.css
│   │       │   ├── js
│   │       │   │   └── index.js
│   │       │   └── images
│   │       └── templates
│   │           ├── index.html
│   │           └── login.html
│   └── test
│       └── java
│           └── com
│               └── denunciaonlineinternacional
│                   └── DenunciaOnlineInternacionalApplicationTests.java
├── pom.xml
└── README.md
```

## Funcionalidades

- **Acesso ao Login**: Usuários podem acessar a página de login para autenticação.
- **Criação de Conta**: Usuários podem criar uma nova conta para realizar denúncias.
- **Modelo de Usuário**: A aplicação gerencia informações do usuário, como ID, nome, email e senha.
- **Estilos e Interatividade**: A aplicação utiliza CSS para estilização e JavaScript para interatividade no front-end.

## Tecnologias Utilizadas

- **Spring Boot**: Framework para desenvolvimento de aplicações Java.
- **Thymeleaf**: Motor de templates para renderização de páginas HTML.
- **Maven**: Gerenciador de dependências e construção do projeto.

## Como Executar o Projeto

1. Clone o repositório.
2. Navegue até o diretório do projeto.
3. Execute o comando `mvn spring-boot:run` para iniciar a aplicação.
4. Acesse `http://localhost:8080` no seu navegador.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## Licença

Este projeto está licenciado sob a MIT License. Veja o arquivo LICENSE para mais detalhes.