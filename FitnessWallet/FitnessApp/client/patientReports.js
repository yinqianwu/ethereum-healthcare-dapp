Template.patientReports.helpers({
  patientReports() {
    return PatientReports.find();
  }
});

Template.patientReports.events({
  'click button'(event, instance) {
    console.log('click', instance);
    FlowRouter.go('addPatientReport');
  }
});
