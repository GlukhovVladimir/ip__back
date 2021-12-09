const express = require("express");
const Chat = require("./chat");
const app = express();
const port = 5000;
const CHATS = [];
const USERS = [];

app.use(express.urlencoded({ extended: true }));

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static("views"));

//
// Routes
//
app.get("/", (_, res) => {
  res.render("entrance");
});

app.get("/enter", function (req, res) {
  if (!req.query.userName) {
    res.sendStatus(422);
  }
  if (USERS.findIndex((name) => name == req.query.userName) != -1) {
    res.sendStatus(409);
  }
  USERS.push(req.query.userName);
  res.sendStatus(200);
});

app.get("/chats", function (req, res) {
  res.render("chats.ejs", { userName: req.query.userName, chats: CHATS });
});

app.get("/chats/add", function (req, res) {
  if (!req.query.userName) {
    res.sendStatus(422).send("Missing userName");
  }
  res.render("addChat.ejs", { userName: req.query.userName });
});

app.get("/chat/create", function (req, res) {
  if (!req.query.userName) {
    res.sendStatus(422).send("Missing userName");
  }
  if (!req.query.chatName) {
    res.sendStatus(422).send("Missing chatName");
  }
  console;
  if (
    CHATS.findIndex(
      (chat) =>
        chat.getChatName() == req.query.chatName &&
        chat.getAdmin() == req.query.userName
    ) != -1
  ) {
    res.sendStatus(409).send("Such chat already exists");
  }

  CHATS.push(new Chat(req.query.chatName, req.query.userName));
  res.sendStatus(200);
});

app.get("/chat", function (req, res) {
  console.log("/chat", req.query);

  const chat = CHATS.find(
    (chat) =>
      chat.getChatName() == req.query.chatName &&
      chat.getAdmin() == req.query.adminName
  );
  console.log("chat: ", chat);
  res.render("chat.ejs", {
    userName: req.query.userName,
    chatName: chat.getChatName(),
    adminName: chat.getAdmin(),
  });
});

app.post("/chat/messages", function (req, res) {
  let chat;
  let data;
  req
    .on("data", function (raw) {
      data = JSON.parse(raw);
      console.log("data", data);
      chat = CHATS.find(
        (chat) =>
          chat.getChatName() == data.chatName &&
          chat.getAdmin() == data.adminName
      );
      console.log(chat);
      chat.addMessage(data.userName, data.text);
    })
    .on("end", function () {
      const lastMessage = chat.messages[chat.messages.length - 1];
      const subscribers = chat.getSubscribers();
      console.log(lastMessage);
      subscribers.forEach((user) => {
        user.res.end(JSON.stringify({ ...lastMessage }));
      });
      res.end("ok");
    });
  console.log(chat);
});

app.get("/chat/sub", function (req, res) {
  console.log(req.query);

  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-cache, must-revalidate");
  const chat = CHATS.find(
    (chat) =>
      chat.getChatName() == req.query.chatName &&
      chat.getAdmin() == req.query.adminName
  );
  chat.subscribe(req.query.userName, res);
  console.log("chat.subscribe", chat);

  req.on("close", function () {
    chat.unsubscribe(req.query.userName);
  });
});

//
// Launch
//
app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});
