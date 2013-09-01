define(['backbone', '../model/field', '../collection/field', 'underscore'], function (Backbone, FieldModel, FieldCollection, _) {
    return Backbone.Model.extend({
        fieldsCollection: null,
        fieldsArray: [],

        defaults: {
            size: 3,
            bombs: 1
        },

        initialize: function()
        {
            this.fieldsCollection = new FieldCollection();

            this.generateFields();
            this.placeBombs();
        },

        getFields: function()
        {
            return this.fieldsCollection;
        },

        generateFields: function()
        {
            var size = this.get('size');

            for (var i = 0; i < size; i++) {
                for (var j = 0; j < size; j++) {
                    var field = new FieldModel({x: i, y: j});

                    if (!this.fieldsArray[i]) {
                        this.fieldsArray[i] = [];
                    }
                    this.fieldsArray[i][j] = field;

                    this.fieldsCollection.add(field);
                }
            }
        },

        placeBombs: function()
        {
            var size = this.get('size'),
                bombs = this.get('bombs');

            for (var i = 0; i < bombs;) {
                var randomX = Math.floor(Math.random() * (size));
                var randomY = Math.floor(Math.random() * (size));

                var field = this.fieldsArray[randomX][randomY];
                if (field.get('isBomb')) {
                    continue;
                }

                field.set('isBomb', true);
                i++;

                _.forEach(this.getNeighbours(field.get('x'), field.get('y')), function(neighbour) {
                    neighbour.set('bombsNear', neighbour.get('bombsNear') + 1)
                }, this);
            }
        },

        getField: function(x, y)
        {
            if (!this.fieldsArray[x]) {
                return;
            }

            return this.fieldsArray[x][y];
        },

        getNeighbours: function(x, y)
        {
            var neighbours = [],
                neighbour = null,
                possibleNeighbours = this.getField(x, y).getPossibleNeighbours();

            _.forEach(possibleNeighbours, function(possibleNeighbour) {
                if (neighbour = this.getField(possibleNeighbour.x, possibleNeighbour.y)) {
                    neighbours.push(neighbour);
                }
            }, this);

            return neighbours;
        }
    })
});