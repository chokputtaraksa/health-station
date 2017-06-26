function HealthData(uid, value, tool, type, date_time) {
  this.uid = uid;
  this.value = value;
  this.tool = tool;
  this.type = type;
  this.date_time = date_time;
}

module.exports = HealthData;
