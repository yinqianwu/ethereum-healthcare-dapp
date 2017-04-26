import './accounts-ethereum/register.js';

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import createPatient from './createPatient.js';
import harvestTransactions from './harvestTransactions.js';
import web3 from './web3.js'
// import resource from './resource';
// import getOrCreateTestInstanceAddress from './getOrCreateTestInstanceAddress';



Meteor.publish("patientPrescriptions", function() {

  if(this.userId) {
    return PatientPrescriptions.find();
  }
});



Meteor.publish("userData", function () {
    return Meteor.users.find({_id: this.userId},
        {fields: {
          'userRegistered': 1,
          'permission' : 1,
          'firstName' : 1,
          'lastName' : 1,
          'services.ethereum.address' : 1
        }
      });
});

Meteor.publish('patientReports', function(subscription) {
  // if(this.userId) {
  //   return Patients.find();
  // }
  if(subscription.status === 'active'){
    if (this.userId) {
      var criteriaObject = parseCriteriaString(subscription.criteria);
      return PatientReports.find(criteriaObject.query);
    } else {
      return [];
    }
  } else {
    return [];
  }
});

parseCriteriaString = function(criteria){
  var result = {
    collection: '',
    query: {}
  };
  
  // is this a serialized complex object?
  if (criteria && criteria.includes('?')){
    // the base before the ? gets assigned to the collection
    var criteriaArray = criteria.split('?');
    result.query.collection = criteriaArray[0].replace('/', '').trim();
    
    // then we want to look at how many parameters were given
    var paramsArray = [];
    if(criteriaArray && criteriaArray[1]){
      paramsArray = criteriaArray[1].split('&');

      paramsArray.forEach(function(param){
        // for each parameter, figure out the field name and the value
        var fieldArray = param.split('=');

        // some data types require subfields
        if (fieldArray[0] === "identifier"){
          result.query['identifier.value'] = fieldArray[1];
        }
    
        // continue with the rest of the search specification
        // https://www.hl7.org/fhir/search.html
      });
    }    
  } 
  
  console.log('parseCriteriaString', result);
  // deserialize string into mongo query
  return result;
}






Meteor.startup(() => {
  harvestTransactions.start();

 
  /*var filter = web3.eth.filter({
    address: '0x5061f6f976924e91ae067732055d45cd6849e1bb',
    fromBlock: 0
  });
  filter.get(function(err,result) {
    console.log('get', result);
  });
  */

  // var patientAccessedTopic = web3.sha3('PatientAccessed(address)');

  // // get all events for a given patient
  // var filter = web3.eth.filter({
  //   address: '0x5061f6f976924e91ae067732055d45cd6849e1bb',
  //   fromBlock: 0
  // });
  // filter.watch(function(err, result) {
  //   console.log('watch patient', err, result);
  // });


  // // get all events for a given user
  // var filter2 = web3.eth.filter({
  //   topics: [
  //     null,//"0x5e2510585e36c769ee0aa8d684b60b5f6efca424bb7cd9b1bab30f76120789e0",
  //     "0x0000000000000000000000005dfe021f45f00ae83b0aa963be44a1310a782fcc"
  //     //"0x0000000000000000000000009332827e1240c5b9ba035a18fafbb0c7794a0c31"
  //     ],
  //   fromBlock: 0});
  // filter2.watch(function(err, result) {
  //   console.log('watch user', err, result);
  // });

  // // get PatientAccessed events for a given user
  // var filter3 = web3.eth.filter({
  //   topics: [
  //     patientAccessedTopic,
  //     "0x0000000000000000000000009332827e1240c5b9ba035a18fafbb0c7794a0c31"
  //   ],
  //   fromBlock: 0
  // });
  // filter3.watch(function(err, result) {
  //   console.log('watch user', err, result);
  // });



  // if(Prescriptions.find().count() === 0) {
  //   Prescriptions.insert({
  //     name: 'Yinqian Wu',
  //     mrn: '0003',
  //     prescription: 'Rx tab. Paracetamol 500mg↵  Mitte 30↵ Sig 1 tab or…phine 2.5mg↵ Mitte 10↵ Sig 1 tab 1x day'
  //   });
  // }
  //Prescriptions.remove({});



  // code to run on server at startup
  if(RegistrationCodes.find().count() === 0) {
    RegistrationCodes.insert({
      code: 'H37o981912MA3vb',
      firstName: 'Charles Francis',
      lastName: ' Xavier',
      permission: 'clinician'
    });
    RegistrationCodes.insert({
      code: 'M8XzRY47RZOx1HI',
      firstName: 'Stan',
      lastName: 'Lee',
      permission: 'admin'
    });

      RegistrationCodes.insert({
      code: '1234567890ABC',
      firstName: 'Yinqian',
      lastName: 'Wu',
      permission: 'admin'
    });
  }
  //Patients.remove({});

});



