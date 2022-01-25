/* globals lang */
import "i18n/i18n"; // Generates global lang object
import Application from "@smartface/native/application";
import { errorStackBySourceMap } from "error-by-sourcemap";
import System from "@smartface/native/device/system";
// Set uncaught exception handler, all exceptions that are not caught will
// trigger onUnhandledError callback.
Application.on(Application.Events.UnhandledError, (e: UnhandledError) => {
  console.log("Application.Events.UnhandledError");
  const error = errorStackBySourceMap(e);
  alert({
    title: e.type || lang.applicationError,
    message: System.OS === "Android" ? error.stack : e.message + "\n\n*" + error.stack,
  });
});

import "start";
