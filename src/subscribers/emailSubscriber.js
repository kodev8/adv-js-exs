class EmailSubscriber { 
    listen(data) {
        console.log("Email subscriber notified:", data)
    }
}

module.exports = EmailSubscriber