// get cmx location API

Meteor.publish('CmxApiSearch', function() {
  var init = true;
  var self = this;
  Meteor.setInterval(function() {
    
    try{

      var response = HTTP.get('http://127.0.0.1:1880/clients').data; // for JSON
      
      if (init) {
              
        self.added('CmxApiSearch', '1', {response});
      } else {
        self.changed('CmxApiSearch', '1', {response});
      }
      self.ready();
      init = false;
    }catch (error) {
        console.log("Error: 127.0.0.1:1880 connection refused. Please start CMX API by Node-Red");
    }
  }, 1000);
});




Meteor.publish('Visitors', function visitorsPublication() {

  if(this.userId) {
    return Visitors.find();
  }
});


// deploy contract on blockchain after patient entering hospital

function addvisitAudit(visitor) {
  console.log("Adding contract logs to Ethereum Blockchain");

  web3.personal.unlockAccount(web3.eth.accounts[0], 'iloveethereum');
  // NOTE: Unlocking an account requires geth to expose the personal API via
  // RPC which is a major security hole.  This is just the most convenient
  // for a prototype - the right way should be to sign the transaction
  // and submit it via sendRawTransaction

  // the following code was generated by the online solidity compiler for
  // the auditAccess.sol
  var _building = 'San Jose building 12';
  var _visitor = visitor;
  var _timeStamp = new Date().getTime() / 1000;
  var auditentryContract = web3.eth.contract([{"constant":true,"inputs":[],"name":"timeStamp","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"visitor","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"building","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"inputs":[{"name":"_building","type":"string"},{"name":"_visitor","type":"address"},{"name":"_timeStamp","type":"uint256"}],"payable":false,"type":"constructor"}]);
  var auditentry = auditentryContract.new(
     _building,
     _visitor,
     _timeStamp,
     {
       from: web3.eth.accounts[0],
       data: '6060604052341561000c57fe5b604051610476380380610476833981016040528080518201919060200180519060200190919080519060200190919050505b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555082600190805190602001906100959291906100e7565b5081600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550806003819055505b50505061018c565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061012857805160ff1916838001178555610156565b82800160010185558215610156579182015b8281111561015557825182559160200191906001019061013a565b5b5090506101639190610167565b5090565b61018991905b8082111561018557600081600090555060010161016d565b5090565b90565b6102db8061019b6000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630ab0df871461005c5780638da5cb5b14610082578063d4fc3f43146100d4578063e7dc333614610126575bfe5b341561006457fe5b61006c6101bf565b6040518082815260200191505060405180910390f35b341561008a57fe5b6100926101c5565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156100dc57fe5b6100e46101eb565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561012e57fe5b610136610211565b6040518080602001828103825283818151815260200191508051906020019080838360008314610185575b80518252602083111561018557602082019150602081019050602083039250610161565b505050905090810190601f1680156101b15780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b60035481565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156102a75780601f1061027c576101008083540402835291602001916102a7565b820191906000526020600020905b81548152906001019060200180831161028a57829003601f168201915b5050505050815600a165627a7a72305820f266ffe7de958be9088d88a1d1e108b88138c898118aa30d741a2164175e742b0029',
       gas: '4700000'
     }, function (e, contract){
      //console.log(e, contract);
      if (typeof contract.address !== 'undefined') {
           console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
      }
   });
}



// //parse cmx api

Meteor.methods({
  newVisitor : function(visitor) {
      if (visitor.lat == 37.411536 && visitor.lng == -121.928981){ 
    console.log(' visitor', visitor.name, 'just entered San Jose building 12');
    // Add an auditEntry contract to ethereum with this user's public key and
    Visitors.insert({'name': visitor.name,
                      'lat': visitor.lat,
                      'lng': visitor.lng,
                      'unc': visitor.unc,
                      'ap' : visitor.ap,
                      'mac': visitor.mac,
                      'os' : visitor.os,
                      'ssid': visitor.ssid,
                      'seenEpoch': visitor.seenEpoch,
                      'seenTime': visitor.seenString,
                      'manufacturer': visitor.manufacturer,
                      });
    // the patient's public key
    addvisitAudit(visitor.ethereumAddress);
  }
  }
});



// get FitBit api 

// Meteor.publish('FitBitApiSearch', function() {
//   var init = true;
//   var self = this;
//   Meteor.setInterval(function() {
  
//   var response = HTTP.get('https://api.fitbit.com/1/user/-/activities/heart/date/2017-03-23/1d.json', {
//       headers: {
//               'Authorization':'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1S0c3U1oiLCJhdWQiOiIyMjg4SE0iLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJ3aHIgd251dCB3cHJvIHdzbGUgd3dlaSB3c29jIHdzZXQgd2FjdCB3bG9jIiwiZXhwIjoxNDkxODc5ODMzLCJpYXQiOjE0OTE4NTEwMzN9.kIHe2ybx5twSXKMEBmrkmo22yLG9NGyQ80ibNg7SWQI',
//               'Content-Type':'application/json'   
//                 }
//     });
 
//     console.log(response.data)；

//     if (init) {
//       self.added('FitBitApiSearch', '1', {response});
//     } else {
//       self.changed('FitBitApiSearch', '1', {response});
//     }
//     self.ready();
//     init = false;
//   }, 1000);
// });


  //   HTTP.call( 'GET', 'https://api.fitbit.com/1/user/-/activities/heart/date/2017-03-23/1d.json', { headers:{'Authorization':'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1S0c3U1oiLCJhdWQiOiIyMjg4SE0iLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJ3aHIgd251dCB3cHJvIHdzbGUgd3dlaSB3c29jIHdzZXQgd2FjdCB3bG9jIiwiZXhwIjoxNDkxODc5ODMzLCJpYXQiOjE0OTE4NTEwMzN9.kIHe2ybx5twSXKMEBmrkmo22yLG9NGyQ80ibNg7SWQI',
  //     'Content-Type':'application/json'}}, function( error, response ) {
  //     if ( error ) {
  //       console.log( error );
  //     } else {
  //       console.log( response.data ); 
  //     };
  // })
    // var response = HTTP.call('GET','https://api.fitbit.com/1/user/-/activities/heart/date/2017-03-23/1d.json',{
    //   headers:{'Authorization':'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1S0c3U1oiLCJhdWQiOiIyMjg4SE0iLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJ3aHIgd251dCB3cHJvIHdzbGUgd3dlaSB3c29jIHdzZXQgd2FjdCB3bG9jIiwiZXhwIjoxNDkxODc5ODMzLCJpYXQiOjE0OTE4NTEwMzN9.kIHe2ybx5twSXKMEBmrkmo22yLG9NGyQ80ibNg7SWQI',
    //   'Content-Type':'application/json'}
    // }).data; // for JSON
    
    // console.log( response );





