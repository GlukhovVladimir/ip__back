class Message {
  userName;
  text;
  date;
  constructor(userName, text) {
    this.userName = userName;
    this.text = text;
    this.date = Date();
  }
}

module.exports = Message;
