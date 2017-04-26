Template.viewPrescription.helpers({
  prescription: function(){
    console.log('viewPrescription', FlowRouter)
    return PatientPrescriptions.findOne({_id: FlowRouter._current.params.id});
  }
});
Template.viewPrescription.events({
  'click #close'(event, instance) {
    event.preventDefault();
    //console.log(instance);
    FlowRouter.go('patientPrescriptions');
  }
});
