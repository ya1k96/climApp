# climApp

Aplicacion en Angular del clima, integrada con la api [OpenWeather]("https://openweathermaps.com")

1. Clona este repositorio en local:

```console
git clone https://github.com/ya1k96/climApp.git
```

2. Entra en el directorio del proyecto:

```console
cd climApp
```

3. Configura el archivo `environment/environment.ts`:

```console
supabaseUrl=TU_URL_SUPABASE
supabaseKey=TU_SUPA_BASE_KEY
openWeatherKey=TU_WEATHER_KEY
```
*(Vas a necesitar crearte una cuenta previamente)*

[SupaBase](https://app.supabase.io/)

[OpenWeatherAPI](https://openweathermap.org/)

4. instala las dependencias del proyecto:

```console
npm install
```

5. Lanza el servidor para ver la aplicación en http://localhost:4200/:

```console
ng serve
```

## Loggeo de usuarios

No se necesita acceder con contraseña. La autenticacion esta hecha con un link magico enviado directamente al correo electronico.

*Enjoy 😊*

