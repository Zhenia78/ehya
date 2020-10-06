let src_f = "#source";
let prj_f = "dist";

let path = {
  src: {
    pug: [src_f + "/**/*.pug", "!" + src_f + "/**/_*.pug"],
    css: src_f + "/sass/style.sass",
    js: src_f + "/js/**/*.js",
    fonts: src_f + "/fonts/*.ttf",
    img: src_f + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
    img_s: src_f + "/img/**/*.{svg}"
  },
  build: {
    html: prj_f + "/",
    css: prj_f + "/css/",
    js: prj_f + "/js/",
    fonts: prj_f + "/fonts/",
    img: prj_f + "/img/",
    img_s: prj_f + "/img/icons"
  },
  watch: {
    pug: src_f + "/**/*.pug",
    css: src_f + "/sass/**/*.sass",
    js: src_f + "/js/**/*.js",
    img: src_f + "/img/**/*.{jpg,png,svg,gif,ico,webp}"
  },
  clean: "./" + prj_f + "/"
}

let {
  src,
  dest,
  parallel
} = require("gulp"),
  gulp = require("gulp"),
  browser_sync = require("browser-sync").create(),
  del = require("del"),
  sass = require("gulp-sass"),
  autoprefixer = require("gulp-autoprefixer"),
  group_media = require("gulp-group-css-media-queries"),
  rename = require("gulp-rename"),
  clean_css = require("gulp-clean-css"),
  uglify_es = require("gulp-uglify-es").default,
  imagemin = require("gulp-imagemin"),
  gulp_ttf2woff = require("gulp-ttf2woff"),
  gulp_ttf2woff2 = require("gulp-ttf2woff2"),
  fonter = require("gulp-fonter"),
  pug = require("gulp-pug"),
  file_include = require("gulp-file-include");


function browserSync() {
  browser_sync.init({
    server: {
      baseDir: "./" + prj_f + "/"
    },
    port: 3000,
    notify: false
  });
}

function Pug() {
  return src(path.src.pug)
    .pipe(pug())
    .pipe(dest(path.build.html))
    .pipe(browser_sync.stream());
}


function css() {
  return src(path.src.css)
    .pipe(sass({
      outputStyle: "expanded"
    }))
    .pipe(autoprefixer({
      cascade: true
    }))
    .pipe(group_media())
    .pipe(dest(path.build.css))
    .pipe(clean_css())
    .pipe(
      rename({
        extname: ".min.css"
      })
    )
    .pipe(dest(path.build.css))
    .pipe(browser_sync.stream());
}

function js() {
  src(path.src.js)
    .pipe(file_include())
    .pipe(dest(path.build.js))
  return src([src_f + "/js/**/*.js", "!" + src_f + "/js/**/*.min.js"])
    .pipe(uglify_es())
    .pipe(
      rename({
        extname: ".min.js"
      })
    )
    .pipe(dest(path.build.js))
    .pipe(browser_sync.stream());
}

function fonts() {
  src(path.src.fonts)
    .pipe(gulp_ttf2woff())
    .pipe(dest(path.build.fonts))
  return src(path.src.fonts)
    .pipe(gulp_ttf2woff2())
    .pipe(dest(path.build.fonts))
}

gulp.task("otf2ttf", function () {
  return gulp.src([src_f + "/fonts/*.otf"])
    .pipe(fonter({
      formats: ["ttf"]
    }))
    .pipe(dest(src_f + "/fonts/"))
})


function images() {
  src(path.src.img_s)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }],
      interlaced: true,
      optimizationLevel: 3 //0 to 7
    }))
    .pipe(dest(path.build.img_s))
  return src(path.src.img)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }],
      interlaced: true,
      optimizationLevel: 3 //0 to 7
    }))
    .pipe(dest(path.build.img))
    .pipe(browser_sync.stream());
}

function watchFiles() {
  gulp.watch([path.watch.pug], Pug);
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.img], images);
}

function clean() {
  return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(css, Pug, js, images, fonts));
let watch = gulp.parallel(build, watchFiles, browserSync);


exports.pug = Pug;
exports.js = js;
exports.fonts = fonts;
exports.images = images;
exports.css = css;
exports.build = build;
exports.watch = watch;
exports.default = watch;