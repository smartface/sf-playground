/* globals lang */
require("i18n/i18n.js"); // Generates global lang object

import Application = require("sf-core/application");
import System = require("sf-core/device/system");
declare const __SF_DTXSourceMapsParser: any;
declare class __SF_DTXSourcePosition {
    line: number;
    column: number;
};

function errorStackSourceMapSupport(e: Error) {

    const inlineSourceMapRegex = /^\s*\/(?:\/|\*)[@#]\s+sourceMappingURL=data:(?:application|text)\/json;(?:charset[:=]\S+?;)?base64,(?:.*)$/mg;

    const lines = e.stack.split('\n');
    const lineRegex = /^(?:(.+)(?:\@(.*)\:(\d+)(?::(\d+)))|(?:(.*)\:(\d+)(?::(\d+))))/;


    try {
        const parsedStack = lines
            .map(line => lineRegex.exec(line))
            .map(item => !!item ? item.filter(res => !!res) : item)
            .map((line, index) => {
                if (line) {
                    const path = line.length === 5 ? line[2] : line[1];
                    const lineNum = line.length === 5 ? line[3] : line[2];
                    const colNum = line.length === 5 ? line[4] : line[3];
                    const map: SourceMapData = require(path + ".json");
                    
                    const dtxMapsParser = __SF_DTXSourceMapsParser.sourceMapsParserForSourceMaps(map);
                    const dtxSourcePosition = new __SF_DTXSourcePosition();
                    dtxSourcePosition.line = parseInt(lineNum);
                    dtxSourcePosition.column = parseInt(colNum);
                    const originalPosition: __SF_DTXSourcePosition = dtxMapsParser.originalPositionForPosition(dtxSourcePosition);
                    const oldPath = `${path}:${lineNum}:${colNum}`;
                    const newLineNum = `:${originalPosition.line}:${originalPosition.column}`;
                    console.log(originalPosition, dtxSourcePosition);
                    const newPath = path.replace(".js", ".ts")+newLineNum;
                    console.log("Original Line : ", originalPosition.line);
                    console.log("Original Column : ", originalPosition.column);
                    return lines[index].replace(oldPath, newPath);
                }

                return lines[index];
            });
            console.log("parsedStack : ", parsedStack);
    } catch (e) {
        console.error(e.message, e.stack);
    }
}


// Set uncaught exception handler, all exceptions that are not caught will
// trigger onUnhandledError callback.
Application.onUnhandledError = function (e: UnhandledError) {
    console.error({
        title: e.type || lang.applicationError,
        message: System.OS === "Android" ? e.stack : (e.message + "\n\n*" + e.stack)
    });
    // errorStackSourceMapSupport(e);
    alert({
        title: e.type || lang.applicationError,
        message: System.OS === "Android" ? e.stack : (e.message + "\n\n*" + e.stack)
    });
};

setTimeout(() => {
    errorStackSourceMapSupport(new Error("Test Error"));
}, 1000);


require("sf-extension-utils");
require("./theme");
const router = require("./routes");
router.push("/pages/page1");
