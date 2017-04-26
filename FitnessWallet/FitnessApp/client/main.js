import './main.html';
import './accounts-ethereum/login.js';

import { Template } from 'meteor/templating';

Template.main.helpers({
  metamask() {
    if(typeof mist === 'undefined' && web3) {
      return true;
    }
    return false;
  },
  userRegistered() {
    return Meteor.user().userRegistered;
  }
});

Tracker.autorun(function () {
    Meteor.subscribe("userData");

    // Meteor.subscribe('patientReports');
    var patientSubscription = {
      // criteria: "/Patient?identifier=http://acme.org/patient/123",
      criteria: "/PatientReport",
      status: 'active',
      channel: { 
        type: 'websocket',
        endpoint: Meteor.absoluteUrl()    
      }
    }

      var prescriptionSubscription = {
      // criteria: "/Patient?identifier=http://acme.org/patient/123",
      criteria: "/PatientPrescription",
      status: 'active',
      channel: { 
        type: 'websocket',
        endpoint: Meteor.absoluteUrl()    
        }
      }
    Meteor.subscribe("patientPrescriptions", prescriptionSubscription);
    Meteor.subscribe("patientReports", patientSubscription);
});


