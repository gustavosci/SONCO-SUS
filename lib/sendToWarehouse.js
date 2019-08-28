/**
 * Send To Warehouse Transaction
 * @param {org.sonco.sus.order.SendToWarehouse} data
 * @transaction
 * 
 */
function SendToWarehouse(data) {
    var orderRegistry = {};
    
    return getAssetRegistry('org.sonco.sus.order.Order').then(function(registry){        
        orderRegistry = registry;
        return orderRegistry.get(data.orderId);
    }).then(function(order){    
        if(!order){
            throw new Error("Order : " + data.orderId + " Not Found!");
        } 

        if (order.status != "OPEN"){
            throw new Error("Order " + data.orderId + " is not OPEN!");
        }

        order.sentAdditionalInfoToWarehouse = data.sentAdditionalInfoToWarehouse;
        order.status = "SENT_TO_WAREHOUSE";
        return orderRegistry.update(order);
    }).catch(function(error){
        throw new Error(error);
    });
}
