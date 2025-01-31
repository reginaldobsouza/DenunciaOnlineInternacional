# Use a imagem oficial do PHP com Apache
FROM php:7.4-apache

# Instale extensões necessárias do PHP
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Copie o código do projeto para o diretório padrão do Apache
COPY . /var/www/html/

# Copie o script SQL para o contêiner
COPY database.sql /docker-entrypoint-initdb.d/

# Dê permissão ao diretório
RUN chown -R www-data:www-data /var/www/html/

# Exponha a porta 80
EXPOSE 80
