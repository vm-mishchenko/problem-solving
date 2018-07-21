module.exports = function (config) {
    config.set({
        basePath: '.',

        frameworks: ['jasmine'],

        files: [
            'src/**/*.js'
        ],

        browsers: ['Chrome'],

        reporters: [
            'dots'
        ],

        logLevel: 'WARN',

        plugins: [
            'karma-jasmine',
            'karma-chrome-launcher'
        ],
    });
};
