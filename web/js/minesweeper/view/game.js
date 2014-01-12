define(['marionette', 'underscore', 'text!../template/game.html', '../view/maze', '../view/status', './waiting'],
function (Marionette, _, html, MazeView, StatusView, WaitingView) {
    "use strict";
    return Marionette.Layout.extend({
        template: _.template(html),

        initializeGame: function(game) {
            this.model = game;

            this.model.on('change:status', function(model, status) {
                if (status === 'waiting') {
                    this.statusRegion.show(new WaitingView());
                }

                if (status === 'in_progress' && model.previous('status') === 'waiting') {
                    this.statusRegion.show(this.statusView);
                }
            }, this);

            this.createMaze();
            this.statusView = new StatusView({model: this.model});
        },

        createMaze: function() {
            this.mazeView = new MazeView({
                collection: this.model.maze.getFields()
            });

            this.listenTo(this.mazeView, 'itemview:display', function(view) {
                this.model.display(view.model);
            });
            this.listenTo(this.mazeView, 'itemview:flag', function(view) {
                this.model.flag(view.model);
            });
        },

        regions: {
            mainRegion: '#main-region',
            statusRegion: '#status-region'
        },

        onRender: function()
        {
            this.mainRegion.show(this.mazeView);
            this.statusRegion.show(this.statusView);
        }
    });
});