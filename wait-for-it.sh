#!/usr/bin/env bash
# wait-for-it.sh: Script para esperar que um serviço esteja pronto.

set -e

host="$1"
shift
cmd="$@"

until nc -z "$host" 3306; do
  >&2 echo "Aguardando o banco de dados em $host..."
  sleep 1
done

>&2 echo "Banco de dados está pronto - executando comando."
exec $cmd
