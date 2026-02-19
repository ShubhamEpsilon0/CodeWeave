import "./Preview.css";

import React, { useRef, useEffect } from "react";

import { templateTypes, renderTemplate } from "@/templates/template-renderer";

// const html =
//   '<!doctype html> \
// <html lang="en"> \
//   <body> \
//     <div id="root"></div> \
//     <script> \
//       const handleError = (error) => { \
//         console.error("Error executing bundled code:", error); \
//         console.log(document.getElementById("root")); \
//         document.getElementById("root").innerHTML = \
//           `<h4  style="color: red;">Error executing bundled code:</h4><pre style="color: red;">${error}</pre>`; \
//       }; \
//       window.addEventListener( \
//         "message", \
//         (event) => { \
//           try { \
//             console.log("Received code to execute:", event.data); \
//             eval(event.data); \
//           } catch (error) { \
//             handleError(error); \
//           } \
//         }, \
//         false \
//       ); \
// \
//       window.addEventListener("error", (event) => { \
//         event.preventDefault(); \
//         handleError(event.error || event.message); \
//       }); \
//     </script> \
//   </body> \
// </html> \
// ';

interface PreviewProps {
  code: string;
  err: string;
}

const Preview: React.FC<PreviewProps> = ({ code, err }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!iframeRef.current) {
      return;
    }
    iframeRef.current.srcdoc = renderTemplate(
      templateTypes.CODE_CELL_RESULT_TEMPLATE
    );

    setTimeout(() => {
      iframeRef.current?.contentWindow?.postMessage(code, "*");
    }, 100);
  }, [code]);
  return (
    <div className="preview-wrapper">
      <iframe
        title="preview"
        ref={iframeRef}
        sandbox="allow-scripts allow-same-origin"
        srcDoc={renderTemplate(templateTypes.CODE_CELL_RESULT_TEMPLATE)}
      />
      {err && <div className="preview-error">{err}</div>}
    </div>
  );
};

export default Preview;
