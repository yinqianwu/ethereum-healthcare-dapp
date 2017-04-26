import createPrescription from '../createPrescription.js';


PatientPrescriptions.allow({
	insert: function(userId, doc) {
		return !!userId;
	}
});

Meteor.methods({
  'addPrescription' : function(newPrescription)  {
    console.log(this.UserId);
    console.log(newPrescription);

    // Prescriptions.insert(newPrescription);
    
    createPrescription(newPrescription);
  }
});
