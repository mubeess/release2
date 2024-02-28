import { useNavigation } from '@react-navigation/native';
import { GlobalIcon } from '@safsims/components/Images';
import Text from '@safsims/components/Text/Text';
import { lightTheme } from '@safsims/utils/Theme';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export default function ChatList() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Chat')} style={styles.container}>
      <GlobalIcon />

      <View style={styles.main}>
        <View style={styles.biodata}>
          <View style={styles.name}>
            <Text h3>GENERAL</Text>
            <Text style={styles.label}>{'[school admin]'}</Text>
          </View>

          <View style={styles.options}>
            <Text style={styles.label}>6m</Text>
          </View>
        </View>

        <View style={styles.mainChat}>
          <Text
            style={{
              ...styles.label,
              marginLeft: 0,
            }}
          >
            Amina Muaddi: we need time to cond...
          </Text>
          <View style={styles.messageCount}>
            <Text style={{ color: '#fff' }}>2</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginBottom: 25,
  },
  biodata: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  name: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  options: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    color: lightTheme.colors.PrimaryGrey,
    marginHorizontal: 5,
  },
  main: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,

    marginLeft: 10,
  },
  mainChat: {
    width: '100%',

    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  messageCount: {
    height: 20,
    width: 20,
    backgroundColor: lightTheme.colors.PrimaryColor,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
