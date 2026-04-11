const Chat = require("../models/chat");

let activeUsers_num = 0;

module.exports = (io) => {
    io.on("connection", (socket) => {
        activeUsers_num++;
        console.log("Користувач під'єднався");
        socket.on("user joined", async (data) => {
            socket.login = data; // тут просто стрічка а не об'єкт тому поміняв просто логін

            io.emit("chat connection", {
                activeUsers_num,
                userName: socket.login,
            });

            try {
                const historyDocs = await Chat.find()
                    .sort({ createdAt: 1 })
                    .limit(50);

                const history = historyDocs.map((doc) => ({
                    id: null,
                    username: doc.login,
                    message: doc.message,
                    data:
                        doc.time ||
                        new Date(doc.createdAt)
                            .toLocaleTimeString()
                            .slice(0, 5),
                }));

                socket.emit("messages history", history);
            } catch (err) {
                console.error("Помилка завантаження історії:", err);
            }
        });

        socket.on("chat message", async (msg) => {
            try {
                console.log("MSG FRONT:", msg);
                console.log("socket.login:", socket.login);

                const chat = new Chat({
                    login: socket.login || msg.username || "Анонім",
                    message: msg.message,
                    time: msg.data,
                });

                const saved = await chat.save();
                console.log("SAVED:", saved);

                io.emit("chat message", {
                    id: msg.id,
                    username: saved.login,
                    message: saved.message,
                    avatar: msg.avatar,
                    data: saved.time,
                });
            } catch (err) {
                console.error("Помилка збереження повідомлення:", err);
            }
        });

        socket.on("disconnect", () => {
            activeUsers_num--;
            console.log("Користувач від'єднався");
            io.emit("chat disconnection", {
                activeUsers_num,
                userName: socket.login,
            });
        });
    });
};
