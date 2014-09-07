module.exports = ['$resource', 'API_URL', function($resource, API_URL){
  return $resource(API_URL + '/posts.json/:postId', {}, {
    query: {method: 'GET', isArray: true}
  });
}];
