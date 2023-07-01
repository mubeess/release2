
import { memo, useEffect } from 'react';
import {
  KeyboardType,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { lightTheme } from '../../utils/Theme';
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);
interface InputProps {
  onChange: (e: string) => void;
  text: string;
  label?: string;
  style?: ViewStyle;
  type?: KeyboardType;
  error?: string;
  autoCompleteType?: string;
  secureEntry?: boolean;
}
function AuthInput({
  text,
  onChange,
  label = '',
  style,
  type,
  error,
  secureEntry = false,
}: InputProps) {
  const translateYValue = useSharedValue(25);
  const borderWidthValue = useSharedValue(0);
  const reanimtedTextStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: translateYValue.value },
        { scale: translateYValue.value == 25 ? 1 : 0.7 },
      ],
    };
  });
  const reanimtedBorderStyle = useAnimatedStyle(() => {
    return {
      borderLeftWidth: borderWidthValue.value,
    };
  });
  useEffect(() => {
    if (text) {
      borderWidthValue.value = withSpring(5);
      translateYValue.value = withTiming(5);
    } else {
      borderWidthValue.value = withSpring(0);
      translateYValue.value = withTiming(25);
    }
  }, [text]);

  return (
    <View style={[styles.mainContainer, style]}>
      <AnimatedTouchableOpacity
        activeOpacity={0.8}
        style={[styles.inputContainer, reanimtedBorderStyle]}
      >
        <Animated.Text style={[styles.label, reanimtedTextStyle]}>{label}</Animated.Text>
        <TextInput
          secureTextEntry={secureEntry}
          keyboardType={type}
          autoCapitalize="none"
          onChangeText={onChange}
          autoCorrect={false}
          onFocus={() => {
            translateYValue.value = withTiming(5);
          }}
          style={styles.textInput}
        />
      </AnimatedTouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
  },
  inputContainer: {
    height: 70,
    width: '100%',
    backgroundColor: lightTheme.colors.PrimaryWhite,
    borderRadius: 3,
    shadowColor: lightTheme.colors.PrimaryBorderColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderLeftColor: lightTheme.colors.PrimaryColor,
  },
  label: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    zIndex: 10,
    fontSize: 14,
    fontWeight: '500',
    textTransform: 'uppercase',
    marginLeft: 10,
  },
  textInput: {
    width: '100%',
    backgroundColor: '#fff',
    height: 40,
    paddingHorizontal: 0,
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    fontStyle: 'italic',
  },
});

export default memo(AuthInput);
