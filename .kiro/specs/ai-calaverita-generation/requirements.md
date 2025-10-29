# Documento de Requerimientos

## Introducción

Este documento especifica los requerimientos para el sistema de generación de calaveritas literarias con IA. El sistema analizará imágenes de mascotas usando las capacidades de visión de Claude y generará calaveritas literarias personalizadas basadas en las características visuales de la mascota y los rasgos de personalidad proporcionados por el usuario.

## Glosario

- **Generador de Calaveritas**: El componente del sistema responsable de analizar imágenes de mascotas y generar calaveritas personalizadas
- **Servicio de IA**: La capa de integración que se comunica con Amazon Bedrock y Claude
- **Imagen de Mascota**: Una fotografía de la mascota subida por el usuario
- **Perfil de Mascota**: La combinación del nombre de la mascota, rasgos de personalidad y características visuales
- **Rasgos de Personalidad**: Características predefinidas que describen el comportamiento y temperamento de la mascota, seleccionadas por el usuario
- **Análisis de Visión**: El proceso de extraer características visuales de la imagen de la mascota usando las capacidades de visión de Claude
- **Calaverita**: Una forma literaria tradicional mexicana que consiste en versos humorísticos rimados sobre la muerte, típicamente en cuartetas

## Requerimientos

### Requerimiento 1

**Historia de Usuario:** Como dueño de mascota, quiero subir una foto de mi mascota, para que el sistema pueda analizar sus características visuales para la calaverita

#### Criterios de Aceptación

1. CUANDO un usuario sube un archivo de imagen, EL Generador de Calaveritas DEBERÁ validar que el archivo sea un formato de imagen soportado (JPEG, PNG, WebP)
2. CUANDO un usuario sube un archivo de imagen, EL Generador de Calaveritas DEBERÁ validar que el tamaño del archivo no exceda 5MB
3. SI un archivo subido no es un formato de imagen válido, ENTONCES EL Generador de Calaveritas DEBERÁ retornar un mensaje de error indicando los formatos soportados
4. SI un archivo subido excede el límite de tamaño, ENTONCES EL Generador de Calaveritas DEBERÁ retornar un mensaje de error indicando el tamaño máximo permitido
5. CUANDO una imagen válida es subida, EL Generador de Calaveritas DEBERÁ convertir la imagen a formato base64 para transmisión al Servicio de IA

### Requerimiento 2

**Historia de Usuario:** Como dueño de mascota, quiero proporcionar el nombre y rasgos de personalidad de mi mascota, para que la calaverita sea personalizada y significativa

#### Criterios de Aceptación

1. CUANDO un usuario envía información de la mascota, EL Generador de Calaveritas DEBERÁ validar que el nombre de la mascota esté proporcionado y contenga entre 1 y 50 caracteres
2. EL Generador de Calaveritas DEBERÁ presentar una lista predefinida de Rasgos de Personalidad organizados en categorías: Energía (Juguetón/a, Tranquilo/a, Hiperactivo/a, Dormilón/a), Personalidad (Cariñoso/a, Independiente, Travieso/a, Tímido/a, Valiente, Miedoso/a), Comportamiento (Glotón/a, Ladrador/a, Protector/a, Curioso/a, Obediente, Rebelde), y Especiales (Elegante, Payaso/a, Gruñón/a, Consentido/a)
3. CUANDO un usuario selecciona rasgos de personalidad, EL Generador de Calaveritas DEBERÁ validar que se seleccionen entre 2 y 3 rasgos
4. SI el nombre de la mascota falta o es inválido, ENTONCES EL Generador de Calaveritas DEBERÁ retornar un mensaje de error solicitando un nombre válido
5. SI el usuario selecciona menos de 2 o más de 3 rasgos, ENTONCES EL Generador de Calaveritas DEBERÁ retornar un mensaje de error indicando el rango válido de selección
6. EL Generador de Calaveritas DEBERÁ combinar el nombre de la mascota y rasgos de personalidad seleccionados con los resultados del análisis visual para crear el Perfil de Mascota completo

### Requerimiento 3

**Historia de Usuario:** Como dueño de mascota, quiero que el sistema analice la foto de mi mascota automáticamente, para no tener que describir manualmente su apariencia

#### Criterios de Aceptación

1. CUANDO el Servicio de IA recibe una Imagen de Mascota, EL Servicio de IA DEBERÁ enviar la imagen a Claude con capacidades de visión habilitadas
2. EL Servicio de IA DEBERÁ extraer características visuales incluyendo tipo de mascota, raza (si es identificable), color, indicadores de tamaño y características distintivas
3. CUANDO Claude retorna el análisis de visión, EL Servicio de IA DEBERÁ parsear la respuesta en datos estructurados
4. SI el análisis de visión falla, ENTONCES EL Servicio de IA DEBERÁ reintentar la solicitud una vez antes de retornar un error
5. EL Servicio de IA DEBERÁ completar el análisis de visión dentro de 10 segundos o retornar un error de timeout

