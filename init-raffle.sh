#!/bin/bash

echo "🎯 Iniciando setup del proyecto Raffle..."

# 1. Crear carpeta principal y entrar
mkdir raffle-project && cd raffle-project || exit
echo "📦 Carpeta 'raffle-project' creada."

# 2. Clonar backend
echo "🔄 Clonando backend desde GitHub..."
git clone https://github.com/realDarkCode/raffle-draw-api.git

# 3. Crear frontend
echo "⚛️ Creando frontend con Create React App..."
npx create-react-app raffle-ui

# 4. Crear carpetas client/server
echo "📂 Reorganizando estructura..."
mkdir -p client server
mv raffle-ui client/
mv raffle-draw-api server/

# 5. Eliminar .git internos
echo "🧹 Eliminando .git internos..."
rm -rf client/raffle-ui/.git
rm -rf server/raffle-draw-api/.git

# 6. Inicializar package.json raíz si no existe
if [ ! -f package.json ]; then
  echo "📝 Creando package.json raíz..."
  npm init -y
fi

# 7. Instalar concurrently
echo "⚙️ Instalando concurrently..."
npm install concurrently --save-dev

# 8. Agregar script start al package.json raíz
echo "🔧 Configurando script de inicio..."
node -e "
const fs = require('fs');
const pkg = require('./package.json');
pkg.scripts = pkg.scripts || {};
pkg.scripts.start = 'concurrently \\\"npm --prefix server start\\\" \\\"npm --prefix client start\\\"';
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
"

# 9. Crear archivo .env en la raiz
echo "🌐 Configurando variables de entorno..."
cat <<EOL > .env
REACT_APP_API_URL=http://localhost:8000
REACT_APP_RECAPTCHA_SITE_KEY=
EOL

# 10. Crear .gitignore raíz
if [ ! -f .gitignore ]; then
  echo "🛡️ Creando .gitignore..."
  cat <<EOL > .gitignore
node_modules/
client/raffle-ui/node_modules/
server/raffle-draw-api/node_modules/
raffle-ui/.env
raffle-draw-api/.env
dist/
build/
EOL
fi

echo "✅ Proyecto Raffle completamente inicializado y organizado."
echo "🚀 Puedes correr todo con: npm start"
