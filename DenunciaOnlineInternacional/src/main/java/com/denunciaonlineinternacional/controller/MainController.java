package com.denunciaonlineinternacional.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {

    @GetMapping("/")
    public String index() {
        return "index"; // Retorna o template index.html
    }

    @GetMapping("/login")
    public String login() {
        return "login"; // Retorna o template login.html
    }

    @GetMapping("/criar-conta")
    public String criarConta() {
        return "criar-conta"; // Retorna o template para criar conta, se existir
    }
}