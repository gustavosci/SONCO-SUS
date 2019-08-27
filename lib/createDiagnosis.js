/**
 * Create Diagnosis Transaction
 * @param {org.sonco.sus.diagnosis.CreateDiagnosis} data
 * @transaction
 * 
 */
function createDiagnosis(data) {
    var timeNow = new Date().getTime();
    var scheduleTime = new Date(data.date).getTime();
    if(scheduleTime < timeNow){
        throw new Error("Diagnosis date cannot be in the past!");
    }

    return getAssetRegistry('org.sonco.sus.diagnosis.Diagnosis')
    
    .then(function(registry){

        var factory = getFactory();
        var ns =  'org.sonco.sus.diagnosis';
        var asset =  'Diagnosis';

        var diagnosisId = generateId(data.patientId, data.hospitalId, data.date);
        var diagnosis = factory.newResource(ns, asset, diagnosisId);
        
        var patient = factory.newRelationship('org.sonco.sus.participant', 'Patient', data.patientId);
        var hospital = factory.newRelationship('org.sonco.sus.participant', 'Hospital', data.hospitalId);

        diagnosis.patient = patient;
        diagnosis.hospital = hospital;
        diagnosis.disease = data.disease;
        diagnosis.date = data.date;
        diagnosis.description = data.description;

        var treatment = factory.newConcept(ns,"Treatment");
        treatment.medicine = data.treatment.medicine;
        treatment.expiration = data.treatment.expiration;

        diagnosis.treatment = treatment;
        
        return registry.add(diagnosis);
    });

    /**
     *  Generate Diagnosis ID 
     */
    function generateId(patientId, hospitalId, date){
        var dt = new Date(date)

        var month = dt.getMonth()+1;
        if((month+'').length == 1)  month = '0'+month;
        var dayNum = dt.getDate();
        if((dayNum+'').length == 1)  dayNum = '0'+dayNum;

        return patientId+'-'+hospitalId+'-'+month+'-'+dayNum+'-'+(dt.getFullYear()+'').substring(2,4);
    }
}
