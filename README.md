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
2. composer network install -a sonco-sus@0.0.2.bna -c PeerAdmin@hlfv1
3. composer network upgrade -c PeerAdmin@hlfv1 -V 0.0.2 -n sonco-sus


# Add a new participant
https://hyperledger.github.io/composer/managing/participant-add.html

composer participant add -d '{"$class":"org.acme.airline.participant.ACMENetworkAdmin","participantKey":"johnd","contact":{"$class":"org.acme.airline.participant.Contact","fName":"John","lname":"Doe","email":"john.doe@acmeairline.com"}}' -c admin@airlinev8

# Issue an identity
composer identity issue -u johnd -a org.sonco.sus.participant.NetworkAdmin#johnd -c admin@sonco-sus -x

# List the identities
composer identity list -c admin@sonco-sus

# Launch REST Server
composer-rest-server -c admin@sonco-sus -n always -w true

# Ping 
composer network ping -c admin@sonco-sus
