(function () {
    'use strict';

    /**
     * @author <a href="mailto:doctor.hogart@gmail.com">Konstantin Kitmanov</a>
     * May be freely distributed under the MIT license.
     */

    function SearchParser(searchString) {
        this.parsed = this.parse(searchString || window.location.search.substr(1));
    }

    SearchParser.prototype = {
        parse: function (str) {
            var chunks = str.split('&'),
                dict = {},
                chunk;
            for (var i = 0, len = chunks.length; i < len; i++) {
                chunk = chunks[i].split('=');
                dict[chunk[0]] = decodeURIComponent(chunk[1]);
            }

            return dict;
        },

        extend: function (newParams) {
            for (var key in newParams) {
                if (newParams.hasOwnProperty(key)) {
                    this.parsed[key] = newParams[key];
                }
            }

            return this;
        },

        compile: function (params) {
            var toCompile = params || this.parsed,
                result = [],
                resultPart;

            for (var key in toCompile) {
                if (toCompile.hasOwnProperty(key)) {
                    resultPart = encodeURIComponent(key);
                    if (toCompile[key] !== undefined) {
                        resultPart += '=' + encodeURIComponent(toCompile[key]);
                    }

                    result.push(resultPart);
                }
            }

            return result.join('&');
        }
    };

    // conflict management — save link to previous content of SearchParser, whatever it was.
    var root = this,
        prevName = root.SearchParser;

    /**
     * Cleans global namespace, restoring previous value of window.SearchParser, and returns SearchParser itself.
     * @return {SearchParser}
     */
    SearchParser.noConflict = function () {
        root.SearchParser = prevName;
        return this;
    };

    // Expose our precious function to outer world.
    if (typeof define === 'function' && define.amd) { // requirejs/amd env
        define(
            [],
            function () {
                return SearchParser;
            }
        );
    } else { // plain browser environment
        root.SearchParser = SearchParser;
    }


}).call(this);