/**
 * Bigmachines RequireJS I18n Plugin
 * 
 * Simply takes a root language file and loads the translated version based on the
 * locale set in configuration. The translated file is generated dynamically, so
 * we can guarantee it will be there as long as locale is configured to be the logged 
 * in user's locale. Therefore, no fallback functionality is necessary.
 * 
 * Does not inline anything into the build, files are always loaded asyncronously, 
 * even in production.
 * 
 * Usage:
 *      define(['i18n!locales/someText'],function(someText){alert(someText.alert)});
 */
define(["module"], function(module){
    var localeRegex = /(^.*\/?locales)(\/.*$)/
    return {
        load: function (name, parentRequire, onLoad, config) {
            if (!config.isBuild) {
                var match = localeRegex.exec(name);
                // The path to the locales directory
                var path = match[1];
                // The name of the requested file
                var filename = match[2];
                // The configured locale
                var locale = (config && config.i18n && config.i18n.locale) || "";
                if (locale) locale = "/" + locale;
                
                // Get the translated file for the configured locale
                var bundle = parentRequire([path + locale + filename], function(bundle) {
                    onLoad(bundle);
                });
            } else {
                // Do not load anything into the build file
                onLoad();
            }
        }
    }
});
