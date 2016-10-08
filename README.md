# Taxi Sift

## Development setup

Taxi Sift is using a build pipeline for bundling and transpiling Javascript code, as well as for concatenating CSS files into a distribution package. The pipeline is configured in `gulpfile.js` and is using [Redsift Bundler](https://github.com/Redsift/redsift-bundler) under the hood.

To use the build pipeline with the Redsift SDK start the gulp watch process in your project's root folder. It takes care of creating a distribution package on each code change:

```bash
gulp
```

Each code change will be reflected in the SDK from then on.

## Visualization of the DAG

![Alt text](http://g.gravizo.com/g?
digraph G {
     convertedreceipts[shape=record,label="convertedreceipts\\nk$s:string/string/string"];
     messages[shape=record,label="messages\\nk$s:string"];
     msgdates[shape=record,label="msgdates\\nk$s:string"];
     openexchangerates[shape=record,label="openexchangerates\\nk$s:string"];
     receipts[shape=record,label="receipts\\nk$s:string/string"];
     taxi -> "Messages mapper 1";
     "Messages mapper 1" -> messages;
     messages -> "Messages mapper";
     msgdates -> "Messages mapper"];
     "Messages mapper" -> msgdates;
     "Messages mapper" -> receipts;
     receipts -> "Currency converter";
     openexchangerates -> "Currency converter"];
     "Currency converter" -> convertedreceipts;
     "Currency converter" -> msgId;
     "Currency converter" -> openexchangerates;
     convertedreceipts -> "Month reducer";
     "Month reducer" -> default;
     convertedreceipts -> "Year reducer";
     "Year reducer" -> default;
     msgId[style="dashed"];
     default[style="dashed"];
})
