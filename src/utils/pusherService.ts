import { Pusher, PusherChannel, PusherEvent, PusherMember } from "@pusher/pusher-websocket-react-native";
import pusherKeys from "./pusherKeys";
import { handleError } from "./utils";

class PusherService {
  pusher;
  constructor() {
    this.pusher = null;
  }
  onError = (message: string, code: Number, error: any) => {
    console.log(`onError: ${message} code: ${code} exception: ${error}`);
  };

  onEvent = (event: any) => {
    console.log(`onEvent: ${event}`);
  };

  onSubscriptionSucceeded = (channelName: string, data: any) => {
    console.log(
      `onSubscriptionSucceeded: ${channelName} data: ${JSON.stringify(data)}`
    );
    const channel: PusherChannel | undefined =
      this.pusher.getChannel(channelName);

    if (!channel) {
      return;
    }
  };

  async initialize() {
    this.pusher = Pusher.getInstance();
    try {
      await this.pusher.init({
        apiKey: pusherKeys.key,
        cluster: pusherKeys.cluster,
        onError: this.onError,
        onSubscriptionSucceeded: this.onSubscriptionSucceeded,
        onEvent: this.onEvent,
      });

      await this.pusher.connect();
    } catch (error) {
      handleError(error);
    }
  }

  getPusher() {
    if (!this.pusher) {
      this.initialize();
    }
    return this.pusher;
  }
}

const pusherService = new PusherService();
export default pusherService;
