module.exports = function(grunt) {
	
	grunt.initConfig({
	
		jade: {
			compile: {
				options: {
					pretty: true,
					data: {
						debug: true,
						data: grunt.file.readJSON('./dev/contents/content.json')
					}
				},
				files: {
					'build/index.html': ['dev/index.jade']
				}
			}
		},
		
		stylus: {
			compile: {
				files: {
					'build/css/styles.css': ['dev/css/style.styl'] 
				},
				options: {
					compress: false
				}
			}
		},
		
		postcss: {
			options: {
				map: false,
				processors: [
					require('autoprefixer')({browsers: 'last 5 versions'}),
					require('cssnano')()
				]
			},
			dist: {
				src: 'build/css/styles.css',
				dest: 'build/css/styles.min.css'
			}
		},
		
		browserify: {
			dist: {
				options: {
					transform: [
						['babelify', 
							{
								presets: ['stage-0', 'es2015', 'react'], 
								plugins: [
									'transform-class-properties',
									'extensible-destructuring'
								] 
							}
						]
					]
				},
				files: {
					'build/js/scripts.js': ['dev/js/app.js']
				}
			}
		},
		
		concat: {
			dist: {
				src: ['dev/js/libs/*.js'],
				dest: 'build/js/libs.js',
			},
		},
		
		uglify: {
			build: {
				options: {
				},
				files: {
					'build/js/scripts.min.js': ['build/js/scripts.js']
				}
			}
		},
		
		imagemin: {
			dynamic: {
				files: [{
					expand: true,
					cwd: 'dev/img/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'build/img/'
				}]
			}
		},
		
		watch: {
			markup: {
				files: ['dev/**/*.jade'],
				tasks: ['jade'],
				options: {
					livereload: true
				}
			},
			styles: {
				files: ['dev/css/**/*.styl'],
				tasks: ['stylus', 'postcss'],
				options: {
					nospawn: true,
					livereload: true
				}
			},
			scripts: {
				files: ['dev/js/**/*.js'],
				tasks: ['browserify'],
				options: {
					livereload: true
				}
			}
		}
		
	});
	

	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-browserify');
	
	grunt.registerTask('default', ['jade', 'stylus', 'postcss', 'browserify', 'watch']);
	grunt.registerTask('prod', ['jade', 'stylus', 'postcss', 'browserify', 'concat', 'uglify:build']);
	
};

// npm install grunt-postcss autoprefixer cssnano
// npm install --save-dev babel-preset-es2015 babel-preset-react babel-preset-stage-0
// npm install babel-plugin-transform-class-properties