module.exports = [function(){
  return {
    restrict: 'E',
    replace: true,
    scope: {
      signedIn: '='
    },
    templateUrl: 'templates/partials/signin-signout-button.html',
  };
}];
