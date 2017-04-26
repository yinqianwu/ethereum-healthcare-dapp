import patient from './patient';

export default function(patientRecord) {
  console.log('Creating patient...');
  
  // insert patient record in db
  var id = PatientReports.insert(patientRecord);
  console.log('New patient id: ' + id);

  // Create patient contract on blockchain
  // create blockchain contract
  var p = patient.new();

  p.then((transactionHash) => {
    console.log('transactionHash:', transactionHash);

    PatientReports.update({_id : id}, {$set: {
      transactionHash: transactionHash
    }});
  });
}

  // createPatient:function(patientObject){
  //   check(patientObject, Object);

  //   if (process.env.NODE_ENV === 'test') {
  //     console.log('-----------------------------------------');
  //     console.log('Creating Patient...');
  //     Patients.insert(patientObject, function(error, result){
  //       if (error) {
  //         console.log(error);
  //         if (typeof HipaaLogger === 'object') {
  //           // HipaaLogger.logEvent('error', Meteor.userId(), Meteor.user().getPrimaryEmail(), 'Patients', null, null, null, error);
  //           HipaaLogger.logEvent({
  //             eventType: "error",
  //             userId: Meteor.userId(),
  //             userName: Meteor.user().fullName(),
  //             collectionName: "Patients"
  //           });
  //         }
  //       }
  //       if (result) {
  //         console.log('Patient created: ' + result);
  //         if (typeof HipaaLogger === 'object') {
  //           // HipaaLogger.logEvent('create', Meteor.userId(), Meteor.user().getPrimaryEmail(), 'Patients', null, null, null, null);
  //           HipaaLogger.logEvent({
  //             eventType: "create",
  //             userId: Meteor.userId(),
  //             userName: Meteor.user().fullName(),
  //             collectionName: "Patients"
  //           });
  //         }
  //       }
  //     });
  //   } else {
  //     console.log('This command can only be run in a test environment.');
  //     console.log('Try setting NODE_ENV=test');
  //   }
  // },