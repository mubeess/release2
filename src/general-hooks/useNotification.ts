import notifee from "@notifee/react-native";

const useNotification = () => {
  const requestNotificationPermission = async () => {
    await notifee.requestPermission();
  };

  const notify = async ({ id, title, body }) => {
    let channelId = "";
    if (!channelId) {
      channelId = await notifee.createChannel({
        id,
        name: "Default Name",
        sound: "alert",
      });
    }

    // Display a notification
    await notifee.displayNotification({
      title: title,
      body: body,
      android: {
        channelId,
        pressAction: {
          id: "default",
        },
      },
    });
  };

  return {
    notify,
    requestNotificationPermission,
  };
};

export default useNotification;
