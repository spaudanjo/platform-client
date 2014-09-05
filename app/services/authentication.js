module.exports = function(app){
  app.factory("Authentication", ['$http', function($http){
    var accessToken = "";
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
          debugger;
          accessToken = data.access_token;
          localStorage.setItem('access_token', data.access_token);
        });
      },
      getAccessToken: function(){
        return accessToken;
      }
    }
  }]);
};
