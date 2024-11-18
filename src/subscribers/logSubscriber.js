class LogSubscriber {
    // This method will be called when the observable notifies the subscribers
    listen(data) {
        console.log("Log subscriber notified:", data)
    }
}

module.exports = LogSubscriber