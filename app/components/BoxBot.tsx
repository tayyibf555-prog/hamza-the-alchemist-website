import Script from "next/script";

const BOXBOT_TOKEN = "f1e9c7935b3a81747b047a1d77544519";

/**
 * BoxBot chat widget — a lead-conversion chatbot Hamza is trialling for
 * three months (free), installed from BoxBot's own snippet. Remove this
 * component from the layout if the trial is dropped.
 *
 * BoxBot's optional step 2 (CSS that hides every "apply"/"book" button so
 * the bot is the only way to act) is deliberately not applied: it would
 * hide the site's own checkout and apply buttons.
 */
export function BoxBot() {
  return (
    <Script id="boxbot" strategy="lazyOnload">
      {`(function(w,d){function l(){var s=d.createElement('script');s.src='https://getboxbot.com/boxbot-loader.js?t='+Math.floor(Date.now()/36e5);s.async=true;s.setAttribute('data-token','${BOXBOT_TOKEN}');d.body.appendChild(s);}if(d.readyState==='complete')l();else w.addEventListener('load',l);})(window,document);`}
    </Script>
  );
}
