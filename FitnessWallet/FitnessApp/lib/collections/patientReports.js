PatientReports = new Mongo.Collection('PatientReports');

EthereumAuditLogPatientSchema = new SimpleSchema([
  PatientSchema,
  {
    "transactionHash": {
      "type": String,
      "optional": true
    },
    "contractAddress": {
      "type": String,
      "optional": true
    }
  }
]);
PatientReports.attachSchema( EthereumAuditLogPatientSchema );


