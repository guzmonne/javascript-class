# javascript-class

Clase de JavaScript para el proyecto de Conapps-IoT en CONATEL S.A.

## Indice

- <a href="#install">Instalación de Sandbox</a>
- <a href="#clases">Clases</a>

<h2 id="install">Instalación de Sandbox</h2>

Para poder instalar el sandbox es necesario seguir los siguientes pasos:

### Instalar NodeJS

Es imprescindible tener NodeJS instalado en sus maquinas. En caso de no tenerlo
una de las mejores formas de instalarlo es a través de `nvm`. Esta es una
herramienta que permite instalar múltiples versiones de `node`, sin que se
produscan interferencias entre ellas. La capacidad de poder cambiar de versión
de `node` de forma sencilla es muy potente, dado que no todos los ambientes
de producción soportan las versiones más actualizadas de `node`.

Para instalar `nvm` en ubuntu hay que seguir los siguientes pasos en la línea
de comandos.

Actualizar la lista de paquetes: `apt-get update`.

Instalar dependencias.

```bash
apt-get install build-essential libssl-dev
```

Instalar `nvm`

```
curl https://raw.githubusercontent.com/creationix/nvm/v0.33.4/install.sh | bash

```

**OBS: Se puede verificar en este [link](https://github.com/creationix/nvm/releases) que estamos instalando la última
versión.**

Cuando finalice la instalación de `nvm` tenemos que reiniciar la consola.

Para verificar que la instalación se completo con exito, podemos correr el 
siguiente comando: `nvm --version`, o `nvm help`.

Para instalar `node` utilizando `nvm` corremos los siguientes comandos:

```bash
nvm install 8.5.0
nvm use 8.5.0
```

De la misma manera podemos instalar otras versiones de `node`, y cambiar de una
a otra utilizando el comando `nvm use`.

### Instalar `yarn`

Siga los siguientes pasos en ubuntu.

```
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install yarn
```

Podemos probar que haya quedado correctamente instalado utilizando el comando
`yarn --version`.

Si se encuentran problemas al finalizar la instalación, prueben si el comando:
`sudo apt remove cmdtest` los soluciona.

### Clonar el repositorio en alguna carpeta conocida

Para descargar el repositorio en sus maquinas ejecuten el siguiente comando:

```
git clone git@github.com:guzmonne/javascript-class.git
```

### `yarn install`

Ingresen al repositorio recientemente creado y corran el siguiente comando
para instalar todas las dependencias del proyecto.

```bash
yarn install
```

### `yarn serve`

Para lanar el servidor web con el sandbox solamente es necesario correr el 
comando:

```
yarn serve
```

<h2 id="clases">Clases</h2>

- [01 - Funciones](Clases/01_Funciones.md)
  - Autor: Guzmán Monné
  - Fecha: 2017/11/27
