//
// ZEN Sketch Gulpfile
// 2015
//

// Gulp itself
var gulp   = require('gulp');

// Directorios del proyecto
//
var dirs = {
    src: '',
    dst: '/sketchplugins',
};

// Watch
//
gulp.task('watch', function(){
    gulp.watch(dirs.src + 'zen.sketchplugin/**/*', ['copy']);
});


// Copia los plugins en la carpeta de plugins de sketch mediante el softlink
// /sketchplugins
gulp.task('copy', function() {
    // Archivos en el raiz
    gulp.src(['zen.sketchplugin'], {cwd: dirs.src})
    .pipe(gulp.dest(dirs.dst));
    gulp.src(['zen.sketchplugin/**/*'], {cwd: dirs.src})
    .pipe(gulp.dest(dirs.dst + "/zen.sketchplugin"));
});

// TAREAS GULP
gulp.task('default', ['watch']);
