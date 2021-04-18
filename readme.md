# Test Serempre

## Correr en local

Para correr en local ejecutar los siguientes comandos:

```bash
npm run prepare
cd dist/
functions-framework --target=serempre
```

## Despliegue

Para desplegar el proyecto ejecutar los siguientes comandos

```bash
npm run prepare
cd dist/
gcloud functions deploy serempre --trigger-http --project test-serempre --runtime nodejs12
```
