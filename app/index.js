'use strict';

var util = require('util'),
  path = require('path'),
  yeoman = require('yeoman-generator'),
  chalk = require('chalk'),
  GitHubApi = require('github');

var github = new GitHubApi({
    version: '3.0.0'
  }),
  githubUserInfo = function (user, callback) {
    github.user.getFrom({ user: user }, function (err, res) {
      if (err) { throw err; }
      callback(JSON.parse(JSON.stringify(res)));
    });
  };

var BespokethemeGenerator = module.exports = function BespokethemeGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(BespokethemeGenerator, yeoman.generators.Base);

BespokethemeGenerator.prototype.askFor = function askFor() {
  var done = this.async();

  // welcome message
  var welcome =
    "\n" +
    chalk.cyan.bold("\noooooooooo.                                          oooo                          o8o          ") +
    chalk.cyan.bold("\n`888'   `Y8b                                         `888                          `\"'          ") +
    chalk.cyan.bold("\n 888     888  .ooooo.   .oooo.o oo.ooooo.   .ooooo.   888  oooo   .ooooo.         oooo  .oooo.o ") +
    chalk.cyan.bold("\n 888oooo888' d88' `88b d88(  \"8  888' `88b d88' `88b  888 .8P'   d88' `88b        `888 d88(  \"8 ") +
    chalk.cyan.bold("\n 888    `88b 888ooo888 `\"Y88b.   888   888 888   888  888888.    888ooo888         888 `\"Y88b.  ") +
    chalk.cyan.bold("\n 888    .88P 888    .o o.  )88b  888   888 888   888  888 `88b.  888    .o .o.     888 o.  )88b ") +
    chalk.cyan.bold("\no888bood8P'  `Y8bod8P' 8\"\"888P'  888bod8P' `Y8bod8P' o888o o888o `Y8bod8P' Y8P     888 8\"\"888P' ") +
    chalk.cyan.bold("\n                                 888                                               888          ") +
    chalk.cyan.bold("\n                                o888o                                          .o. 88P          ") +
    chalk.cyan.bold("\n                                                                               `Y888P           ") +
    "\n" +
    chalk.green.bold("Thanks for writing a Bespoke.js theme! :)   -@markdalgleish") +
    "\n";

  console.log(welcome);

  var prompts = [
    {
      name: 'githubUser',
      message: 'What is your GitHub username?',
      default: 'someuser'
    },
    {
      name: 'themeName',
      message: 'What is the name of your theme?',
      default: 'mytheme'
    },
    {
      name: 'themeDescription',
      message: 'What is the description of your theme?',
      default: 'A theme for Bespoke.js'
    }
  ];

  this.prompt(prompts, function (props) {
    this.githubUser = props.githubUser;
    this.themeName = this._.slugify(props.themeName).replace(/^(bespoke-)?theme-/, '').toLowerCase();
    this.themeNameCamelized = this._.camelize(this.themeName);
    this.themeFullName = 'bespoke-theme-' + this.themeName;
    this.themeDescription = props.themeDescription;

    done();
  }.bind(this));
};

BespokethemeGenerator.prototype.userInfo = function userInfo() {
  var done = this.async();

  if (this.githubUser.toLowerCase() !== '') {
    githubUserInfo(this.githubUser, function (res) {
      this.realName = res.name;
      this.githubUrl = res.html_url;
      if (res.email) this.email = res.email;
      done();
    }.bind(this));
  } else {
    this.realName = '';
    this.githubUrl = '';
    done();
  }
};

BespokethemeGenerator.prototype.app = function app() {
  this.mkdir('lib');
  this.copy('lib/name.js', 'lib/' + this.themeFullName + '.js');
  this.copy('lib/theme.styl', 'lib/theme.styl');

  this.mkdir('demo/src/scripts');
  this.template('demo/src/index.jade', 'demo/src/index.jade');
  this.template('demo/src/scripts/main.js', 'demo/src/scripts/main.js');
};

BespokethemeGenerator.prototype.setupProjectFiles = function setupProjectFiles() {
  this.template('gulpfile.js', 'gulpfile.js');

  this.template('CONTRIBUTING.md', 'CONTRIBUTING.md');
  this.template('LICENSE', 'LICENSE');
  this.template('README.md', 'README.md');

  this.copy('_editorconfig', '.editorconfig');
  this.copy('_gitattributes', '.gitattributes');
  this.copy('_gitignore', '.gitignore');
  this.copy('_travis.yml', '.travis.yml');
};

BespokethemeGenerator.prototype.setupPackageJson = function setupPackageJson() {
  var packageJson = {
    'name': this.themeFullName,
    'version': '0.0.0',
    'description': this.themeDescription,
    'homepage': this.githubUrl + '/' + this.themeFullName,
    'bugs': this.githubUrl + '/' + this.themeFullName + '/issues',
    'author': {
      'name': this.realName,
      'url': this.githubUrl
    },
    'main': './dist/' + this.themeFullName + '.js',
    'repository': {
      'type': 'git',
      'url': 'git://github.com/' + this.githubUser + '/' + this.themeFullName + '.git'
    },
    'scripts': {
      'test': 'gulp'
    },
    'peerDependencies': {
      'bespoke': '^1.0.0'
    },
    'devDependencies': {
      'bespoke': '^1.0.0',
      'bespoke-bullets': '^1.0.0',
      'bespoke-classes': '^1.0.0',
      'bespoke-keys': '^1.0.0',
      'bespoke-progress': '^1.0.0',
      'bespoke-scale': '^1.0.0',
      'bespoke-state': '^1.0.0',
      'bespoke-touch': '^1.0.0',
      'brfs': '^1.1.1',
      'browserify': '^4.1.5',
      'function-bind': '^0.1.0',
      'gulp': '^3.5.1',
      'gulp-autoprefixer': '0.0.7',
      'gulp-browserify': '^0.5.0',
      'gulp-clean': '^0.2.4',
      'gulp-connect': '^2.0.5',
      'gulp-header': '^1.0.2',
      'gulp-jade': '^0.6.1',
      'gulp-minify-css': '^0.3.5',
      'gulp-plumber': '^0.6.3',
      'gulp-rename': '^1.2.0',
      'gulp-stylus': '^1.0.2',
      'gulp-uglify': '^0.3.0',
      'insert-css': '^0.2.0',
      'lodash': '^2.4.1',
      'opn': '^0.1.2',
      'through': '^2.3.4'
    },
    'engines': {
      'node': '>=0.10.0'
    },
    'licenses': [
      {
        'type': 'MIT'
      }
    ],
    'keywords': [
      'bespoke-plugin',
      'bespoke-theme'
    ]
  };

  if (this.email) {
    packageJson.author.email = this.email;
  }

  this.write('package.json', JSON.stringify(packageJson, null, 2));
};

BespokethemeGenerator.prototype.setupBowerJson = function setupBowerJson() {
  var bowerJson = {
    'name': this.themeFullName,
    'version': '0.0.0',
    "main": "./dist/" + this.themeFullName + ".js",
    "ignore": [
      "**/.*"
    ],
    'dependencies': {
      'bespoke.js': '^1.0.0'
    }
  };
  this.write('bower.json', JSON.stringify(bowerJson, null, 2));
};
