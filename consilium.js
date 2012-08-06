UserStories = new Meteor.Collection('userStories');

if (Meteor.is_client) {
    Template.userStoryForm.events = {
        "keydown #name":function (event) {
            if (event.which == 13) {
                var name = $('#name').val();

                console.log("Adding user story: " + name);

                if (name.value != '') {
                    UserStories.insert({
                        name:name,
                        time:Date.now(),
                        status:'ReadyToPull'
                    });
                }

                $('#name').value = '';
            }
        }
    };

    Template.readyToPullUserStoryList.storyList = function () {
        return UserStories.find({status:'ReadyToPull'}, { sort:{ time:-1 }});
    };

    Template.readyToPullUserStoryList.makeSortable = function () {
        Meteor.defer(function () {
            $('.sortable').sortable({
                handle:'.dragHandle',
                item:'.card',
                connectWith:"ul.sortable",
                placeholder:'kanbanItem'
            });
        });
    };

    Template.inProgressUserStoryList.storyList = function () {
        return UserStories.find({status:'InProgress'}, { sort:{ time:-1 }});
    };

    Template.completeUserStoryList.storyList = function () {
        return UserStories.find({status:'Completed'}, { sort:{ time:-1 }});
    };
}

if (Meteor.is_server) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
}