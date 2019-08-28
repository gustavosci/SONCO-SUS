/**
 * Send To Hospitals Transaction
 * @param {org.sonco.sus.order.SendToHospitals} data
 * @transaction
 * 
 */
function SendToHospitals(data) {
    var orderRegistry = {};
    
    return getAssetRegistry('org.sonco.sus.order.Order').then(function(registry){        
        orderRegistry = registry;
        return orderRegistry.get(data.orderId);
    }).then(function(order){    
        if(!order){
            throw new Error("Order : " + data.orderId + " Not Found!");
        } 

        if (order.status != "SENT_TO_WAREHOUSE"){
            throw new Error("Order " + data.orderId + " is not SENT_TO_WAREHOUSE!");
        }

        order.sentAdditionalInfoToHospitals = data.sentAdditionalInfoToHospitals;
        order.status = "SENT_TO_HOSPITAL";
        return orderRegistry.update(order);
    }).catch(function(error){
        throw new Error(error);
    });

}
