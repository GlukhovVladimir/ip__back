const Message = require("./message");
const formatDate = require("./utils");

class Chat {
  chatName;
  subscribers;
  messages;
  admin;
  dateCreation;
  constructor(chatName, userName) {
    this.chatName = chatName;
    this.admin = userName;
    this.subscribers = [];
    this.dateCreation = new Date();
    this.messages = [];
  }
  subscribe(userName, res) {
    this.subscribers.push({ userName, res });
  }
  unsubscribe(userName) {
    let user = this.subscribers.find((x) => x.userName === userName);
    if (!user) {
      return;
    }
    this.subscribers.splice(this.subscribers.indexOf(user), 1);
  }
  addMessage(userName, text) {
    this.messages.push(new Message(userName, text));
  }
  getChatName() {
    return this.chatName;
  }
  getAdmin() {
    return this.admin;
  }
  getSubscribers() {
    return this.subscribers;
  }
  getMessages() {
    return this.messages;
  }
}

module.exports = Chat;
