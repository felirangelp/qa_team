@comfama
Feature: Navegación - Comfama
  Las pruebas se ejecutan sobre https://www.comfama.com

  Scenario: CF1 - La página principal de Comfama carga correctamente
    Given estoy en la página de Comfama
    When la página termina de cargar
    Then veo el título o heading de Comfama
    And la URL corresponde a Comfama

  Scenario: CF2 - Zona transaccional visible con Personas y Empresas
    Given estoy en la página de Comfama
    When la página termina de cargar
    Then existe un enlace o botón "Personas"
    And existe un enlace o botón "Empresas"

  Scenario: CF3 - Acceso a Ayuda y contenido sin login
    Given estoy en la página de Comfama
    When la página termina de cargar
    Then existe un enlace o botón "Ayuda"
    And el contenido principal de Comfama es visible
