Meteor.subscribe('PatientPrescriptions');


Template.patientPrescriptions.helpers({
  patientPrescriptions() {
    return PatientPrescriptions.find();
  }
});


Template.patientPrescriptions.events({
  'click button'(event, instance) {
    console.log('click', instance);
    FlowRouter.go('addPrescription');
  }
});


