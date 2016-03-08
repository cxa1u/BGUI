module.exports = function(grunt){

  // Project configuration.
grunt.initConfig({
  concat: {
    
    js: {
      src: ['js/intro.js', 'js/project.js', 'js/outro.js'],
      dest: 'dist/built.js',
    },
    css: {
      src: ['css/intro.css', 'css/project.css', 'css/outro.css'],
      dest: 'dist/built.css',
    },
  },
  handlebars: {
      compile :{
         files: [
        {
          expand: true,     
          cwd: 'public/hbtemplates',  
          src: ['**/*.html'], 
          dest: 'public/js/templates',   
          ext: '.js',   
          extDot: 'first' 
        }
      ]
      },
      options: {
          namespace: false,
          amd: true
      }
  },

  sass: {
      dist: {
        options: {
          style: 'expanded',
          /* nested / compact/ compressed / expanded  */
          trace: true,
          debugInfo: false,
          lineNumbers: true,
          update: false,
          sourcemap: "auto"
        },
        files: [{
          expand: true,
          cwd: 'public/scss',
          src: ['*.scss', '**/*.scss'],
          dest: 'public/css',
          ext: '.css'
        }]

      }
    },
  watch: {
      handlebars : {
        files: ['public/hbtemplates/**/*.html'],
        tasks:["handlebars"]
      },
      sass : {
        files: ["public/scss/**/*.scss"],
        tasks: ["sass"]
      }
    }
});

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks("grunt-jsbeautifier");
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('build',['handlebars','sass']);
  grunt.registerTask('default',['build','watch']);
};