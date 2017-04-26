Template.prescription.events({
  'click tr'(event, instance) {
    //console.log('click', instance);
    // Meteor.call('logPatientAccessed', instance.data._id);
    FlowRouter.go('/viewPrescription/' + instance.data._id);
  },

})


Template.registerHelper('getPatientName', function(){
    return this.name[0].text;       
});
Template.registerHelper('getPatientMrn', function(){
    return this.identifier[0].value;       
 
});

Template.registerHelper('getId', function(){
    return this._id;     
});


Template.registerHelper('getPrescription', function(){

    return this.text.div;     

});


