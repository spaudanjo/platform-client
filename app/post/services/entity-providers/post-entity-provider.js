module.exports = [
    'PostEndpoint',
    'SelectedTags',
    '$rootScope',
    '_',
    function(
        PostEndpoint,
        SelectedTags,
        $rootScope,
        _
    ) {

    this.allPosts = [];
    this.filteredPosts = [];
    this.selectedTags = SelectedTags.getSelectedTags();
    this.selectAll = true;
    var that = this;

    function updateFilteredPosts(){
        that.filteredPosts = _.filter(that.allPosts, function(post){
            return _.some(that.selectedTags, function(selectedTag){
                return _.some(post.tags, function(postTag){
                    return postTag.id === selectedTag.id;
                })
            })
        });
    };

    $rootScope.$on('selected_tags:changed', function(event, selectedTags) {
        updateFilteredPosts();
    });

    $rootScope.$on('selected_tags:select_all:changed', function(event, selectAll) {
        that.selectAll = selectAll;
    });

	PostEndpoint.query().$promise.then(function(posts){
		that.allPosts = posts;
        updateFilteredPosts();
	});

    return {
        getPosts: function(){
            return that.selectAll ? that.allPosts : that.filteredPosts;
        }
    };

}];
