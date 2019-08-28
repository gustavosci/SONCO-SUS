/**
 * Create Order Transaction
 * @param {org.sonco.sus.order.CreateOrder} data
 * @transaction
 * 
 */
function CreateOrder(data) {
    
    return getAssetRegistry('org.sonco.sus.order.Order')
    
    .then(function(registry){

        var factory = getFactory();
        var ns =  'org.sonco.sus.order';
        var asset =  'Order';

        var id = generateId(data.solicitantId, data.date);
        var order = factory.newResource(ns, asset, id);
        
        var solicitant = factory.newRelationship('org.sonco.sus.participant', 'StateSecretary', data.solicitantId);
        order.solicitant = solicitant;

        order.diagnosis = data.diagnosisIds.map(function(dId) {
            return factory.newRelationship('org.sonco.sus.diagnosis', 'Diagnosis', dId);
        });

        //order.diagnosis = [];
        // order.diagnosis.push(factory.newRelationship('org.sonco.sus.diagnosis', 'Diagnosis', 'PA03-RS_SAPIRANGA_01-08-28-19'));
        order.date = data.date;
        
        return registry.add(order);
    });

    /**
     *  Generate Order ID 
     */
    function generateId(solicitantId, date){
        var dt = new Date(date)

        var month = dt.getMonth()+1;
        if((month+'').length == 1)  month = '0'+month;
        var dayNum = dt.getDate();
        if((dayNum+'').length == 1)  dayNum = '0'+dayNum;

        return solicitantId + '-' + month + '-' + dayNum + '-' + (dt.getFullYear()+'').substring(2,4);
    }
}
