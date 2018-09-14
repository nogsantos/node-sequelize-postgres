/**
 * Módulos GRUNT ambiente de desenvolvimento
 */
(function(){
    "use strict";
    module.exports = function (grunt) {
        var gruntConfig = {
            cssmin: {
                options: {
                    shorthandCompacting: false,
                    roundingPrecision: -1
                },
                target: {
                    files: {
                        'client/css/libs.min.css': [
                            'server/views/client/lib/bootstrap-modal/css/*.css',
                            'server/views/client/lib/kc_fab/css/*.css',
                            'server/views/client/lib/fonts/*.css',
                            'client/css/main.min.css'
                        ]
                    }
                }
            },
            less: {
                development: {
                    options: {
                        compress: true
                    },
                    files: {
                        'client/css/main.min.css': ["server/views/client/css/main.less"]
                    }
                }
            },
            uglify: {
                options: {
                    mangle: false,
                    report: 'gzip'
                },
                my_target: {
                    files: {
                        'client/js/app.min.js': [
                            'server/views/client/js/app.js',
                            'server/views/client/lib/bootstrap-modal/js/*.js',
                            'server/views/client/lib/kc_fab/js/*.js'
                        ],
                        'client/js/index.min.js': ['server/views/client/js/index/*.js'],
                        'client/js/home.min.js': ['server/views/client/js/home/*.js'],
                        'client/js/todo.min.js': ['server/views/client/js/todo/*.js'],
                        'client/js/instagram.min.js': ['server/views/client/js/instagram/*.js']
                    }
                }
            },
            watch : {
                dist : {
                    files : [
                        'server/views/client/js/**/*',
                        'server/views/client/css/**/*'
                    ],
                    tasks : [ 'uglify', 'less','cssmin' ]
                }
            }
        };

        grunt.loadNpmTasks('grunt-contrib-cssmin');
        grunt.loadNpmTasks('grunt-contrib-less');
        grunt.loadNpmTasks('grunt-contrib-uglify');
        grunt.loadNpmTasks('grunt-contrib-watch');

        grunt.initConfig(gruntConfig);

        var keys  = Object.keys(gruntConfig);
        var tasks = [];
        var i = 1;

        for(i in keys){
            tasks.push(keys[i]);
        }

        grunt.registerTask('default', tasks);
        grunt.registerTask( 'w',['watch']);
    };

}());
