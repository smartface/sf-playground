/* globals lang */
require("i18n/i18n.js"); // Generates global lang object

import Application = require("sf-core/application");
import System = require("sf-core/device/system");
declare const __SF_DTXSourceMapsParser: any;
declare class __SF_DTXSourcePosition {
    line: number;
    column: number;
};
import File = require('sf-core/io/file');
import FileStream = require('sf-core/io/filestream');
import Path = require('sf-core/io/path');

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
                    const lineNum = parseInt(line.length === 5 ? line[3] : line[2]);
                    const colNum = parseInt(line.length === 5 ? line[4] : line[3]);
                    // const map: SourceMapData = require(path + ".json");
                    console.log(path);

                    var myFile = new File({
                        path: Path.DataDirectory+"/app.js"
                    } as any);
                    
                    console.log("myFile.exists : ", path, myFile.exists);
                    if (myFile.exists) {
                        const mapData = myFile.openStream(FileStream.StreamType.READ, FileStream.ContentMode.BINARY).readToEnd() as string;
                        console.log(mapData);
                        var smc = new sourceMap.SourceMapConsumer(JSON.parse(mapData));
                        const originalPosition = smc.originalPositionFor({
                            line: lineNum,
                            column: colNum
                        });
                        const oldPath = `${path}:${lineNum}:${colNum}`;
                        const newLineNum = `:${originalPosition.line}:${originalPosition.column}`;
                        const newPath = path.replace(".js", ".ts") + newLineNum;
                        return lines[index].replace(oldPath, newPath);
                    }
                }

                return lines[index];
            });
        console.log("parsedStack : ", parsedStack.join('\n'));
    } catch (e) {
        console.error(e.message, e.stack);
    }
}
var sourceMap = require('source-map');

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
