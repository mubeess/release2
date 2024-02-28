import { StyleSheet, View } from 'react-native';
import ChatList from './components/ChatList';

export default function Chats() {
  return (
    <View style={styles.container}>
      <ChatList />
      <ChatList />
      <ChatList />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
});
