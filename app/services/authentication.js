module.exports = ['$rootScope', '$http', function($rootScope, $http){
  var signinStatus = false;

  var setAccessToken = function(accessToken){
    localStorage.setItem('access_token', accessToken);
  };

  return {

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
        setAccessToken(data.access_token);

        signinStatus = true;
        $rootScope.$broadcast('event:authentication:succeeded');
      })
      .error(function(data, status, headers, config){
        setAccessToken("");

        signinStatus = false;
        $rootScope.$broadcast('event:authentication:failed');
      });
    },

    getAccessToken: function(){
      return accessToken;
    },

    getSigninStatus: function(){
      return signinStatus;
    }
  };

}];
