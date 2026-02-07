# Requisitos del Agente de QA – Vibefy Hackathons

## 1. Stack tecnológico

| Componente | Tecnología | Uso |
|------------|------------|-----|
| Automatización UI | **Playwright** | Ejecución de pruebas E2E en navegador |
| BDD | **playwright-bdd** | Integración Gherkin con Playwright |
| Lenguaje | **TypeScript** | Tipado y mantenibilidad |
| Especificación | **Gherkin** | Escenarios en lenguaje natural (.feature) |
| Alcance | **Pruebas a nivel UI** | Navegación, formularios, listados, accesibilidad básica |

Requisito: todas las pruebas deben ser ejecutables contra la UI (navegador real o headless).

---

## 2. Reglas no negociables

Ubicación: **`.cursor/rules/`**  
Archivo: **`qa-playwright.mdc`**

Las reglas definen:

- Uso obligatorio de Gherkin para escenarios.
- Steps en TypeScript con Playwright.
- Sin lógica de negocio en steps; solo orquestación y llamadas a fixtures/page objects.
- Nomenclatura y estructura de carpetas (features, steps, fixtures).
- Criterios de reporte y trazabilidad (nombre del escenario, feature, evidencia).

---

## 3. MVP en HTML con React

Se entrega un MVP en **HTML + React** (React vía CDN, sin build) para:

- Demostrar flujo de registro/listado similar a “challenges”.
- Servir como target alternativo de pruebas si la URL externa no está disponible.
- Validar el mismo tipo de escenarios (listado, filtros, navegación).

Ruta del MVP: **`mvp-react/index.html`** (y assets asociados).

---

## 4. URL bajo prueba

**Base URL:** `https://hack.vibefy.net/challenges`

**Aclaración:** Las pruebas del agente de QA se ejecutan **exclusivamente** sobre esta URL. Todas las suites y escenarios (navegación, listado, estabilidad, casos edge) tienen como objetivo la página de Challenges de Vibefy Hackathons en `https://hack.vibefy.net/challenges`. No se consideran válidas ejecuciones contra otras URLs como target principal sin acuerdo explícito.

---

## 5. Escenarios de prueba propuestos

### 5.1 Navegación y carga

| ID | Escenario | Criterios de éxito |
|----|-----------|---------------------|
| N1 | La página de Challenges carga correctamente | Status 200, título/heading visible, sin errores de consola críticos |
| N2 | Navegación desde Challenges a otras secciones | Enlaces Teams, Submissions, Rankings funcionan (si existen) |
| N3 | La página es accesible sin sesión | Contenido de challenges visible sin login |

### 5.2 Contenido y listado

| ID | Escenario | Criterios de éxito |
|----|-----------|---------------------|
| C1 | Listado de challenges visible | Al menos un challenge mostrado con título y descripción/dificultad |
| C2 | Información por challenge | Cada ítem muestra: título, dificultad (ej. medium), fecha si aplica |
| C3 | Enlaces o acciones por challenge | Se puede interactuar (click) con cada challenge si la UI lo permite |

### 5.3 Estabilidad y robustez

| ID | Escenario | Criterios de éxito |
|----|-----------|---------------------|
| E1 | Sin errores críticos en consola | No hay errores JavaScript no capturados durante la carga |
| E2 | Tiempo de carga aceptable | La página responde en un tiempo configurado (ej. &lt; 15 s) |
| E3 | Comportamiento en viewport móvil | Contenido visible y usable en viewport reducido (opcional) |

### 5.4 Casos edge

| ID | Escenario | Criterios de éxito |
|----|-----------|---------------------|
| ED1 | URL inexistente (404) | Manejo esperado o redirección (según diseño) |
| ED2 | Recarga de página | Tras F5 el listado se mantiene coherente |

Los escenarios se implementan en **archivos .feature** (Gherkin) y steps en TypeScript usando Playwright.

---

## 6. Estructura base recomendada

