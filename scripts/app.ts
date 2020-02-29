/* globals lang */
require("i18n/i18n.js"); // Generates global lang object

import Application = require("sf-core/application");
import System = require("sf-core/device/system");
declare interface SourcePosition {
    line: number;
    column: number;
};
type ErrorStackLine = {
    line: number;
    column: number;
    callee?: string;
    path: string;
};
import File = require('sf-core/io/file');
import FileStream = require('sf-core/io/filestream');
import Path = require('sf-core/io/path');

function parseErrorStack(lines: string[]): (null | ErrorStackLine)[] {
    const lineRegex = /^(?:(.+)(?:\@(.*)\:(\d+)(?::(\d+)))|(?:(.*)\:(\d+)(?::(\d+))))/;
    let parsed: any[] = lines
        .map(line => lineRegex.exec(line));

    return parsed
        .map(parsedLine => {
            if(parsedLine){
                const res = parsedLine
                    .filter(res => !!res);

                const stackLine: ErrorStackLine = {
                    path: null,
                    line: null,
                    column: null,
                    callee: null
                };
                stackLine.path = res.length === 5 ? res[2] : res[1];
                stackLine.line = parseInt(res.length === 5 ? res[3] : res[2]);
                stackLine.column = parseInt(res.length === 5 ? res[4] : res[3]);
                stackLine.callee = res[0];
                return stackLine;
            }
            return parsedLine;
        })
}

function errorStackSourceMapSupport(e: Error): Error {
    if(!e.stack)
        return e;
    const lines = e.stack.split('\n');
    const scriptsRoot = System.OS === "Android" ? Path.android.storages.internal + "/Android/data/" + Application.android.packageName + "/cache/assets/" : Path.DataDirectory + "/scripts/";
    let parsedStack: string[];
    try {
        parsedStack = parseErrorStack(lines)
            .filter(stackLine => !!stackLine)
            .map((stackLine, index) => {
                // console.log(stackLine);
                if (stackLine) {
                    // const map: SourceMapData = require(path + ".json");
                    const mapFilePath = scriptsRoot + stackLine.path + ".map";
                    var mapFile = new File({
                        path: mapFilePath
                    });

                    // console.log('mapFile.exists : ', stackLine, ' : ', mapFilePath);

                    if (mapFile.exists) {
                        const mapData = mapFile.openStream(FileStream.StreamType.READ, FileStream.ContentMode.BINARY).readToEnd() as string;
                        var smc = new sourceMap.SourceMapConsumer(JSON.parse(mapData));
                        const originalPosition: SourcePosition = smc.originalPositionFor({
                            line: stackLine.line,
                            column: stackLine.column
                        });
                        const transpiledPath = `${stackLine.path}:${stackLine.line}:${stackLine.column}`;
                        const originalPosStr = `:${originalPosition.line}:${originalPosition.column}`;
                        const originialPath = stackLine.path.replace(".js", ".ts") + originalPosStr;
                        return lines[index].replace(transpiledPath, originialPath);
                    }
                }

                return lines[index];
            });
    } catch (e) {
        return e;
    } finally {
        return {
        ...e,
        stack: parsedStack.join('\n')
    }
    }
}
var sourceMap = require('source-map');

// Set uncaught exception handler, all exceptions that are not caught will
// trigger onUnhandledError callback.
Application.onUnhandledError = function (e: UnhandledError) {
    const error = errorStackSourceMapSupport(e);
    console.error({
        title: e.type || lang.applicationError,
        message: System.OS === "Android" ? e.stack : (e.message + "\n\n*" + error.stack)
    });
    // errorStackSourceMapSupport(e);
    alert({
        title: e.type || lang.applicationError,
        message: System.OS === "Android" ? e.stack : (e.message + "\n\n*" + error.stack)
    });
};

setTimeout(() => {
    errorStackSourceMapSupport(new Error("Test Error"));
}, 1000);


require("sf-extension-utils");
require("./theme");
const router = require("./routes");
router.push("/pages/page1");
