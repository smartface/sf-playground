/* globals lang */
import "@smartface/native";
import "i18n/i18n"; // Generates global lang object
import Application from "@smartface/native/application";
import { errorStackBySourceMap } from "@smartface/source-map";
import System from "@smartface/native/device/system";
// import 'lib/SliderDrawer'; // GIVES ERROR ON ANDROID - NOT RELATED TO TS MIGRATION

// Set uncaught exception handler, all exceptions that are not caught will
// trigger onUnhandledError callback.
Application.on("unhandledError", (e: UnhandledError) => {
  const error = errorStackBySourceMap(e);
  const message = {
    message: System.OS === System.OSType.ANDROID ? error.stack : e.message,
    stack: System.OS === System.OSType.IOS ? error.stack : undefined,
  };
  console.error("Unhandled Error: ", message);
  alert(JSON.stringify(message, null, 2), e.type || lang.applicationError);
});

Application.on("exit", () => {
  console.log("Application onExit Test");
});

Application.on("maximize", () => {
  alert("Application onMaximize Test");
});

Application.on("minimize", () => {
  console.log("Application onMinimize Test");
});

Application.on("applicationCallReceived", (e: { data: { [key: string]: any } }): void => {
  alert({
    title: "onApplicationCallReceived",
    message: JSON.stringify(e),
  });
});


import "start";
