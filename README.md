# 🧪 Automação de Testes com Playwright

Olá! Me chamo **Rhuan Quadros**, sou estudante de Análise e Desenvolvimento de Sistemas e entusiasta em automação, desenvolvimento de software e qualidade de código.

Este repositório tem como objetivo apresentar uma **automação de testes de interface (UI)** desenvolvida com o framework [**Playwright**](https://playwright.dev/). O foco deste projeto é simular e validar o fluxo de compra de diferentes tipos de usuários dentro de um sistema web.

Cada usuário apresenta um comportamento distinto, o que permite testar desde casos de sucesso até situações de erro, lentidão ou inconsistências visuais. A automação cobre os seguintes pontos:

- Login com múltiplos perfis
- Navegação e seleção de produtos
- Validação de mensagens de erro e travas
- Finalização de compra
- Performance da aplicação

Abaixo estão as **demonstrações em vídeo** (GIFs) dos testes automatizados em execução para cada tipo de usuário.

## 🎥 Demonstração dos Testes Automatizados para Usuários

<table>
  <tr>
    <td style="border: 1px solid #ccc; padding: 20px;">
      <h3 align="center">🧍 standard_user</h3>
      <p>Este teste simula o fluxo de compra completo com o usuário <strong>standard_user</strong>, que possui credenciais válidas. Ele acessa o sistema, realiza o login, adiciona produtos ao carrinho e finaliza a compra com sucesso.</p>
      <p align="center">
        <img src="./assest/standard_user_video-.gif" alt="Teste do usuário padrão" width="600"/>
      </p>
    </td>
  </tr>
  <tr>
    <td style="border: 1px solid #ccc; padding: 20px;">
      <h3 align="center">🚫 locked_out_user</h3>
      <p>Este teste verifica o comportamento quando o <strong>locked_out_user</strong> tenta acessar o sistema. Ao tentar fazer login, o sistema exibe uma mensagem de bloqueio, impedindo o acesso à loja.</p>
      <p align="center">
        <img src="./assest/locked_out_user_video-.gif" alt="Teste do usuário bloqueado" width="600"/>
      </p>
    </td>
  </tr>
  <tr>
    <td style="border: 1px solid #ccc; padding: 20px;">
      <h3 align="center">👀 visual_user</h3>
      <p>Este teste executa ações com o <strong>visual_user</strong>, que apresenta inconsistências visuais nos produtos e layout. O objetivo é verificar falhas na renderização e identidade visual do sistema.</p>
      <p align="center">
        <img src="./assest/visual_user_video-.gif" alt="Teste do usuário visual" width="600"/>
      </p>
    </td>
  </tr>
  <tr>
    <td style="border: 1px solid #ccc; padding: 20px;">
      <h3 align="center">❌ error_user</h3>
      <p>Este teste mostra o comportamento do <strong>error_user</strong>, que costuma gerar falhas ao interagir com os componentes da aplicação, como erros ao clicar ou bugs ao navegar. Serve para validar a resiliência da aplicação.</p>
      <p align="center">
        <img src="./assest/error_user_video-.gif" alt="Teste do usuário com erro" width="600"/>
      </p>
    </td>
  </tr>
  <tr>
    <td style="border: 1px solid #ccc; padding: 20px;">
      <h3 align="center">⚡ performance_user</h3>
      <p>O <strong>performance_user</strong> é utilizado para testar atrasos intencionais de carregamento. O fluxo de compra é o mesmo do usuário padrão, mas o sistema demora para responder, simulando lentidão.</p>
      <p align="center">
        <img src="./assest/performance_user_video-.gif" alt="Teste do usuário performance" width="600"/>
      </p>
    </td>
  </tr>
  <tr>
    <td style="border: 1px solid #ccc; padding: 20px;">
      <h3 align="center">🐞 problem_user</h3>
      <p>Este teste utiliza o <strong>problem_user</strong>, que interage com elementos com bugs específicos, como imagens quebradas ou funcionalidades que não respondem corretamente. É útil para validar falhas específicas do front-end.</p>
      <p align="center">
        <img src="./assest/problem_user_video-.gif" alt="Teste do usuário com problema" width="600"/>
      </p>
    </td>
  </tr>
</table>

## 🤝 Contato

Espero que você tenha gostado deste projeto!  
Se tiver interesse em mim ou no meu trabalho, sinta-se à vontade para entrar em contato.

📬 Conecte-se comigo no [LinkedIn](https://www.linkedin.com/in/rhuan-doin-quadros/) — será um prazer trocar ideias!
