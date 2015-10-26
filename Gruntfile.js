module.exports = function(grunt) {
  grunt.loadNpmTasks('gruntify-eslint');

  grunt.registerTask('lint', ['eslint']);

  grunt.initConfig({
      eslint: {                   
        options: {
          useEslintrc: false,
          configFile: "conf/eslint.yaml"
        },
        src: ["src/*.js"]
      }
    });
  };
}