#!/bin/bash

# Objetivos
# 1 - Saber o que é aqueles arquivos .node

DIR=$(pwd)
DIROUT="$(pwd)/build"

if [ -d "$DIROUT" ]; then
  echo "Removendo Diretorio existentes"
  rm -rf $DIROUT
fi

mkdir -p $DIROUT

cp "$DIR/.env" "$DIROUT/.env"
yarn pkg "$DIR/package.json" --out-path $DIROUT