```
Cursor_QA/
├── .cursor/
│   └── rules/
│       └── qa-playwright.mdc
├── mvp-react/
│   ├── index.html
│   └── (assets si aplica)
├── tests/
│   ├── features/
│   │   ├── challenges-navigation.feature
│   │   ├── challenges-listing.feature
│   │   └── challenges-stability.feature
│   ├── steps/
│   │   ├── challenges.steps.ts
│   │   └── navigation.steps.ts
│   ├── fixtures/
│   │   └── base.fixture.ts
│   └── support/
│       └── test-helpers.ts
├── reports/
│   ├── html/          # Reporte HTML (playwright-bdd / reporter)
│   ├── json/          # Resultados en JSON para CI
│   └── screenshots/   # Capturas en fallos
├── playwright.config.ts
├── package.json
├── tsconfig.json
├── requirements.md
└── README.md
```

---

## 7. Sistema de reportes detallado

**Requisito:** Los resultados de las pruebas ejecutadas **deben poder validarse mediante el reporte detallado**. Es decir, la visibilidad del estado de cada prueba (pasada/fallida), los escenarios ejecutados, el tiempo y la evidencia (screenshots, trace) no es opcional: cualquier ejecución debe quedar reflejada en un reporte que permita auditar y validar los resultados sin depender solo de la salida de consola.

Recomendación técnica:

1. **Playwright HTML Report**  
   - `npx playwright show-report` tras ejecución.  
   - Incluir en `playwright.config.ts`:  
     `reporter: [['html', { outputFolder: 'reports/html', open: 'never' }]]`.

2. **playwright-bdd**  
   - Usar reporter que genere reporte por **features y escenarios** (no solo por test file).  
   - Incluir en el reporte: nombre del feature, escenario, steps, tiempo, estado (passed/failed).

3. **Evidencia en fallos**  
   - Screenshot y trace en cada fallo:  
     `use: { screenshot: 'only-on-failure', video: 'retain-on-failure', trace: 'retain-on-failure' }`.

4. **Salida machine-readable**  
   - Reporter **JSON** o **JUnit** en `reports/json/` para pipelines CI y métricas (por ejemplo, número de tests pasados/fallidos por feature).

5. **Resumen ejecutivo**  
   - Script opcional (Node o Python en venv) que lea el JSON y genere un `reports/summary.md` con: total de escenarios, pasados, fallidos, tiempo total y lista de escenarios fallidos.

---

## 8. Innovación

- **Enfoque:** Agente de QA con BDD (Gherkin) + Playwright en TypeScript, reglas no negociables en Cursor y metodología AI-DLC.
- **Aspectos innovadores:**
  - Escenarios escritos en lenguaje natural (Gherkin) reutilizables y legibles por negocio.
  - Reglas embebidas en el IDE (.cursor/rules) para mantener estándares sin documentación dispersa.
  - Posible extensión con agentes (planner, generator, healer) para generación y autoreparación de escenarios.
  - Reportes detallados (HTML + JSON + evidencia) listos para integración en flujos con AI.

Peso en evaluación: **25%**.

---

## 9. Impacto

- **Valor de negocio:** Detección temprana de regresiones en la página de challenges (Vibefy Hackathons).
- **Aplicabilidad:** Misma estructura sirve para otras URLs o productos; MVP React permite probar sin depender siempre del entorno externo.
- **Métricas:** Reducción de bugs en producción, tiempo de validación manual reducido, criterios de aceptación trazables a escenarios Gherkin.

Peso en evaluación: **30%**.

---

## 10. Factibilidad

- **Viabilidad técnica:** Playwright y playwright-bdd son estables y soportan TypeScript y Gherkin; la estructura propuesta es estándar.
- **Implementación:** Configuración en horas; escenarios básicos (navegación, listado, estabilidad) realizables en 1–2 días.
- **Dependencias:** Node.js, npm/pnpm, navegadores Playwright; opcional Python + venv para scripts de reportes o futuros agentes.

Peso en evaluación: **25%**.

---

## 11. Seguridad

- **Datos:** No se almacenan credenciales en código; variables de entorno para URLs o tokens si se añaden pruebas autenticadas.
- **Ejecución:** Pruebas en modo headless o con navegador aislado; no exponer puertos ni datos sensibles en reportes.
- **CI:** Secrets en variables de entorno del pipeline; no subir `.env` ni traces con datos personales al repositorio.
- **URL bajo prueba:** Solo lectura sobre `https://hack.vibefy.net/challenges`; no envío de datos sensibles.

