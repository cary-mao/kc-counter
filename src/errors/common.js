/**
 * collect common errors
 */
function collectScriptLoadError() {
  console.log(arguments);
}

function collectImgLoadError() {}

function collectWindowError() {}

window.addEventListener("error", (e) => {
  // resources load
  if (e.target.nodeName) {
    const nodeName = e.target.nodeName.lowerCase();
    switch (nodeName) {
      case "script":
        collectScriptLoadError(e);
        break;
      case "img":
        collectImgLoadError(e);
        break;
    }
  } else {
  }
});

window.addEventListener("unhandledrejection", (e) => {});
