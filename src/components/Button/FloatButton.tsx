import { lightTheme } from "@safsims/utils/Theme";
import { ReactElement } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
interface IProps {
  color?: string;
  onPress?: () => void;
  Icon: ReactElement;
}
export default function FloatButton({
  color = "",
  onPress,
  Icon,
  ...props
}: IProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      {...props}
      style={[
        styles.container,
        {
          backgroundColor: color ? color : lightTheme.colors.PrimaryColor,
        },
      ]}
    >
      {Icon && Icon}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 50,
    height: 50,
    borderRadius: 40,
    marginBottom: 100,
    marginRight: 20,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 200,
  },
});
