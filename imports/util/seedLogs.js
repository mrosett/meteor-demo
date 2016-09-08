function seedLogs(num) {
  var endpoints = ["https://api.civic.com/test/v1/alertuser", "https://api.civic.com/test/v1/userlockedpermission", "https://api.civic.com/test/v1/userlockedstatus"];
  var statuses = ["success", "failure"];
  var client_names = ["foo", "bar", "baz"];
  for (i = 0; i < num; i++) {
    var timestamp = new Date();
    var offset = 525600 * Math.random(); // Some time in the last year
    timestamp.setMinutes(timestamp.getMinutes() - offset);

    var endpoint = endpoints[Math.floor(Math.random() * endpoints.length)];
    var client_name = client_names[Math.floor(Math.random() * client_names.length)];
    var status = statuses[Math.floor(Math.random() * statuses.length)];

    db.logs.insert({
      timestamp: timestamp,
      endpoint: endpoint,
      client_name: client_name,
      status: status
    });
  }
}