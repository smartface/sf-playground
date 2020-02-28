declare function extend(constructor: () => void): () => FunctionConstructor
declare const console : {
    info(...params: any[]): void;
    log(...params: any[]): void;
    error(...params: any[]): void;
    warn(...params: any[]): void;
}
declare function require(param:string):any;
declare const lang: {[key:string]: string};
declare function setTimeout(fn:() => void, time: number):Timeout;
declare function setInterval(fn:() => void, time: number):Timeout;
declare function clearInterval(intervalId: Timeout): void;
declare function clearTimeout(timeoutId: Timeout): void;
declare interface SourceMapData {
    version: number;
    file: string;
    sourceRoot: string;
    sources: string;
    names: string[];
    mappings: string;
}

interface Timer {
    hasRef(): boolean;
    ref(): this;
    refresh(): this;
    unref(): this;
}

class Immediate {
    hasRef(): boolean;
    ref(): this;
    unref(): this;
    _onImmediate: Function; // to distinguish it from the Timeout class
}

class Timeout implements Timer {
    hasRef(): boolean;
    ref(): this;
    refresh(): this;
    unref(): this;
}