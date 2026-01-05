const { withAppBuildGradle } = require('expo/config-plugins');

module.exports = function withAndroidLintOptions(config) {
  return withAppBuildGradle(config, (config) => {
    const buildGradle = config.modResults.contents;

    // Мы ищем блок android { и добавляем туда отключение проверки ошибок Lint
    if (!buildGradle.includes('lintOptions')) {
      const newBuildGradle = buildGradle.replace(
        /android\s?\{/,
        `android {
    lintOptions {
        checkReleaseBuilds false
        abortOnError false
    }
`
      );
      config.modResults.contents = newBuildGradle;
    }

    return config;
  });
};