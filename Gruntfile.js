module.exports = function(grunt){
  'use strict';

  grunt.initConfig({
    jshint : {
      all : {
	files : {
	  src : ['package.json', 'Gruntfile.js', 'index.js', 'test/index.js', 'bin/server']
	},
	options : {
	  node : true
	}
      }
    },
    test : {
      options : {
	require : ['should'],
	ui : 'bdd'
      },
      all : {
	src : 'test/index.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-cafe-mocha');
  grunt.renameTask('cafemocha', 'test');
  
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['jshint', 'test']);
};
