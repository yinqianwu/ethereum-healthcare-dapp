
Template.patient.events({
  'click tr'(event, instance) {
    //console.log('click', instance);
    Meteor.call('logPatientAccessed', instance.data._id);
    FlowRouter.go('/viewReport/' + instance.data._id);
  },

})

Template.registerHelper('getName', function(){
  if(this.name && this.name[0] && this.name[0].text){
    return this.name[0].text;       
  } else {
    return '';
  }
});

// Template.registerHelper('getMrn', function(){
//   if(this.mrn && this.mrn[0] && this.mrn[0].value){
//     return this.identifier[0].value;       
//   } else {
//     return '';
//   }
// });


Template.registerHelper('getMrn', function(){

    return this.identifier[0].value;       
 
});

Template.registerHelper('getDateOfBirth', function(){
  if(this.birthDate){
    return this.birthDate;     
  } else {
    return '';
  }
});

Template.registerHelper('getReport', function(){
  if(this.text && this.text.div){
    return this.text.div;     
  } else {
    return '';
  }
});
