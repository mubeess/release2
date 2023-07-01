import { useTheme } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import { fontelloConfig } from '../../fontelloConfig';

const IconComponent = createIconSetFromFontello(fontelloConfig);

type IProps = {
  name: string;
  size?: number;
  color?: string;
};

const Icon = ({ name, size, color }: IProps) => {
  const { colors } = useTheme();
  return <IconComponent name={name} size={size} color={color || colors.PrimaryFontColor} />;
};

export default Icon;

const styles = StyleSheet.create({});
