(function (App) {
    'use strict';
    var dyks;

    var Help = Marionette.View.extend({
        template: '#help-tpl',
        className: 'help',

        events: {
            'click .close-icon': 'closeHelp',
            'click #in-app-reporter': 'reportIssue',
            'click .did-you-know': 'randomizeDyk'
        },

        initialize: function () {
            dyks = [
                i18n.__('You can paste magnet links anywhere in %s with CTRL+V.', Settings.projectName),
                i18n.__('You can drag & drop a .torrent file into %s.', Settings.projectName),
                i18n.__('The %s project was forked from the pirateflix project that started in February 2014 and has already had 150 people that contributed more than 3000 times to it\'s development in August 2014.', Settings.projectName),
                i18n.__('If a subtitle for a movie or an episode is missing, you can add it on %s.', 'opensubtitles.org'),
                i18n.__('If you\'re experiencing connection drop issues, try to reduce the DHT Limit in settings.'),
                i18n.__('If you search \"1998\", you can see all the movies or TV series that came out that year.'),
                i18n.__('You can login to Trakt.tv to save all your watched items, and synchronize them across multiple devices.'),
                i18n.__('Clicking on the rating stars will display a number instead.'),
                i18n.__('This application is entirely written in HTML5, CSS3 and Javascript.'),
                i18n.__('You can find out more about a movie or a TV series? Just click the IMDb icon.'),
                i18n.__('Clicking twice on a \"Sort By\" filter reverses the order of the list.')
            ];
        },

        onAttach: function () {
            $('.search input').blur();
            Mousetrap.bind(['esc', 'backspace'], function (e) {
                App.vent.trigger('help:close');
            });
            this.randomizeDyk();
        },

        randomizeDyk: function () {
            var dyk = dyks[_.random(dyks.length - 1)];
            $('.randomized-dyk').html(dyk);
        },

        reportIssue: function () {
            App.vent.trigger('issue:new');
        },

        onBeforeDestroy: function () {},

        closeHelp: function () {
            App.vent.trigger('help:close');
        }

    });

    App.View.Help = Help;
})(window.App);
