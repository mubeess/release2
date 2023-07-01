import { useTheme } from '@react-navigation/native';
import { ReactElement } from 'react';
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
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { lightTheme } from '../../utils/Theme';
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);
export interface InputProps {
  onChange?: (e: string) => void;
  label?: string;
  style?: ViewStyle;
  type?: KeyboardType;
  secureEntry?: boolean;
  Icon?: ReactElement;
  IconLeft?: ReactElement;
  required?: boolean;
  placeholder?: string;
  value?: string | number;
  onBlur?: () => void;
  onFocus?: () => void;
}
function Input({
  onChange,
  label,
  style,
  type,
  Icon,
  placeholder,
  required = false,
  secureEntry = false,
  onBlur,
  onFocus,
  value,
  IconLeft,
}: InputProps) {
  const borderWidthValue = useSharedValue(1);

  const { colors } = useTheme();

  const reanimtedBorderStyle = useAnimatedStyle(() => {
    const borderColor = interpolateColor(
      borderWidthValue.value,
      [1, 2],
      [colors.PrimaryBorderColor, colors.PrimaryColor],
    );
    return {
      borderWidth: borderWidthValue.value,
      borderColor,
    };
  });

  return (
    <View style={[styles.mainContainer, style]}>
      <View style={styles.labelContainer}>
        {label && <Text style={styles.label}>{label}</Text>}
        {required && <Text style={styles.required}>*</Text>}
      </View>
      <AnimatedTouchableOpacity style={[styles.inputContainer, reanimtedBorderStyle]}>
        {IconLeft && IconLeft}
        <TextInput
          value={`${value || ''}`}
          keyboardType={type}
          onChangeText={onChange}
          secureTextEntry={secureEntry}
          onFocus={() => {
            borderWidthValue.value = withTiming(2);
            onFocus?.();
          }}
          onBlur={() => {
            borderWidthValue.value = withTiming(1);
            onBlur?.();
          }}
          placeholder={placeholder}
          style={styles.textInput}
        />
        {Icon && Icon}
      </AnimatedTouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    flexDirection: 'column',
  },
  labelContainer: {
    flexDirection: 'row',
  },
  required: {
    color: 'red',
    fontWeight: 'bold',
  },
  inputContainer: {
    height: 48,
    width: '100%',
    marginTop: 10,
    backgroundColor: lightTheme.colors.PrimaryWhite,
    borderRadius: 3,
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    flexDirection: 'row',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  textInput: {
    width: '90%',
    backgroundColor: '#fff',
    height: 40,
  },
});

export default Input;
