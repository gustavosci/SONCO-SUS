/**
 * Set Apac Transaction
 * @param {org.sonco.sus.diagnosis.SetApac} data
 * @transaction
 * 
 */
function SetApac(data) {
    var diagnosisRegistry = {};
    
    return getAssetRegistry('org.sonco.sus.diagnosis.Diagnosis').then(function(registry){        
        diagnosisRegistry = registry;
        return diagnosisRegistry.get(data.diagnosisId);
    }).then(function(diagnosis){    
        if(!diagnosis){
            throw new Error("Diagnosis : " + data.diagnosisId + " Not Found!");
        } 
        diagnosis.numberApac = data.numberApac;
        return diagnosisRegistry.update(diagnosis);
    }).catch(function(error){
        throw new Error(error);
    });
}
