# Use a imagem oficial do PHP com Apache
FROM php:8.3-apache

# Instale extensões necessárias do PHP
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Copiando o arquivo de configuração do Apache
COPY apache-config.conf /etc/apache2/sites-available/000-default.conf

# Copie o código do projeto para o diretório padrão do Apache
COPY . /var/www/html/

# Ativando mod_rewrite do Apache
RUN a2enmod rewrite

# Copie o script SQL para o contêiner
COPY database.sql /docker-entrypoint-initdb.d/

# Adicione o script wait-for-it ao contêiner
COPY wait-for-it.sh /usr/local/bin/wait
RUN chmod +x /usr/local/bin/wait

# Dê permissão ao diretório
RUN chown -R www-data:www-data /var/www/html/

# Reiniciando o Apache
RUN service apache2 restart

# Exponha a porta 80
EXPOSE 80
