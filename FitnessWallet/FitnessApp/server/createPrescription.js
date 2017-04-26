import prescription from './prescription';
import patient from './patient';

export default function(prescription) {
  console.log('Creating prescription...');
  
  // insert prescription record in db
  var id = PatientPrescriptions.insert(prescription);
  console.log('New prescription No.', id);

  // Create prescription contract on blockchain
  // create blockchain contract
  // var rx = patient.new();
  var rx = prescription.new();

  rx.then((transactionHash) => {
    console.log('transactionHash:', transactionHash);

    PatientPrescriptions.update({_id : id}, {$set: {
      transactionHash: transactionHash
    }});
  });
}