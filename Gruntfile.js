module.exports = function (grunt) {
    grunt.initConfig({
        run: {
            meta: {
                exec: 'userscript-utils get-updateblock -i google-timer-title.user.js -o google-timer-title.meta.js'
            }
        },
        watch: {
            meta: {
                files: ['./google-timer-title.user.js'],
                tasks: 'run:meta',
                options: {
                    spawn: false,
                    interrupt: true
                }
            }
        }
    });

    ['grunt-run', 'grunt-contrib-watch'].forEach(function (i) {
        grunt.loadNpmTasks(i);
    });
};