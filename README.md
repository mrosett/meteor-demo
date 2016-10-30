# meteor-demo

This mini-project was completed as part of the interview process for a software engineering role. I used Meter and React to build a basic app that displayed recent log entries for some fake API. Before starting on this project, I hadn't ever written Javascript, so please forgive any style errors.

The log viewing app should run without any problems. The one extra step is to seed the database using seedLogs.js. This can be done with:

    meteor mongo
    load("imports/util/seedLogs.js")
    seedLogs(1000)

(The script is hidden in imports so that it won't be loaded into the app itself.)

The task was completed as described, but a few areas for improvement exist:
* There's only basic client-side validation when manually adding new log entries and that validation provides no feedback other than refusing to submit.
* The form for manually adding log entries doesn't have a field for timestamp but instead uses the current time.
* When the user adds a log entry using the form, the total number of entries displayed increments, so we don't have a problem with the bottom entry dropping off. However, if the new entry is added by some other source, it will appear at the top and an entry at the bottom will be dropped.


