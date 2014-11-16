module.exports = [
'$rootScope',
function($rootScope
) {

    var selectedTags = [];
    var selectedAll = true;

    // toggle selection for a given tag
    var SelectedTags = {
        toggleSelection: function toggleSelection(tag) {
            var idx = selectedTags.indexOf(tag);

            // is currently selected
            if (idx > -1) {
                selectedTags.splice(idx, 1);
            }

            // is newly selected
            else {
                selectedTags.push(tag);
            }

            $rootScope.$broadcast('selected_tags:changed',selectedTags);

        },
        getSelectedTags: function(){
            return selectedTags;
        },
        toggleSelectAll: function(){
            selectedAll = !selectedAll;
            $rootScope.$broadcast('selected_tags:select_all:changed', selectedAll);
        },
        getSelectedAll: function(){
            return selectedAll;
        }
    };

    return SelectedTags;

}];
