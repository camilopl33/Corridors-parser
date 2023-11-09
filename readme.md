## CSV to GeoJSON Converter

Este script de Node.js convierte un archivo CSV con geometría en formato WKT (Well-Known Text) a un archivo GeoJSON.

### Instalación

1. Clona o descarga este repositorio.
2. Ejecuta `npm install` para instalar las dependencias necesarias:

   ```bash
   npm install
   ```

### Uso

Para convertir un archivo CSV a GeoJSON, ejecuta el siguiente comando en la terminal:

```bash
yarn start
```

Reemplaza el contenido de `Corredores.csv` con el contenido de tu archivo CSV que contiene la columna de geometría en formato WKT.

El archivo convertido en GeoJSON se generará en el mismo directorio con el nombre `Corredores.json`.

### Dependencias

- `csvtojson`: Utilizado para convertir el archivo CSV a JSON.
- `wellknown`: Analiza la cadena de geometría en formato WKT y la convierte a un objeto GeoJSON.
- `terraformer-wkt-parser`: Proporciona funcionalidad para analizar la cadena WKT y convertirla a GeoJSON.

### Ejemplo de CSV

Asegúrate de que tu archivo CSV contenga una columna denominada "geometry" con valores en formato WKT (POLYGON, POINT, LINESTRING, etc.):

```csv
INDEX,Name,Estado,Municipio,geometry,SpotType
0,Polanco,CDMX,Miguel HIdalgo,"POLYGON Z ((-99.20883811473297 19.44845458510508 2260.994304000407, ...))",Retail
```

### Notas

- Si el script no puede convertir alguna geometría a GeoJSON, mantendrá la entrada original y mostrará un mensaje de error.
