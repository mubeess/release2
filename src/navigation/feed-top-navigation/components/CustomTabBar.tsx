import Icon from '@safsims/components/Icon/Icon';
import { lightTheme } from '@safsims/utils/Theme';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function CustomTabBar({ state, descriptors, navigation, position }) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const inputRange = state.routes.map((_, i) => i);
        const opacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map((i) => (i === index ? 1 : 0)),
        });

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              ...styles.activityContainer,
              borderBottomColor: isFocused ? lightTheme.colors.PrimaryColor : '#E9F0F4',
              borderBottomWidth: 2,
            }}
          >
            <Icon
              name={index == 0 ? 'direct' : 'message-text'}
              size={20}
              color={isFocused ? lightTheme.colors.PrimaryColor : '#E9F0F4'}
            />
            <Animated.Text
              style={[
                styles.text,
                { color: isFocused ? lightTheme.colors.PrimaryColor : '#9D9DB7' },
              ]}
            >
              {label}
            </Animated.Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  activityContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  text: {
    marginLeft: 7,
  },
});
