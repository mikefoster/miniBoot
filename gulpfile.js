var gulp 		   = require('gulp')
	sass 		   = require('gulp-sass')
	watch 		   = require('gulp-watch')
	rename		   = require('gulp-rename')
	concat		   = require('gulp-concat')
    autoprefixer   = require('gulp-autoprefixer')
    mainBowerFiles = require('main-bower-files')
    filter         = require('gulp-filter')
    cleanCss       = require('gulp-clean-css')
    runSequence    = require('run-sequence');

    
var buildVersion = 'v1';

var paths = {
 dist:['dist/'],
 css:['dist/css/'],
 main:['miniboot/']
};



//Sequencer - running sass then compile
gulp.task('build', function(callback) {
  runSequence('sass',
              'compile',
              callback);
});

/* This task will compile our sass files */

gulp.task('sass', function() {

	return gulp.src(paths.main + 'miniBoot.scss')
		.pipe(sass({outputStyle: 'extended'}).on('error', sass.logError))
		.pipe(rename('miniBoot.css'))
		.pipe(autoprefixer({
            browsers: ['last 3 versions'], // Needs work
            cascade: false
        }))
 		.pipe(gulp.dest(paths.css + ''));

});

// Compile package css with project css
gulp.task('compile', function() { 
    return gulp.src(mainBowerFiles().concat(paths.css + '*.css'))
        .pipe(filter('**/*.css'))
        .pipe(concat('miniBoot.combined.css'))
        .pipe(cleanCss())
		//.pipe(rename('miniBoot.min.css'))
		.pipe(gulp.dest('dist'))
});


/*
* This task will watch our scss files and compile the changes.
*
*/
gulp.task('watch', ['build'], function() {
	
	gulp.watch(paths.main + '*.scss', ['build']);
       
});

/*
* Default task, will simply output the tasks that are available
*/
gulp.task('default', function() {

});