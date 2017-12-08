'use strict';

var gulp      = require('gulp'),
    imagemin = require('gulp-imagemin'),
    connect   = require('gulp-connect'),
    stylus    = require('gulp-stylus'),
    nib       = require('nib'),
    jshint    = require('gulp-jshint'),
    stylish   = require('jshint-stylish'),
    inject    = require('gulp-inject'),
    wiredep   = require('wiredep').stream,
    gulpif    = require('gulp-if'),
    minifyCss = require('gulp-minify-css'),
    useref    = require('gulp-useref'),
    uglify    = require('gulp-uglify'),
    uncss     = require('gulp-uncss'),
    pump = require('pump'),
    cleanCSS = require('gulp-clean-css'),
     ngAnnotate = require('gulp-ng-annotate'),
    del = require('del'),
    clean = require('gulp-clean'),
    cachebust = require('gulp-cache-bust'),
    angularFilesort = require('gulp-angular-filesort'),
    templateCache = require('gulp-angular-templatecache'),
    browserSync = require('browser-sync').create(),
    historyApiFallback = require('connect-history-api-fallback');
   
// Servidor web de desarrollo
// gulp.task('server', function() {
//   connect.server({
//     root: './app',
//     hostname: '0.0.0.0',
//     port: 8080,
//     livereload: true,
//    middleware: function (connect, opt) { return [ historyApiFallback({}) ]; }
//   });
// });
gulp.task('server', function() {
    browserSync.init({
      server: {
            baseDir: './app',
        }
    });
});
// Servidor web para probar el entorno de producción
gulp.task('server-dist', function() {
  connect.server({
    root: './dist',
    hostname: '0.0.0.0',
    port: 666,
    livereload: true,
   middleware: function (connect, opt) { return [ historyApiFallback({}) ]; }
  });
});

// Busca errores en el JS y nos los muestra por pantalla
gulp.task('jshint', function() {
  return gulp.src('./app/scripts/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

//Preprocesa archivos Stylus a CSS y recarga los cambios
gulp.task('css', function() {
  // gulp.src('./app/stylesheets/main.styl')
  //   .pipe(stylus({ use: nib() }))
  //   .pipe(gulp.dest('./app/stylesheets'))
  //   .pipe(connect.reload());
});

// Recarga el navegador cuando hay cambios en el HTML
gulp.task('html', function() {
  gulp.src('./app/**/*.html')
    .pipe(connect.reload());
});

// Copia el contenido de los estáticos e index.html al directorio
// de producción sin tags de comentarios
gulp.task('copy',['wiredep'], function() {
  gulp.src('./app/index.html')
    .pipe(useref())
    .pipe(gulp.dest('./dist'));
  gulp.src('./app/lib/fontawesome/fonts/**')
    .pipe(gulp.dest('./dist/fonts'));
  gulp.src('./app/lib/areas-icon/**')
    .pipe(gulp.dest('./dist/css'));  
  gulp.src('./app/lib/angular-i18n/angular-locale_es-ar.js/**')
    .pipe(gulp.dest('./dist/js'));
    gulp.src('./app/stylesheets/fonts/**')
    .pipe(gulp.dest('./dist/css/fonts'));    
   gulp.src('./app/lib/bootstrap/fonts/**')
    .pipe(gulp.dest('./dist/fonts'));  
     gulp.src('./app/lib/bootstrap-material-design/fonts/**')
    .pipe(gulp.dest('./dist/fonts'));  
});


// Busca en las carpetas de estilos y javascript los archivos
// para inyectarlos en el index.html
gulp.task('inject', function() {
  return gulp.src('index.html', {cwd: './app'})
    .pipe(inject(
      gulp.src(['./app/scripts/**/*.js']).pipe(angularFilesort()), {
      read: false,
      ignorePath: '/app'
    }))
    .pipe(inject(
      gulp.src(['./app/stylesheets/**/*.css']), {
        read: false,
        ignorePath: '/app'
      }
    ))
    .pipe(gulp.dest('./app'));
});

// Inyecta las librerias que instalemos vía Bower
gulp.task('wiredep', function () {
  gulp.src('./app/index.html')
    .pipe(wiredep({
      directory: './app/lib'
    }))
    .pipe(gulp.dest('./app'));
});

// Compila las plantillas HTML parciales a JavaScript
// para ser inyectadas por AngularJS y minificar el código
gulp.task('templates', function() {
  gulp.src('./app/templates/**/*.tpl.html')
    .pipe(templateCache({
      root: 'templates/',
      module: 'tsl.templates',
      standalone: true
    }))
    .pipe(gulp.dest('./app/scripts'));
});

// Comprime los archivos CSS y JS enlazados en el index.html
// y los minifica.
gulp.task('compress', function() {
  gulp.src('./app/index.html')
    .pipe(useref.assets())
    .pipe(gulpif('*.js', uglify({mangle: false })))
    .pipe(gulpif('*.css', minifyCss()))
    .pipe(gulp.dest('./dist'));
});

// Elimina el CSS que no es utilizado para reducir el peso del archivo
gulp.task('uncss', function() {
  gulp.src('./dist/css/style.min.css')
    .pipe(uncss({
      html: ['./app/index.html','./app/views/accesos-lista.tpl.html','./app/views/slide-lista.tpl.html',]
    }))
    .pipe(gulp.dest('./dist/css'));
});


gulp.task('imagenes', function () {
    return gulp.src(['./app/img/*.*'])
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/img/'));
});

gulp.task('cssBuild', function () {
    return 
    gulp.src('./dist/css/style.min.css')
        .pipe(nano())
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('minify-css', function(cb) {
 pump([
  gulp.src('./dist/css/style.min.css'),
   cleanCSS({compatibility: 'ie8'}),
   gulp.dest('./dist/css')
   ],
    cb
    );
});
// Limpiar la carpeta DIST
gulp.task('clean', function() {
    return gulp.src('./dist')
        .pipe(clean());
});

// gulp.task('imagenes', function () {
//     return gulp.src(['./app/image/**/*'])
//         .pipe(imagemin())
//         .pipe(gulp.dest('./dist/image'));
// });




gulp.task('uncss', function() {
  gulp.src('./dist/css/style.min.css')
    .pipe(uncss({
      html: ['./src/templates/**/*.html']
    }))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('cacheBuster', function () {
   gulp.src('./dist/index.html')
    .pipe(cachebust({
        type: 'timestamp'
    }))
    .pipe(gulp.dest('./dist'));
});
gulp.task('compressJS', function (cb) {
  pump([
        // gulp.src('./src/scripts/**/*.js'),
        gulp.src(['./dist/js/app.min.js','./dist/js/vendor.min.js']),
        uglify({mangle: false }),
        gulp.dest('dist/js')
    ],
    cb
  );
});
// Vigila cambios que se produzcan en el código
// y lanza las tareas relacionadas
gulp.task('watch', function() {
  gulp.watch(['./app/**/*.html', '/app/**/!index.html'], ['html','templates']);
  gulp.watch(['./app/stylesheets/**/*.styl'], ['css', 'inject']);
  gulp.watch(['./app/scripts/**/*.js', './gulpfile.js'], ['inject']);
  gulp.watch(['./bower.json'], ['wiredep']);
});

gulp.task('default', ['server', 'templates', 'inject', 'wiredep', 'watch','css']);
gulp.task('build', ['copy','imagenes']);
gulp.task('compress', ['compressJS','imagenes','cacheBuster','minify-css']);