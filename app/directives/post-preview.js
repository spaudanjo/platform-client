module.exports = [function(){
  return {
    restrict: 'E',
    replace: true,
    scope: {
      signedIn: '='
    },
    templateUrl: 'templates/posts/preview.html',
  };
}];
