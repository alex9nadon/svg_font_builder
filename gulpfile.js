var gulp = require('gulp'),
    consolidate = require('gulp-consolidate'),
    iconfont = require('gulp-iconfont');

gulp.task('myfont', function () {
    return gulp.src('src/svg/*.svg')
        .pipe(iconfont({
            fontName: 'myfont',
            formats: ['ttf', 'eot', 'woff', 'woff2'],
            appendCodepoints: true,
            appendUnicode: false,
            normalize: true,
            fontHeight: 1000,
            centerHorizontally: true
        }))
        .on('glyphs', function (glyphs, options) {

            gulp.src('src/myfont.css')
                .pipe(consolidate('underscore', {
                    glyphs: glyphs,
                    fontName: options.fontName,
                    fontDate: new Date().getTime()
                }))
                .pipe(gulp.dest('myfont'));

            gulp.src('src/myfont-demo.css')
                .pipe(consolidate('underscore', {
                    glyphs: glyphs,
                    fontName: options.fontName,
                    fontDate: new Date().getTime()
                }))
                .pipe(gulp.dest('myfont'));

            gulp.src('src/index.html')
                .pipe(consolidate('underscore', {
                    glyphs: glyphs,
                    fontName: options.fontName
                }))
                .pipe(gulp.dest('myfont'));
        })
        .pipe(gulp.dest('myfont'));
});