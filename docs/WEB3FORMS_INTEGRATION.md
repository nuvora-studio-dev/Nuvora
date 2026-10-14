# Nuvora — integración Web3Forms (fase 3)

Fecha: 14 de octubre de 2026. Rama: `codex/web3forms-integration`.
Estado: implementado y validado con respuestas simuladas; pendiente de comprobación de recepción real. No fusionar hasta completar esa comprobación.

## Cambios

- `src/components/contact/contact-form.tsx`: POST en lugar de abrir correo; estado de envío, bloqueo inmediato de duplicados y controles, confirmación accesible y limpieza solo después del éxito. Conserva campos, validación, componentes y configuración de plantillas. Honeypot `botcheck` oculto, fuera del foco.
- `src/lib/contact.ts`: envío JSON a la API oficial; requiere HTTP correcto y `success: true`. Maneja clave ausente, honeypot, HTTP 429/otros errores, respuesta negativa o inválida, conexión y espera máxima de 30 segundos. No registra datos ni claves. No transmite la casilla de lectura de privacidad.
- `.env.example`: variable pública vacía, sin valor real.
- `src/app/(site)/contacto/page.tsx` y `src/app/(site)/privacidad/page.tsx`: corrección estrictamente necesaria de las explicaciones del antiguo envío mediante `mailto:`. El email directo sigue disponible.
- `scripts/check-contact.mjs`: amplía las comprobaciones con fetch simulado y el manejador real del componente compilado con TypeScript. No añade dependencias.

## Validación ejecutada

| Comprobación | Resultado |
| --- | --- |
| `pnpm typecheck` | PASS |
| `pnpm lint` | PASS |
| `pnpm build` | PASS; export estático de 31 páginas |
| `pnpm test:contact` | PASS |
| `pnpm test:site` | PASS; 16 rutas indexables, 625 enlaces/anclas, 58 referencias de imagen |
| `pnpm test:templates` | PASS; tres fichas y demos |

Contacto: éxito simulado, fallo HTTP, HTTP 429, respuesta negativa, JSON inválido, `success` de tipo incorrecto, error de conexión, clave ausente, honeypot, doble envío mientras hay una solicitud pendiente, conservación de datos ante errores, limpieza tras éxito y contexto personalizado de Atria. Fetch queda sustituido durante estas pruebas; no se envían correos reales.

Navegador local: selección de Atria conservada, validación de campos, estado accesible ante clave local ausente y conservación del mensaje. Honeypot oculto, sin desbordamiento horizontal en viewport móvil de 390 px; sin errores de consola observados. La comprobación de éxito y errores de API utiliza el manejador real con fixtures, no una petición desde el navegador al proveedor.

Los scripts de contacto y plantillas emiten el aviso preexistente de Node `MODULE_TYPELESS_PACKAGE_JSON`, sin fallar. No se ha cambiado el modo de módulos del proyecto para resolver ese aviso.

## Cloudflare Pages

Se ha observado el nombre `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` en las variables de producción del proyecto `nuvora-studio`. No se ha copiado, mostrado ni modificado su valor. Su presencia no acredita que sea una clave válida ni que entregue al buzón correcto. No existe `.env.local` en este checkout.

1. Cloudflare → Workers & Pages → `nuvora-studio` → Settings → Variables and Secrets → entorno **Production**.
2. Comprobar que `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` contiene la Access Key de la cuenta de Nuvora y está disponible durante el build. No pegarla en Git, documentación o logs.
3. Para validar antes del merge, configurar esa variable también en **Preview**, o usar una clave de prueba en un `.env.local` ignorado y reiniciar/reconstruir. Una clave del buzón real también enviará correos desde una preview; usar datos de prueba y envíos manuales controlados.
4. Mantener build `pnpm build`, salida `out`, producción `main`, `NEXT_PUBLIC_SITE_URL=https://nuvora-studio.pages.dev` y `NEXT_PUBLIC_BASE_PATH` vacío. Mantener las previews con `NEXT_PUBLIC_SITE_INDEXABLE=false` (también las protege la detección de rama de Cloudflare).
5. Las variables `NEXT_PUBLIC_` se incorporan al JavaScript durante el build: cambiar una variable requiere un nuevo build. La Access Key es un identificador público del formulario, no un secreto de servidor ni autorización para operaciones sensibles.
6. Tras aprobar la revisión, comprobar manualmente el formulario en el entorno configurado: API confirma éxito, campos se limpian, plantilla llega completa, email recibido en el buzón correcto y respuesta al remitente funciona. Solo después autorizar merge y despliegue de producción.

No se ha modificado configuración de Cloudflare ni iniciado un despliegue manual. Publicar la rama de revisión puede activar automáticamente una preview según la integración Git existente; esa preview no es una publicación de producción.

## Web3Forms y antispam

- Confirmar que la Access Key está activa y pertenece al buzón previsto. Revisar correo no deseado y los límites del plan gratuito antes de considerar la entrega validada.
- `email` se transmite separado para que Web3Forms configure la respuesta al remitente; el asunto incluye el servicio. El mensaje contiene el contexto de plantilla existente. No se añaden telemetría, adjuntos ni servicios de pago.
- Se implementa el honeypot solicitado y se rechaza localmente si está marcado. La documentación actual de Web3Forms lo considera obsoleto como protección principal y recomienda CAPTCHA. No garantiza detener spam ni sustituye controles del proveedor. Si aparece abuso, evaluar su opción gratuita de hCaptcha y sus implicaciones de privacidad/accesibilidad antes de añadirla.
- Comprobar las opciones efectivamente disponibles en la cuenta; no asumir que restricciones de dominio u otras opciones son gratuitas. No se ha cambiado el panel de Web3Forms.
- El bloqueo de duplicados protege una solicitud en curso en este formulario. Si se pierde la respuesta después de que el proveedor acepte un envío, no puede garantizarse que un reintento manual no repita el correo: la interfaz informa de que el envío no está confirmado.

## Privacidad y pendientes

Se actualiza la descripción técnica para identificar Web3Forms y la transmisión por HTTPS. La política existente sigue marcada como borrador: antes del uso comercial debe completarse responsable, base jurídica, conservación, proveedores, garantías y transferencias aplicables. No se inventan datos legales ni se declara cumplimiento normativo. La integración no almacena consultas en una base de datos propia.

Pendiente: recepción real, validez de la clave, configuración de preview, ajustes de cuenta y cierre del borrador legal. No se ha solicitado ni ejecutado un envío real. Diseño y hojas de estilo conservados; no se han añadido páginas comerciales ni nuevas funcionalidades fuera del formulario.

## Referencias oficiales

- [API y respuestas](https://docs.web3forms.com/getting-started/api-reference)
- [Envío con JavaScript](https://docs.web3forms.com/how-to-guides/html-and-javascript)
- [Limitaciones del honeypot](https://docs.web3forms.com/getting-started/customizations/spam-protection/spam-protection)
