module.exports = function(app){
  app.factory("Authentication", ['$http', function($http){
    var accessToken = "";
    var signinStatus = false;

    // instead of using Angular's $watch
    // (which could results in performance issues when not used carefully),
    // we are using the good old observer pattern to inform other actors
    // when the signinStatus has changed
    var observerCallbacks = [];
    var notifyObservers = function(){
      angular.forEach(observerCallbacks, function(callback){
        callback();
      });
    };

    return {
      registerObserverCallback: function(callback){
        observerCallbacks.push(callback);
      },
      signin: function(username, password)
      {
        var payload = {
          username: username,
          password: password,
          grant_type: 'password',
          client_id: 'test_id',
          client_secret: 'test_secret'
        };
        $http.post("http://localhost:8000/oauth/access_token", payload)
        .success(function(data){
          accessToken = data.access_token;
          localStorage.setItem('access_token', data.access_token);
          notifyObservers();
        });
      },
      getAccessToken: function(){
        return accessToken;
      },
      getSigninStatus: function(){
        return signinStatus;
      }
    };
    
  }]);
};
