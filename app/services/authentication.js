module.exports = [
    '$rootScope',
    '$http',
    '$q',
    'Util',
    'CONST',
function(
    $rootScope,
    $http,
    $q,
    Util,
    CONST
) {

    // check if initially we have an old access_token and assume that,
    // if yes, we are still signedin
    var signinStatus = !!localStorage.getItem('access_token'),

            setToSigninState = function(accessToken, userId, userName){
                localStorage.setItem('access_token', accessToken);
                localStorage.setItem('user_id', userId);
                localStorage.setItem('user_name', userName);
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
                'posts',
                'media',
                'forms',
                'api',
                'tags',
                'sets',
                'users',
                'stats',
                'layers',
                'config',
                'messages',
                'dataproviders'
            ],
            payload = {
                username: username,
                password: password,
                grant_type: 'password',
                client_id: CONST.OAUTH_CLIENT_ID,
                client_secret: CONST.OAUTH_CLIENT_SECRET,
                scope: claimedScopes.join(' ')
            };


            var deferred = $q.defer();
            var handleRequestError = function(){
                deferred.reject();
                setToSignoutState();
                $rootScope.$broadcast('event:authentication:signin:failed');
            }
            $http.post(Util.url('/oauth/token'), payload).then(
                function(response){
                    var accessToken = response.data.access_token;

                    $http.get(
                        Util.url(''),
                        { headers: {'Authorization': 'Bearer ' +accessToken} }
                    ).then(
                        function(nestedResponse){
                            var userId = nestedResponse.data.user.id;
                            var userName = nestedResponse.data.user.name;
                            setToSigninState(accessToken, userId, userName);
                            $rootScope.$broadcast('event:authentication:signin:succeeded');
                            deferred.resolve();
                        }, handleRequestError);
                }, handleRequestError);

            return deferred.promise;
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
