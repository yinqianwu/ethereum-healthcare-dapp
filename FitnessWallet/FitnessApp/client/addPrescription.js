// Meteor.subscribe('prescriptions');

Template.addPrescription.events({
  'submit'(event, instance) {
    event.preventDefault();
    var newPrescription = {
      name: event.target.name.value,
      mrn: event.target.mrn.value,
      prescription: event.target.prescription.value,
    }
   // build FHIR Json format
    var newPatientPrescription = {
    "resourceType" : "MedicationPrescription",
    'identifier' : [{
          'use' : 'usual',
          'type' : {
            text: 'MedicationPrescription',
            'coding' : [
              {
                'system' : 'http://hl7.org/fhir/v2/0203',
                'code' : 'MR'
              }
            ]
          },
          'system' : 'urn:oid:1.2.36.146.595.217.0.1',
          'value' : event.target.mrn.value,
          'period' : {}
      }],
    // External identifier
    "dateWritten" : "<dateTime>", // When prescription was authorized
    "status" : "<code>", // active | on-hold | completed | entered-in-error | stopped | superceded | draft
    'name' : [
        {
          'text' : event.target.name.value,
          'resourceType' : 'PatientName'
        }
      ],
    "prescriber" : "Reference(Practitioner)", // Who ordered the medication(s)
    "encounter" : "Reference(Encounter)", // Created during encounter / admission / stay
    // reason[x]: Reason or indication for writing the prescription. One of these 2:
    "reasonCodeableConcept" : "CodeableConcept",
    "reasonReference" : "Reference(Condition) ",
    "note" : "  Prescription", // Information about the prescription
    'text': {
        'status': 'generated',
        'div': event.target.prescription.value
      }, 
    "medication" : "Reference(Medication) ", // Medication to be taken
    "dosageInstruction" : [{ // How medication should be taken
      "text" : "<string>", // Dosage instructions expressed as text
      "additionalInstructions" : "Supplemental instructions e.g. with meals", // 
      // scheduled[x]: When medication should be administered. One of these 3:
      "scheduledDateTime" : "<dateTime>",
      "scheduledPeriod" : " Period ",
      "scheduledTiming" : " Timing ",
      // asNeeded[x]: Take "as needed" f(or x). One of these 2:
      "asNeededBoolean" : "<boolean>",
      "asNeededCodeableConcept" : " CodeableConcept ",
      "site" : " CodeableConcept ", // Body site to administer to
      "route" : " CodeableConcept ", // How drug should enter body
      "method" : " CodeableConcept ", // Technique for administering medication
      // dose[x]: Amount of medication per dose. One of these 2:
      "doseRange" : " Range ",
      "doseQuantity" : " Quantity ",
      "rate" : " Ratio ", // Amount of medication per unit of time
      "maxDosePerPeriod" : "Ratio " // Upper limit on medication per unit of time
    }],
    "dispense" : { // Medication supply authorization
      "medication" : " Reference(Medication) ", // Product to be supplied
      "validityPeriod" : " Period ", // Time period supply is authorized for
      "numberOfRepeatsAllowed" : "<positiveInt>", // # of refills authorized
      "quantity" : " Quantity ", // Amount of medication to supply per dispense
      "expectedSupplyDuration" : " Duration " // Days supply per dispense
    },
    "substitution" : { // Any restrictions on medication substitution?
      "type" : " CodeableConcept ", // R!  generic | formulary +
      "reason" : " CodeableConcept " // Why should substitution (not) be made
    }
  };


  	console.log('New Prescription Created', newPatientPrescription);

    Meteor.call('addPrescription', newPatientPrescription, function(err,res) {
        // if(!err) {
          FlowRouter.go('patientPrescriptions');
        // }
    });
  },


  'click #cancel'(event, instance) {
    event.preventDefault();
    FlowRouter.go('patientPrescriptions');
  }
});


