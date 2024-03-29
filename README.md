# Calibre to Databox

_Current Version: **19.09.27b**_

This is a little parsing app that will take the webhook feed from [Calibre](https://calibreapp.com) and send the data to [Databox](https://databox.com)

> You will need a [Calibre](https://calibreapp.com/sign-up) account and a [Databox](https://databox.com/signup) account (the free personal account will work).

To use this app, you'll need to deploy it to [Heroku](https://heroku.com) or similar service and get it running. When the app is up and running you will see a URL you will use as a webhook in Calibre. In demo mode on CodeSandbox, the URL displayed will most-likey be a local network address such as `192.168.4.179:82/webhook`. This address will not actually work, but if you see it, it means that the app should be responding.

If deploying to Heroku, for ease of app use name it something along the lines of `customname-calibre2databox`.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/dutsonpa/calibre2databox)

> If you do decide to use Heroku, you can use the "free" tier provided you enter a credit card for your 1000 free hours of run time, and you use another service such as the Heroku NewRelic plugin or a HTTP status monitor like UptimeRobot (again, free account that will hit every 5 minutes to keep your heroku app alive).

You can however use the actual CodeSandobx preview URL with /webhook on the end to parse data or at least get a return. I recommend testing via Insomnia or Postman with a JSON feed. The following is a sample JSON feed that was generated by Calibre and sent to the webhook url specified in your Calibre site settings:

```json
{
  "id": 1,
  "generated_at": "2019-09-25T09:39:13Z",
  "organisation_id": "$ORGID",
  "site_id": "$SITEID",
  "primary_region_id": "us-east-1",
  "ref": null,
  "client": "scheduler",
  "status": "completed",
  "html_url": "https://calibreapp.com/$ORGID/$SITENAME/snapshots/11",
  "url": "https://calibreapp.com/api/sites/$SITENAME/snapshots/1.json",
  "created_at": "2019-09-25T09:04:15.446Z",
  "pages": [
    {
      "id": "home",
      "name": "Home",
      "status": "completed",
      "endpoint": "https://www.nordictrack.com",
      "canonical": true,
      "profile": "Galaxy S5 3G",
      "metrics": [
        {
          "name": "json_body_size_in_bytes",
          "value": 553
        },
        {
          "name": "json_size_in_bytes",
          "value": 2163
        },
        {
          "name": "image_body_size_in_bytes",
          "value": 6345689
        },
        {
          "name": "image_size_in_bytes",
          "value": 6351663
        },
        {
          "name": "font_body_size_in_bytes",
          "value": 145306
        },
        {
          "name": "font_size_in_bytes",
          "value": 146390
        },
        {
          "name": "js_body_size_in_bytes",
          "value": 2483091
        },
        {
          "name": "js_size_in_bytes",
          "value": 773889
        },
        {
          "name": "css_body_size_in_bytes",
          "value": 101549
        },
        {
          "name": "css_size_in_bytes",
          "value": 23995
        },
        {
          "name": "html_body_size_in_bytes",
          "value": 152183
        },
        {
          "name": "html_size_in_bytes",
          "value": 55491
        },
        {
          "name": "page_wait_timing",
          "value": 714
        },
        {
          "name": "page_size_in_bytes",
          "value": 7577469
        },
        {
          "name": "page_body_size_in_bytes",
          "value": 9531236
        },
        {
          "name": "asset_count",
          "value": 152
        },
        {
          "name": "onload",
          "value": 80074
        },
        {
          "name": "oncontentload",
          "value": 6242
        },
        {
          "name": "lighthouse-seo-score",
          "value": 82
        },
        {
          "name": "lighthouse-best-practices-score",
          "value": 93
        },
        {
          "name": "lighthouse-accessibility-score",
          "value": 90
        },
        {
          "name": "lighthouse-performance-score",
          "value": 25
        },
        {
          "name": "lighthouse-pwa-score",
          "value": 31
        },
        {
          "name": "js-parse-compile",
          "value": 733
        },
        {
          "name": "total-blocking-time",
          "value": 97
        },
        {
          "name": "dom-size",
          "value": 567
        },
        {
          "name": "visually_complete_85",
          "value": 26172
        },
        {
          "name": "visually_complete",
          "value": 42122
        },
        {
          "name": "consistently-interactive",
          "value": 28813
        },
        {
          "name": "first-interactive",
          "value": 6242
        },
        {
          "name": "time-to-first-byte",
          "value": 317
        },
        {
          "name": "estimated-input-latency",
          "value": 18
        },
        {
          "name": "speed_index",
          "value": 12356
        },
        {
          "name": "first-meaningful-paint",
          "value": 5885
        },
        {
          "name": "first-contentful-paint",
          "value": 2884
        },
        {
          "name": "firstRender",
          "value": 2884
        },
        {
          "name": "test-duration",
          "value": 101870
        },
        {
          "name": "benchmark-index",
          "value": 658
        }
      ],
      "budget_alerts": null,
      "artifacts": {
        "filmstrip": {
          "thumbs": [
            {
              "url": "filmstrip image url",
              "timing": 4212,
              "timestamp": 1126659991.9999998
            },
            {
              "url": "filmstrip image url",
              "timing": 8424,
              "timestamp": 1130872191.9999998
            },
            {
              "url": "filmstrip image url",
              "timing": 12637,
              "timestamp": 1135084392
            },
            {
              "url": "filmstrip image url",
              "timing": 16849,
              "timestamp": 1139296592
            },
            {
              "url": "filmstrip image url",
              "timing": 21061,
              "timestamp": 1143508792
            },
            {
              "url": "filmstrip image url",
              "timing": 25273,
              "timestamp": 1147720991.9999998
            },
            {
              "url": "filmstrip image url",
              "timing": 29485,
              "timestamp": 1151933191.9999998
            },
            {
              "url": "filmstrip image url",
              "timing": 33698,
              "timestamp": 1156145392
            },
            {
              "url": "filmstrip image url",
              "timing": 37910,
              "timestamp": 1160357592
            },
            {
              "url": "filmstrip image url",
              "timing": 42122,
              "timestamp": 1164569792
            }
          ],
          "video": "loading video url"
        },
        "har": "har url"
      }
    }
  ]
}
```

When using the previous json as a payload, you should recieve a different payload back that will work with the Databox API. You can then use the Databox board manager to arrange the data in the way you'd like.
