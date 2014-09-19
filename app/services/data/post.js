module.exports = ['$resource', 'API_URL', function($resource, API_URL){
  return $resource(API_URL + '/posts/:postId', {}, {
    query: {
      method: 'GET',
      isArray: true,
      transformResponse: function(data, header) {
        var parsedData = angular.fromJson(data);
        return parsedData.results;
      }
    }
  });
}];