Peso en evaluación: **20%**.

---

## 12. MCP de Playwright

- **Recomendación:** Usar el MCP de Playwright cuando esté disponible en el ecosistema Cursor/MCP para:
  - Ejecutar tests desde el IDE.
  - Inspeccionar selectores y generar código de pruebas.
  - Depurar fallos con trace/screenshot desde la misma interfaz.

Configuración sugerida en Cursor: añadir el servidor MCP de Playwright en la configuración de MCP del proyecto y documentar su uso en el README.

---

## 13. Criterios de evaluación (rubrica)

| Criterio      | Peso | Descripción |
|---------------|------|-------------|
| **Innovation** | 25% | Enfoque creativo y novedoso para resolver el problema (BDD, reglas, agentes, reportes). |
| **Impact**     | 30% | Valor de negocio y aplicabilidad en el mundo real. |
| **Feasibility**| 25% | Viabilidad técnica y preparación para implementación. |
| **Security**   | 20% | Protección de datos y consideraciones de seguridad. |

---

## 14. Entorno virtual (venv)

- **Python:** Se usa un `venv` para:
  - Scripts de reportes (por ejemplo, generación de `reports/summary.md`).
  - Posibles agentes en Python (planner, generator, healer) en fases posteriores.
  - Herramientas auxiliares (validación de features, métricas).

Comandos:

```bash
python3 -m venv venv
source venv/bin/activate   # Linux/macOS
pip install -r requirements.txt   # Si existe
```

El proyecto principal de pruebas sigue en **Node.js + TypeScript** (Playwright).

---

## 15. Metodología AI-DLC (AI Development Lifecycle)

Fases aplicadas al agente de QA:

1. **Define:** Requisitos y reglas no negociables (este documento + `.cursor/rules`).
2. **Design:** Estructura de carpetas, features, steps, fixtures y sistema de reportes.
3. **Develop:** Implementación de escenarios Gherkin y steps en TypeScript con Playwright.
4. **Test:** Ejecución de las pruebas propuestas (incluidas las de esta URL) antes de considerar “listo”.
5. **Deploy:** Integración en CI (por ejemplo, GitHub Actions) y publicación de reportes.
6. **Monitor:** Revisión de fallos y tendencias en reportes para mejorar escenarios y cobertura.

Cada iteración puede repetir Define → Monitor para refinar reglas y escenarios.

---

## 16. Validación: agentes Planner, Generator y Healer

**¿Es posible implementarlos?**

- **Sí**, de forma incremental:

| Agente      | Rol | Implementación sugerida |
|-------------|-----|---------------------------|
| **Planner** | Define qué escenarios ejecutar y en qué orden (p. ej. smoke vs full). | Script (Node o Python) que lee tags en `.feature` o un plan en YAML/JSON y lanza grupos de tests. |
| **Generator**| Genera escenarios Gherkin o steps a partir de descripciones o de la UI. | Uso de LLM + MCP Playwright: dado un flujo o una URL, generar `.feature` y esqueleto de steps. |
| **Healer**  | Corrige selectores rotos (por ejemplo, cuando la UI cambia). | Post-ejecución: analizar fallos por “selector no encontrado”, sugerir nuevos selectores (por ejemplo, por texto o rol) y proponer parches en steps. |

Recomendación: **MVP sin agentes** (solo Playwright + playwright-bdd + reglas). En una segunda fase, añadir Planner (tags/plan), luego Generator (con LLM + MCP) y por último Healer (análisis de fallos y sugerencias).

---

## 17. Pruebas previas al deployment

Antes de considerar el deployment:

1. Ejecutar la suite completa contra `https://hack.vibefy.net/challenges`.
2. Revisar que todos los escenarios propuestos (al menos N1, N2, C1, C2, E1) estén implementados y pasen (o estén deshabilitados con motivo documentado).
3. Generar reporte HTML y comprobar que no queden fallos sin analizar.
4. Validar que los reportes (HTML/JSON) se generen en `reports/` y que no se suban traces/screenshots con datos sensibles.


Cuando estos pasos estén OK, el agente de QA está listo para integrarse en el pipeline de deployment.
