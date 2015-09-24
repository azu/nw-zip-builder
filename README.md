# nw-zip-builder [![Build Status](https://travis-ci.org/azu/nw-zip-builder.svg?branch=master)](https://travis-ci.org/azu/nw-zip-builder)

This command line tool is wrapper of [mllrsohn/node-webkit-builder](https://github.com/mllrsohn/node-webkit-builder "mllrsohn/node-webkit-builder").

Simply `nw.build().then(zipped!)`

For electron: [azu/electron-zip-packager](https://github.com/azu/electron-zip-packager "azu/electron-zip-packager")

## Installation

    npm install nw-zip-builder --save-dev

## Usage

    nw-zip-builder -p osx32 ./path/to/app
    # => app-osx32.zip

See [example/package.json](example/package.json)

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT
