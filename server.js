const express = require("express");
const app = express();
var admin = require("firebase-admin");
const bodyparser = require("body-parser");
const fetch = require("node-fetch");
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

app.use(bodyparser.json());

app.get("/firebase/notification", (req, res) => {
    const registrationToken = [
        "",
    ];

    const notification = {
        title: "My Notification ",
        body: "This is the content -- ,",
    };
    const notification_options = {
        priority: "high",
    };

    const notification_body = {
        notification: notification,
    };

    admin
        .messaging()
        .sendToDevice(registrationToken, notification_body, notification_options)
        .then((response) => res.status(200).json({ result: response }))
        .catch((error) => res.status(400).json({ error: error }));

    // fetch("https://fcm.googleapis.com/fcm/send", {
    // 	method: "POST",
    // 	headers: {
    // 		Authorization:
    // 			"key=" +
    // 		"Content-Type": "application/json",
    // 	},
    // 	body: JSON.stringify(notification_body),
    // })
    // 	.then((resp) => res.status(200).json({res: resp}))
    // 	.catch((error) => res.status(400).json({error: error}));

    // var message = {
    //     data: {
    //       score: '850',
    //       time: '2:45'
    //     },
    //     token: registrationToken
    //   };

    //   // Send a message to the device corresponding to the provided
    //   // registration token.
    // admin
    // 	.messaging()
    // 	.send(notification_body)
    // 	.then((response) => {
    // 		// Response is a message ID string.
    // 		console.log("Successfully sent message:", response);
    // 	})
    // 	.catch((error) => {
    // 		console.log("Error sending message:", error);
    // 	});
    // admin
    // 	.messaging()
    // 	.sendToDevice(t, {
    // 		notification: {title: "Hello"},
    // 		data: {MessageChannel: "channel-id"},
    // 	})
    // 	.then((response) => {
    // 		res.status(200).send("Notification sent successfully");
    // 	})
    // 	.catch((error) => {
    // 		console.log(error);
    // 	});
});

const PORT = 5050;
app.get("/", (req, res) => res.send("Checking Route .. "));

app.listen(PORT, (req, res) => console.log(`Server runs in the PORT:${PORT}`));
