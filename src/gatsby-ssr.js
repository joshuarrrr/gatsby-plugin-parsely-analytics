/**
 * SSR = Gatsby Server-side Rendering
 */
import React from "react";

import { getOptions } from "./utils";

exports.onRenderBody = function handleRenderBody(
  { setHeadComponents },
  pluginOptions
) {
  const options = getOptions(pluginOptions);
  if (options.isEnabled) {
    const { apikey } = options;

    return setHeadComponents([
      <script
        key="gatsby-plugin-parsely-analytics"
        id="parsely-cfg"
        async
        defer
        src={`//cdn.parsely.com/keys/${apikey}/p.js`}
      />,
      <script
        key="gatsby-plugin-parsely-analytics-onload"
        dangerouslySetInnerHTML={{
          __html: `
          window.PARSELY = {
            pageviewQueue: [],
            autotrack: false,
            onload: function() {
              for (var i = 0; i < window.PARSELY.pageviewQueue.length; i++) {
                PARSELY.beacon.trackPageView(window.PARSELY.pageviewQueue[i]);
              }
            },
          };`
        }}
      />
    ]);
  }

  return null; // NODE_ENV != production
};
