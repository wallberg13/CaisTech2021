# Deploy de aplicação Frontend e Backend utilizando NGINX e PM2.

### Sumário:

<!-- Apresentando o que iremos subir -->

## **Apresentação da aplicação**

- Arquitetura / Infra-estrutura / Banco de Dados / Técnologias utilizadas na aplicação;
  - Apresentação dos recursos que a nossa aplicação precisa. Exibindo o docker como o provedor do banco de dados.
  - Links Úteis:
    - [Docker e Docker Compose](https://blog.rocketseat.com.br/introducao-ao-docker-criando-um-servidor-web-com-node-js-e-subindo-para-o-container/)
    - [Imagem Bitnami MySQL](https://github.com/bitnami/bitnami-docker-mysql)
      - OBS: non-root image (logo depois...)
- Backend da Aplicação;
- Front-end da aplicação.

<!-- Providenciando um servidor -->

## **Provisionando uma infraestrutura**

- Servidor na Digital Ocean:
  - Como criar um dopplet.
  - Acesso ao servidor via chave SSH.
  - Links Úteis:
    - [Criando Dopplet](https://www.digitaloceanbr.com.br/como-criar-droplet-digitalocean.html)
    - [Criando uma Chave SSH](https://www.digitalocean.com/community/tutorials/como-configurar-chaves-ssh-no-ubuntu-18-04-pt)
    - [Chave SSH - Opção 02](https://www.digitalocean.com/community/tutorials/how-to-configure-ssh-key-based-authentication-on-a-linux-server-pt)
- Outras opções, como AWS, Azure, etc.

<!-- Configurações Externas necessárias - DNS -->

### **DNS**

- O que é? Como que funciona.
  - Domain Name System (Sistema de nome de domínio), converte nomes de domínios legíveis por humanos (por exemplo, 01.caistech.dev) em endereço IP legíveis por máquinas [AWS](https://aws.amazon.com/pt/route53/what-is-dns/).
  - [Tipos de Registros](https://www.dialhost.com.br/ajuda/o-que-sao-tipos-de-registro/)
- Criando um DNS
  - Google Domains.
  - Processo abstrato.
  - Outros provedores de serviços:
    - Hostgator, Locaweb, etc...
- Criando um registro
  - Do tipo "A", para registrar endereço IPv4
  - Do tipo "AAAA", para registrar endereço IPv6
- Realizando testes de apontamento.
  - Ping
  - nslookup
  - [WhatsMyDNS](https://www.whatsmydns.net/)

<!-- Com DNS e servidor OK, agora é configurar a aplicação -->

### **Provisionando o Servidor**

- Aplicações necessárias:

  - NGINX
    - Servir a aplicação Web, para servir o front end.
    - Proxy para o Backend.
    - Instalação:
      ```bash
      sudo apt install nginx
      ```
  - [Docker](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04-pt)
    - Para o banco de dados.
  - Docker Compose
    - Rodar a infra no código.
    - Instalação:
      ```bash
      sudo apt install docker-compose
      ```
  - Git
    - Baixar o código da aplicação.
    - Instalação:
      ```bash
      sudo apt install git
      ```
  - [NodeJS](https://nodejs.org/en/download/package-manager/)
    - Yarn
    - [PM2](https://pm2.keymetrics.io/)
      - Rodar o backend.
    - Instalação:
      ```bash
      sudo npm install -g pm2 yarn
      ```
  - [CertBOT](https://certbot.eff.org/lets-encrypt/ubuntufocal-nginx)
    - HTTPS
    - Instalação:
      ```bash
      sudo snap install certbot --classic
      ```

- Configurando um usuário sem root

  - Criando o usuário "caistech", um user sem acesso root.
    - No braço, alterando o arquivos `/etc/passwd` e `/etc/group/`.
    - Via linha de comando:
      - [Tutorial](https://marquesfernandes.com/desenvolvimento/como-criar-um-usuario-sudo-no-linux-debian-ubuntu/)

## **Subindo o Backend**

- Baixando o código do Github

  - Instalando as dependencias.

- Preparando o .env da aplicação.

  - O .env é um arquivo de configurações, com as variáveis necessárias para o funcionamento da nossa aplicação, como credenciais de banco de dados, chaves de API, e etc...
  - Gerando chaves aleatórias para as variáveis de ambiente.

- Preparando o banco de dados.

  - ###### O banco de dados não necessáriamente precisa ser o docker, se já existir uma conexão com uma base de dados externa, ou algum, serviço de banco de dados que a aplicação só realize a conexão, já é válido, e esse passo não é necessário, é apenas para os fins dessa aplicação em específico.

  - Especificidade da imagem do MySQL da Bitnami.
    - Criação do usuário non-root, o mysql.
      - Exemplificar o UUID do usuário, que precisa ser o 1001.
      - Mesmo processo da criação do usuário do caistech.
    - Criação do diretório para o volume do docker e passagem de permissão para o usuário destinado para o `mysql`.
      ```bash
      mkdir -p /srv/cais-app/db
      cd /srv/
      chown -R mysql:mysql ./cais-app
      ```

- Subindo o banco de dados com o `docker-compose up -d`

  - Verificando se o banco de dados subiu tudo certinho.
  - Acessando o banco de dados pelo DBeaver (ou qualquer programa que se conecte com um banco MySQL).

- Realizando as migrations do banco de dados

  ```bash
  yarn knex migration:latest
  ```

- Realizando build do backend com o `pkg`.

  ```bash
  yarn build
  ```

- Subindo a API no PM2.

  ```bash
  pm2 start build/app-backend
  ```

- Teste de API.

## Explorando o NGINX

- O que o [NGINX](https://rockcontent.com/br/blog/nginx/)?

  - O que ele faz?

    - Prover aplicações web (arquivo estático HTML).
    - Funciona como Proxy Reverso (vamos utilizar para o backend).

  - Configurando o NGINX:

    - ctrl+c e ctrl+v da colinha. :-)

  - OBS:
    - Dá pra subir qualquer aplicação frontend com o NGINX. O que importa para o mesmo, é o "entrypoint" do HTML da página, que geralmente é o index.html.

## Adicionado o HTTPS

- Para add o HTTPS com o Certbot, basta executar:
  ```bash
  certbot --nginx
  ```

## Subindo o FrontEnd
