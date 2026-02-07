@comfama
Feature: Contenido - Comfama
  Las pruebas se ejecutan sobre https://www.comfama.com

  Scenario: CF4 - Sección ¿Qué estás buscando? visible
    Given estoy en la página de Comfama
    When la página termina de cargar
    Then veo la sección "Qué estás buscando"
    And veo opciones Personas y familias o Empresas

  Scenario: CF5 - Beneficios y espacios Comfama visibles
    Given estoy en la página de Comfama
    When la página termina de cargar
    Then veo la sección "Beneficios Comfama"
    And veo la sección "Espacios y sedes"

  Scenario: CF6 - Centro de ayuda accesible
    Given estoy en la página de Comfama
    When la página termina de cargar
    Then veo la sección o enlace "Centro de ayuda"
    And existe un enlace "Ir a Centro de Ayuda" o "Centro de Ayuda"
