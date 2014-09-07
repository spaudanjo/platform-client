module.exports = [function(){
  return {
    restrict: 'E',
    replace: true,
    scope: {
      signedin: '='
    },
    templateUrl: 'templates/partials/signin-signout-button.html',
  };
}];
