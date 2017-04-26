PatientPrescriptions = new Mongo.Collection('PatientPrescriptions');


PatientPrescriptions.allow({
	insert: function(userId, doc) {
		return !!userId;
	}
});

// EthereumAuditLogRxSchema = new SimpleSchema([
//   PrescriptionSchema,
//   {
//     "transactionHash": {
//       "type": String,
//       "optional": true
//     },
//     "contractAddress": {
//       "type": String,
//       "optional": true
//     }
//   }
// ]);
// Prescriptions.attachSchema( EthereumAuditLogRxSchema );




// Medicines  = new SimpleSchema({
// 	name: {
// 		type: String,
// 		label: "name"
// 	},
// 	amount: {
// 		type: String,
// 		label: "mrn"
// 	}
// });

// PrescriptionSchema = new SimpleSchema({
// 	name: {
// 		type: String,
// 		label: "name"
// 	},
// 	mrn: {
// 		type: String,
// 		label: "mrn"
// 	},
// 	prescription: {
// 		type: String,
// 		label: "prescription"
// 	},

// 	// medicines: {
// 	// 	type: [Medicines],
// 	// 	label: "Medicines"
// 	// },
// 	doctor: {
// 		type: String,
// 		label: "Doctor",
// 		autoValue: function() {
// 			return this.userID
// 		},
// 		// autoform: {
// 		// 	type: "hidden"
// 		// }
// 	},
// 	CreatedAt: {
// 		type: Date,
// 		label: "Created At",
// 		autoValue: function() {
// 			return new Date()
// 		},
// 		// autoform: {
// 		// 	type: "hidden"
// 		// }
// 	}
// });