#!/usr/bin/env node
var optimist = require('optimist');
var NwBuilder = require('nw-builder');
var path = require('path');

var argv = optimist
    .usage('Usage: nwbuild [options] [path]')

    .alias('p', 'platforms')
    .default('p', 'osx32,osx64,win32,win64')
    .describe('p', 'Platforms to build, comma-sperated, can be: win32,win64,osx32,osx64,linux32,linux64')

    .alias('v', 'version')
    .default('v', 'latest')
    .describe('v', 'The nw version, eg. 0.8.4')

    .alias('o', 'buildDir')
    .default('o', './build')
    .describe('o', 'The build folder')


    .alias('f', 'forceDownload')
    .default('f', false)
    .describe('f', 'Force download of node-webkit')
    .boolean('f')


    .default('quiet', false)
    .describe('quiet', 'Disables logging')
    .boolean('quiet')

    .argv;

// Howto Help
if (argv.h || argv.help) {
    optimist.showHelp();
    process.exit(0);
}

// Error if there are no files
var files = argv._[0];
if (!files) {
    optimist.showHelp();
    process.exit(0);
}

var options = {
    files: path.resolve(process.cwd(), files) + '/**/*',
    platforms: argv.platforms.split(','),
    version: argv.version,
    macIcns: argv.macIcns || false,
    winIco: argv.winIco || false,
    cacheDir: path.resolve(__dirname, '..', 'cache'),
    buildDir: path.resolve(process.cwd(), argv.buildDir),
    forceDownload: argv.forceDownload
};

// Build App
options.files = [options.files, "!node_modules/nw-zip-builder/", "!" + options.cacheDir +"/"];
var nw = new NwBuilder(options);

// Logging
if (!(argv.quiet || argv.quite)) {
    nw.on('log', console.log);
}
// Build or run the app
nw.build().then(function () {
    var archiveZip = require("../lib/archive-zip");
    var appName = nw.options.appName;
    var zipPromises = [];
    nw._forEachPlatform(function (name, platform) {
        var outputPath = path.join(platform.releasePath, "..", appName + "-" + name + ".zip");
        zipPromises.push(archiveZip(platform.releasePath, outputPath));
    });
    return Promise.all(zipPromises);
}).then(function (results) {
    results.forEach(function (outputPath) {
        console.log("zipped! " + outputPath);
    });
    process.exit(0)
}).catch(function (error) {
    if (error) {
        console.error(error);
        console.error(error.messsage);
    }
    process.exit(1);
});