module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-file-append');
  grunt.loadNpmTasks('grunt-typescript');
  grunt.loadNpmTasks('grunt-subgrunt');

  grunt.initConfig({
    subgrunt: {
      ox_build: {
        options: {
          npmClean: true
        },
        projects: {
          'node_modules/an-ox': 'build_framework'
        }
      }
    },
    typescript: {
      compile_app: {
        src: ['./app.ts', './application/**/*.ts'],
        dest: './build/app.js',
        options: {
          module: 'commonjs', //or commonjs
          target: 'es5', //or es
          basePath: './src',
          sourceMap: false,
          declaration: true,
          comments: false,
          references: [
            "./libraries/*.d.ts"
          ]
        }
      }
    },
    file_append: {
      import_framework: {
        files: {
          'build/app.js': {
            prepend: "var OX = require('an-ox');\n\n"
          }
        }
      }
    }
  });

  // define the tasks
  grunt.registerTask(
    'build_framework',
    'Compiles all of the OX framework files and copy it to build directory.',
    ['subgrunt:ox_build']
  );
  grunt.registerTask(
    'build',
    'Compiles all of app files and copy it to build directory.',
    ['typescript:compile_app', 'file_append:import_framework']
  );

  grunt.registerTask(
    'build_app',
    'Compiles all of the OX framework and app files, and copy it to build directory.',
    ['build_framework', 'build']
  );

  grunt.registerTask('default', ['build']);
}
