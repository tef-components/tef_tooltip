module.exports = function(grunt) {
  require('jit-grunt')(grunt,{
    replace: 'grunt-text-replace'
  });

  grunt.initConfig({
    less: {
      default: {
        files: {
          "templates/tef.tooltip.css": "less/tef.tooltip.less"
        }
      }
    },
    concat: {
      default: {
       src: [
          'templates/tef.tooltip.css',          
          '../icons/fonts/icons.css'
        ],
        dest: 'templates/tef.tooltip.css'
      }
    },

    includes: {
      files: {
        cwd: 'templates/',
        src: '**/*.html',
        dest: ''
      }
    },

    bump: {
      // upgrade release and push to master
      options : {
        files: ['bower.json'],
        commitFiles: ["-a"],
        pushTo: 'origin'
      }
    },

    exec: {
      // add new files before commiting
      add: {
        command: 'git add .'
      },

      // push to gh-pages branch
      pages: {
        command: [
          'git checkout gh-pages',
          'git pull origin master',
          'git push origin gh-pages',
          'git checkout master'
        ].join('&&')
      },

      // adds prompted commit message
      message: {
        command: function() {
          var message = grunt.config('gitmessage');
          return "git commit -am '" + message + "'";
        }
      }
    },

    prompt: {
      commit: {
        options: {
          questions: [
            {
              config: 'gitmessage',
              type: 'input',
              message: 'Commit Message'
            }
          ]
        }
      }
    }
  });

  grunt.registerTask('default', [
    'less',
    'concat',
    'includes'    
  ]);

  grunt.registerTask('release', [
    'less',
    'concat',
    'includes',    
    'exec:add',
    'prompt',
    'exec:message',
    'bump',
    'exec:pages'
  ]);
};
