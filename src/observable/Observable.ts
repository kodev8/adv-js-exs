export interface Subscriber {
    onNotify: (data: any) => void;
    meta: any;
}

export type NotifyData = {
    type: string;
    meta: any;
    message: string;
};

interface IObservable {
    subscribers: Subscriber[];
    subscribe: (subscriber: Subscriber) => void;
    unsubscribe: (subscribe: Subscriber) => void;
    notify: (data: NotifyData) => void;
}

class Observable implements IObservable {
    subscribers: Subscriber[];
    constructor() {
        this.subscribers = [];
    }

    // Method to add a subscriber
    subscribe(subscriber: Subscriber) {
        this.subscribers.push(subscriber);
    }

    // Method to add a subscriber
    unsubscribe(fn: any) {
        this.subscribers = this.subscribers.filter(
            (subscriber) => subscriber !== fn
        );
    }

    // Method to notify all subscribers
    notify(data: NotifyData) {
        this.subscribers.forEach((subscriber) => {
            for (const key in subscriber.meta) {
                if (subscriber.meta[key] !== data.meta[key]) {
                    return;
                }
            }
            subscriber.onNotify(data);
        });
    }
}

export default Observable;
