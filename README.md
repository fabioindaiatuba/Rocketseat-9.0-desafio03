# Rocketseat - GoSatck 9.0 - Desafio 02

## Back-end GymPoint.

### Funções Modulo 02 :
* Criada as funçoes de criar usuario e atualizar usuario logado:
  + POST /users
  + PUT /users
* Rota de login e geração de token jwt:
  + POST /sessions
* Middleware para validar usuario logado.
* Criada as funcoes de CRUD de alunos:
  + GET /students
  + POST /students
  + PUT /students/:id

### Funções Modulo 03:
* Copiado modulo02 com funcionalidades acima ja feitas
* Criada rotas para salvar arquivos:
  + POST /files
* Associação de File com Students no campo Avatar.
* Rota para listar Students com Avatar.
  + GET /students
* Rotas para criar, listar, atualizar e deletar Planos.
  + GET /plans
  + POST /plans
  + PUT /plans/:id
  + DELETE /plans/:id
* Rotas para criar, listar, atualizar e deletar Matriculas.
  + GET /registrations
  + POST /registrations
  + PUT /registrations/:id
  + DELETE /plans/:id
* Rotinas para envio de e-Mail com Template personaizado.
* Criado Filas para envio de email.
* Tratamento de excecoes.
* Variaveis de ambiente (.env)

#### Desafio finalizado.
