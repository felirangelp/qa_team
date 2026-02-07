@vibefy
Feature: Navegación - Vibefy Challenges
  Pruebas sobre https://hack.vibefy.net/challenges

  Scenario: N1 - La página de Challenges carga correctamente
    Given estoy en la página de challenges
    When la página termina de cargar
    Then veo el título o heading de la página de challenges
    And existe al menos un challenge en el listado

  Scenario: N2 - Navegación a Teams, Submissions, Rankings
    Given estoy en la página de challenges
    When la página termina de cargar
    Then existe un enlace o botón "Teams"
    And existe un enlace o botón "Submissions"
    And existe un enlace o botón "Rankings"

  Scenario: N3 - Contenido visible sin login
    Given estoy en la página de challenges
    When la página termina de cargar
    Then el contenido de challenges es visible
