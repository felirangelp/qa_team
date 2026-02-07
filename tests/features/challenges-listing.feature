@vibefy
Feature: Listado - Vibefy Challenges
  Pruebas sobre https://hack.vibefy.net/challenges

  Scenario: C1 - Listado de challenges visible
    Given estoy en la página de challenges
    When la página termina de cargar
    Then existe al menos un challenge en el listado
    And cada challenge muestra título o descripción

  Scenario: C2 - Información por challenge
    Given estoy en la página de challenges
    When la página termina de cargar
    Then los challenges muestran dificultad o fecha

  Scenario: C3 - Enlaces clicables por challenge
    Given estoy en la página de challenges
    When la página termina de cargar
    Then los challenges tienen enlaces clicables
