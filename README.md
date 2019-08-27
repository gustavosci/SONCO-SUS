# SONCO-SUS
SONCO-SUS - Suplementação Oncológica do SUS

Aplicação desenvolvida para Trabalho de Conclusão do Curso Bacharel em Sistemas de Informação. 

Aplicação baseada no framework Hyperledger Fabric para construição de redes Blockchain.

# Create the archive
cd dist
composer archive create  --sourceType dir --sourceName ../

# Install the network
composer network install -a ./<file.bna>.bna -c PeerAdmin@hlfv1

# Start the network
composer network start -c PeerAdmin@hlfv1 -n sonco-sus -V <version>  -A admin -S adminpw

# Import the newly generated card
composer card import -f <name>.card

# Check health of BNA
composer network ping -c admin@sonco-sus
composer network list -c admin@sonco-sus

# To upgrade
1. composer archive create  --sourceType dir --sourceName ../
2. composer network install -a sonco-sus@0.0.6.bna -c PeerAdmin@hlfv1
3. composer network upgrade -c PeerAdmin@hlfv1 -V 0.0.6 -n sonco-sus


# Add a new participant
https://hyperledger.github.io/composer/managing/participant-add.html

composer participant add -d '{
  "$class": "org.sonco.sus.participant.Patient",
  "age": 26,
  "gender": "MALE",
  "participantId": "PA02",
  "contact": {
    "$class": "org.sonco.sus.participant.Contact",
    "fName": "Gustavo",
    "lname": "Santos",
    "email": "gustavosci@live.com",
    "address": "Rua Barão do Rio Branco,463",
    "city": "Sapiranga",
    "uf": "RS"
  }
}' -c RS_SAPIRANGA_01@sonco-sus

# Issue an identity
composer identity issue -u RS01 -a org.sonco.sus.participant.StateSecretary#RS01 -c admin@sonco-sus -x

composer identity issue -u RS_SAPIRANGA_01 -a org.sonco.sus.participant.Hospital#RS_SAPIRANGA_01 -c admin@sonco-sus -x

composer identity issue -u DAF01 -a org.sonco.sus.participant.Daf#DAF01 -c admin@sonco-sus -x

composer identity issue -u WH01 -a org.sonco.sus.participant.Warehouse#WH01 -c admin@sonco-sus -x

composer identity issue -u PA02 -a org.sonco.sus.participant.Patient#PA02 -c RS_SAPIRANGA_01@sonco-sus -x

# List the identities
composer identity list -c admin@sonco-sus

# Launch REST Server
composer-rest-server -c admin@sonco-sus -n always -w true

# Ping 
composer network ping -c admin@sonco-sus

# Create participants
{
  "$class": "org.sonco.sus.participant.StateSecretary",
  "participantId": "RS01",
  "contact": {
    "$class": "org.sonco.sus.participant.Contact",
    "fName": "CPAF",
    "lname": "Rio Grande do Sul",
    "email": "cpaf@rs.gov.br",
    "address": "Rua Bartolomeu, 458",
    "city": "Porto Alegre",
    "uf": "RS"
  }
}

{
  "$class": "org.sonco.sus.participant.Hospital",
  "type": "CACON",
  "stateSecretaryResponsible": "org.sonco.sus.participant.StateSecretary#RS01",
  "participantId": "RS_SAPIRANGA_01",
  "contact": {
    "$class": "org.sonco.sus.participant.Contact",
    "fName": "Hospital Beneficiente Sapiranga",
    "email": "hospital@sapiranga.gov.br",
    "address": "RUa Getulio Vargas, 555",
    "city": "Sapiranga",
    "uf": "RS"
  }
}

{
  "$class": "org.sonco.sus.participant.Daf",
  "participantId": "DAF01",
  "contact": {
    "$class": "org.sonco.sus.participant.Contact",
    "fName": "DAF",
    "lname": "Ministério da Saúde",
    "email": "daf@daf.com",
    "address": "RUa XYT, 666",
    "city": "Brasilia",
    "uf": "DF"
  }
}

{
  "$class": "org.sonco.sus.participant.Warehouse",
  "stateSecretaryResponsible": "org.sonco.sus.participant.StateSecretary#RS01",
  "participantId": "WH01",
  "contact": {
    "$class": "org.sonco.sus.participant.Contact",
    "fName": "Almoxarifado Central",
    "email": "almoxcentral@rs.gov.br",
    "address": "Rua Padre Cacique, 555",
    "city": "Porto Alegre",
    "uf": "RS"
  }
}

{
  "$class": "org.sonco.sus.participant.Patient",
  "age": 26,
  "gender": "MALE",
  "participantId": "PA02",
  "contact": {
    "$class": "org.sonco.sus.participant.Contact",
    "fName": "Gustavo",
    "lname": "Santos",
    "email": "gustavosci@live.com",
    "address": "RUa Barão do RIo Branco,463",
    "city": "Sapiranga",
    "uf": "RS"
  }
}