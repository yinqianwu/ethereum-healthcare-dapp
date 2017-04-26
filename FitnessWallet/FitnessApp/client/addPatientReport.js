Template.addPatientReport.events({
  'submit'(event, instance) {
    event.preventDefault();
    var patient = {
      name: event.target.name.value,
      mrn: event.target.mrn.value,
      dob: event.target.dob.value,
      report: event.target.report.value
    }
    console.log('patient', patient);
   // build FHIR json format 
    var newPatientReport = {
      'name' : [
        {
          'text' : event.target.name.value,
          'resourceType' : 'HumanName'
        }
      ],
      'active' : true,
      'gender' : 'male',
      'identifier' : [{
          'use' : 'usual',
          'type' : {
            text: 'Medical Record Number',
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
      //'birthDate' : new Date(1970, 1, 25),
      'birthDate' : new Date(event.target.dob.value),
      'text': {
        'status': 'generated',
        'div': event.target.report.value
      },
      'resourceType' : 'Patient'
    };


    console.log('newPatientReport', newPatientReport);
    Meteor.call('addPatientReport', newPatientReport, function(err,res) {
      if(!err) {
        FlowRouter.go('patientReports');
      }
    });
  },
  'click #cancel'(event, instance) {
    event.preventDefault();
    FlowRouter.go('patientReports');
  }
});
