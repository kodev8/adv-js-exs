class DatabaseSubscriber { 
    listen(data) {
        console.log("Database subscriber notified:", data)
    }
}

module.exports = DatabaseSubscriber