

PatientReports.after.insert(function (userId, doc) {
  console.log('Patients.after.insert');
  console.log('We should probably write to the Etherium ledger here...');
  // ...

});
PatientReports.after.update(function (userId, doc) {
  console.log('Patients.after.update');
  console.log('We should probably write to the Etherium ledger here...');
  // ...

});
PatientReports.after.remove(function (userId, doc) {
  console.log('Patients.after.remove');
  console.log('We should probably write to the Etherium ledger here...');
  // ...

});