### Requerimiento 4

**Historia de Usuario:** Como dueño de mascota, quiero recibir una calaverita que siga el estilo literario tradicional mexicano, para que se sienta auténtica y culturalmente apropiada

#### Criterios de Aceptación

1. CUANDO se genera una calaverita, EL Generador de Calaveritas DEBERÁ instruir al Servicio de IA para crear versos en idioma español
2. EL Generador de Calaveritas DEBERÁ instruir al Servicio de IA para usar estructura de cuartetas (estrofas de 4 líneas) con esquema de rima consistente
3. EL Generador de Calaveritas DEBERÁ instruir al Servicio de IA para incorporar humor y referencias juguetonas a la muerte en el estilo tradicional de calaverita
4. EL Generador de Calaveritas DEBERÁ instruir al Servicio de IA para incluir el nombre de la mascota y al menos dos características del Perfil de Mascota
5. EL Generador de Calaveritas DEBERÁ generar calaveritas con una longitud entre 8 y 16 líneas (2 a 4 cuartetas)

### Requerimiento 5

**Historia de Usuario:** Como dueño de mascota, quiero recibir mi calaverita rápidamente, para tener una experiencia de usuario fluida

#### Criterios de Aceptación

1. CUANDO la generación de calaverita comienza, EL Servicio de IA DEBERÁ transmitir la respuesta progresivamente al cliente
2. EL Generador de Calaveritas DEBERÁ mostrar los primeros tokens de la calaverita dentro de 3 segundos del inicio de la solicitud
3. EL Generador de Calaveritas DEBERÁ completar la generación completa de la calaverita dentro de 30 segundos
4. SI la generación excede 30 segundos, ENTONCES EL Generador de Calaveritas DEBERÁ terminar la solicitud y retornar un error de timeout
5. MIENTRAS la calaverita está siendo generada, EL Generador de Calaveritas DEBERÁ mostrar un indicador de carga al usuario

### Requerimiento 6

**Historia de Usuario:** Como administrador del sistema, quiero que la integración de IA maneje errores de manera elegante, para que los usuarios reciban retroalimentación útil cuando ocurran problemas

#### Criterios de Aceptación

1. SI la conexión del Servicio de IA falla, ENTONCES EL Generador de Calaveritas DEBERÁ retornar un mensaje de error amigable indicando un problema temporal del servicio
2. SI el Servicio de IA retorna una respuesta de error, ENTONCES EL Generador de Calaveritas DEBERÁ registrar los detalles del error y retornar un mensaje de error genérico al usuario
3. SI el límite de tasa del Servicio de IA es excedido, ENTONCES EL Generador de Calaveritas DEBERÁ retornar un mensaje pidiendo al usuario intentar más tarde
4. EL Generador de Calaveritas NO DEBERÁ exponer claves de API, credenciales o detalles internos de error al cliente
5. CUANDO ocurre un error, EL Generador de Calaveritas DEBERÁ registrar información suficiente para depuración incluyendo timestamp, ID de solicitud y tipo de error

### Requerimiento 7

**Historia de Usuario:** Como administrador del sistema, quiero configurar la conexión del servicio de IA de manera segura, para que las credenciales estén protegidas

#### Criterios de Aceptación

1. EL Servicio de IA DEBERÁ obtener las credenciales de AWS desde variables de entorno, no desde código o archivos de configuración
2. EL Servicio de IA DEBERÁ validar que las variables de entorno requeridas (región de AWS, access key, secret key) estén presentes al iniciar
3. SI las credenciales requeridas faltan, ENTONCES EL Servicio de IA DEBERÁ prevenir que la aplicación inicie y registrar un error de configuración
4. EL Servicio de IA DEBERÁ usar ejecución del lado del servidor únicamente, nunca exponiendo credenciales al cliente
5. EL Servicio de IA DEBERÁ especificar la versión del modelo Claude (ej. claude-3-sonnet, claude-3-opus) vía variable de entorno para actualizaciones fáciles

### Requerimiento 8

**Historia de Usuario:** Como desarrollador, quiero que la integración de IA sea testeable, para poder verificar funcionalidad sin consumir créditos de API

#### Criterios de Aceptación

1. DONDE un modo de prueba esté habilitado, EL Servicio de IA DEBERÁ soportar respuestas simuladas para desarrollo y pruebas
2. DONDE un modo de prueba esté habilitado, EL Generador de Calaveritas DEBERÁ retornar calaveritas de muestra predefinidas sin llamar al Servicio de IA real
3. EL Servicio de IA DEBERÁ proporcionar una bandera de configuración para habilitar o deshabilitar el modo de prueba vía variable de entorno
4. CUANDO el modo de prueba esté habilitado, EL Servicio de IA DEBERÁ registrar que está operando en modo de prueba
5. EL Servicio de IA DEBERÁ mantener la misma interfaz y estructura de respuesta en ambos modos de prueba y producción
