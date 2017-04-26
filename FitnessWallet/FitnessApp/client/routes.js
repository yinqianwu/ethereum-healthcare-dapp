FlowRouter.route('/patientReports', {
  name: 'patientReports',
  action(params, queryParams) {
    BlazeLayout.render('main', {main: 'patientReports'});
  }
});
FlowRouter.route('/', {
  name: 'home',
  action(params, queryParams) {
    BlazeLayout.render('main', {main: 'patientReports'});
  }
});

FlowRouter.route('/accessLogs', {
  name: 'accessLogs',
  action(params, queryParams) {
    BlazeLayout.render('main', {main: 'accessLogs'});
  }
});

FlowRouter.route('/patientLocation', {
  name: 'patientLocation',
  action(params, queryParams) {
    BlazeLayout.render('main', {main: 'patientLocation'});
  }
});

FlowRouter.route('/patientFitbit', {
  name: 'patientFitbit',
  action(params, queryParams) {
    BlazeLayout.render('main', {main: 'patientFitbit'});
  }
});

FlowRouter.route('/register', {
  name: 'register',
  action(params, queryParams) {
    BlazeLayout.render('main', {main: 'register'});
  }
});
FlowRouter.route('/requestAccess', {
  name: 'requestAccess',
  action(params, queryParams) {
    BlazeLayout.render('main', {main: 'requestAccess'});
  }
});
FlowRouter.route('/addPatientReport', {
  name: 'addPatientReport',
  action(params, queryParams) {
    BlazeLayout.render('main', {main: 'addPatientReport'});
  }
});
FlowRouter.route('/viewReport/:id', {
  name: 'viewReport',
  action(params, queryParams) {
    //console.log(params, queryParams);
    var item = PatientReports.findOne({_id: params.id});
    //console.log(item);
    BlazeLayout.render('viewReport', item);
  }
});

FlowRouter.route('/viewPrescription/:id', {
  name: 'viewPrescription',
  action(params, queryParams) {
    //console.log(params, queryParams);
    var item = PatientPrescriptions.findOne({_id: params.id});
    //console.log(item);
    BlazeLayout.render('viewPrescription', item);
  }
});



FlowRouter.route('/patientPrescriptions',{
  name:'patientPrescriptions',
  action() {
    BlazeLayout.render('patientPrescriptions');
  }
});


FlowRouter.route('/addPrescription',{
  name:'addPrescription',
  action() {
    BlazeLayout.render('addPrescription');
  }
});


// FlowRouter.route('/share',{
//   name:'share',
//   action() {
//     BlazeLayout.render('share');
//   }
// });