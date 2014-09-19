module.exports = ['$rootScope', '$http', 'BACKEND_URL', function($rootScope, $http, BACKEND_URL){
  // check if initially we have an old access_token and assume that,
  // if yes, we are still signedin
  var signinStatus = !!localStorage.getItem('access_token'),

      setToSigninState = function(accessToken){
        localStorage.setItem('access_token', accessToken);
        signinStatus = true;
      },

      setToSignoutState = function(){
        localStorage.removeItem('access_token');
        signinStatus = false;
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
      $http.post(BACKEND_URL + '/oauth/access_token', payload)
      .success(function(data){
        setToSigninState(data.access_token);

        $rootScope.$broadcast('event:authentication:signin:succeeded');
      })
      .error(function(/*data, status, headers, config*/){
        setToSignoutState();
        $rootScope.$broadcast('event:authentication:signin:failed');
      });
    },

    signout: function(){
      //TODO: ASK THE BACKEND TO DESTROY SESSION

      setToSignoutState();
      $rootScope.$broadcast('event:authentication:signout:succeeded');
    },

    getSigninStatus: function(){
      return signinStatus;
    }
  };

}];
