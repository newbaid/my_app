var login = require("facebook-chat-api");

login({email: "newbaid@naver.com", password: "djswpsk1@@"}, function callback (err, api) {
    if(err) return console.error(err);

    api.listen(function callback(err, message) {
        api.sendMessage(message.body, message.threadID);
    });
});
