module.exports = ['$resource', function($resource){
  return $resource('http://localhost:8000/posts.json/:postId', {}, {
    query: {method: 'GET', isArray: true}
  });
}];
