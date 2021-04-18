# Test Serempre

El codigo se hizo en javascript con express, se utiliza babel para transpilar el codigo ya que no se puede desplegar codigo basado en ES7.

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
