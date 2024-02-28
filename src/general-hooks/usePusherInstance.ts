import { Pusher, PusherChannel } from "@pusher/pusher-websocket-react-native";
import pusherKeys from "@safsims/utils/pusherKeys";
import { handleError } from "@safsims/utils/utils";

function usePusherInstance() {
  const onConnectionStateChange = (
    currentState: string,
    previousState: string
  ) => {};
  const onError = (message: string, code: Number, error: any) => {
    console.log(`onError: ${message} code: ${code} exception: ${error}`);
  };

  const onEvent = (event: any) => {
    console.log(`onEvent: ${event}`);
  };

  const onSubscriptionSucceeded = (channelName: string, data: any) => {
    console.log(
      `onSubscriptionSucceeded: ${channelName} data: ${JSON.stringify(data)}`
    );
    const channel: PusherChannel | undefined = pusher.getChannel(channelName);

    if (!channel) {
      return;
    }
  };

  const pusher = Pusher.getInstance();
  async function initialisePusher() {
    try {
      await pusher.init({
        apiKey: pusherKeys.key,
        cluster: pusherKeys.cluster,
        onConnectionStateChange,
        onError,
        onSubscriptionSucceeded,
        onEvent,
      });

      await pusher.connect();
    } catch (error) {
      handleError(error);
    }
  }

  return {
    initialisePusher,
    pusher,
  };
}
export default usePusherInstance;
