# Agente de QA

Proyecto de agente de QA para automatizar pruebas UI. Stack: **Playwright**, **playwright-bdd**, **TypeScript** y **Gherkin**.

Requisitos completos: [requirements.md](requirements.md).

---

## URL bajo prueba

Las pruebas se ejecutan sobre:

**https://www.comfama.com**

Los resultados de cada ejecución **deben validarse mediante el reporte detallado** (HTML en `reports/html`), no solo por la salida de consola. Ver sección [Reportes y validación](#reportes-y-validación).

---

## MCP Playwright

### Qué es

El servidor MCP de Playwright ([microsoft/playwright-mcp](https://github.com/microsoft/playwright-mcp)) permite que el IDE (Cursor) interactúe con Playwright: ejecutar tests, inspeccionar la página y depurar fallos sin salir del editor.

### Para qué sirve

- **Ejecutar tests** desde el IDE usando las herramientas MCP.
- **Inspeccionar selectores** y estructura de la página para escribir o corregir pruebas.
- **Depurar fallos** con trace y screenshots desde la misma interfaz.

### Configuración en este proyecto

La configuración MCP está en **`.cursor/mcp.json`** a nivel de proyecto:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```

Requisito: **Node.js 18+** instalado para que `npx @playwright/mcp@latest` funcione.

Si Cursor no toma automáticamente el archivo del proyecto, puedes añadir el mismo servidor manualmente en **Cursor Settings → MCP (Model Context Protocol) → Add new MCP Server** y pegar la definición del servidor `playwright`.

### Cómo verificar que el servidor está activo

1. Abre Cursor y este proyecto.
2. En la interfaz de chat/agente, revisa las herramientas MCP disponibles; deberían aparecer las de Playwright (navegación, snapshot, etc.).
3. Tras reiniciar Cursor, el servidor se inicia al usar MCP; si hay error, revisa que Node.js 18+ esté en el `PATH` y que `npx` funcione en la terminal.

---

## Instalación y ejecución de tests

```bash
npm install
npx playwright install
npm test
```

**Comportamiento de `npm test`:**
1. **Limpieza:** Se vacía la carpeta `reports/` (html, json, screenshots) antes de ejecutar.
2. **Ejecución:** Se generan los tests BDD y se ejecutan en **Chromium**.
3. **Evidencia:** En cada escenario se generan **video** e **imagen** (screenshot) para todos los runs, no solo en fallos.

Para ejecutar sin limpiar reportes previos: `npm run test:no-clean`.

Ver reporte HTML:

1. **Primero** ejecuta la suite para generar el reporte: `npm test`
2. **Después** inicia el servidor del reporte: `npm run report`

Se abrirá el navegador en **http://localhost:9323/** (o el puerto que indique Playwright). Si no carga, asegúrate de haber ejecutado `npm test` antes; sin reporte generado, el servidor no tiene contenido que mostrar.

---

## Reportes y validación

La **validación de los resultados de las pruebas se hace mediante el reporte detallado**:

1. Tras `npm test`, se genera el reporte HTML en `reports/html/`.
2. Ejecuta `npm run report` (o `npx playwright show-report reports/html`) para abrirlo.
3. En el reporte revisa: estado de cada escenario (passed/failed), tiempo, steps, **video y screenshot por ejecución** (y trace en fallos).

No se considera suficiente la sola salida de consola para dar por válida una ejecución; debe revisarse el reporte HTML (y opcionalmente el JSON en `reports/json/` para CI).

---

## Estructura del proyecto

```
Cursor_QA/
├── .cursor/
│   ├── mcp.json
│   └── rules/
│       └── qa-playwright.mdc
├── mvp-react/           # MVP HTML+React (target alternativo) — index.html
├── tests/
│   ├── features/        # Archivos .feature (Gherkin)
│   ├── steps/           # Steps TypeScript
│   ├── fixtures/
│   └── support/
├── reports/
│   ├── html/            # Reporte detallado
│   ├── json/
│   └── screenshots/
├── playwright.config.ts
├── requirements.md
└── README.md
```

---

## Entorno virtual Python (venv)

Para scripts de reportes o futuros agentes (Planner, Generator, Healer):

```bash
python3 -m venv venv
source venv/bin/activate   # Linux/macOS
pip install -r requirements.txt
```

Uso previsto: generación de `reports/summary.md`, validación de features, agentes en fases posteriores.

---

## Checklist pre-deployment (sección 17 de requirements)

Antes de considerar el agente de QA listo para deployment:

1. **Ejecutar la suite completa** contra `https://www.comfama.com`: `npm test`
2. **Escenarios mínimos implementados y pasando:** CF1–CF6 (Comfama)
3. **Reporte HTML generado** y revisión de resultados en `reports/html` (`npm run report`)
4. **No subir artefactos sensibles:** `.gitignore` excluye `reports/html/`, `reports/json/*.json`, `test-results/`, traces; no commitear datos personales en traces/screenshots
5. **MVP local (opcional):** abrir `mvp-react/index.html` y, si se configura `BASE_URL` contra el MVP, ejecutar los mismos escenarios contra la URL local
