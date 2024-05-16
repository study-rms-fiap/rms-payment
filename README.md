# RMS Order Microservice

## Executar via kubernetes
1. Crie um arquivo .env na raiz do projeto e preencha os valores a serem utilizados. Atençao especial ao valor de `DB_HOST` que deve ser o mesmo usado na configuraçao do nome do serviço de banco de dados nos yaml. Caso vc não altere, o valor `svc-db-payment`
2. Execute o comando `docker build -t esantiagovieira/rms-api-payment:latest .` para buildar a imagem localmente. 
3. Navegue até o diretório ./k8/dev e execute o comando kubectl apply -f .
4. A aplicaçao deverá ficar disponível após alguns segundos em `http://localhost:30000/docs`