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
      var claimedScopes = [
        'posts'
      ],
      payload = {
        username: username,
        password: password,
        grant_type: 'password',
        client_id: 'ushahidiui',
        client_secret: '35e7f0bca957836d05ca0492211b0ac707671261',
        scope: claimedScopes.join(' ')
      };

      $http.post(BACKEND_URL + '/oauth/token', payload)
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