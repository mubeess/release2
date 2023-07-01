import { Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { useAppSelector } from '../../redux/hooks/useAppSelector';
import { darkTheme, lightTheme } from '../../utils/Theme';

interface IProps {
  style?: any;
}

const SafeAreaComponent = (props: IProps) => {
  const { style = {} } = props;
  const theme = useAppSelector((state) => state.user?.theme);
  const isDark = theme === 'dark';
  const isAndroid = Platform.OS == 'android';
  return (
    <>
      <SafeAreaView style={style} />
      <StatusBar
        backgroundColor={
          isDark ? lightTheme.colors.PrimaryBackground : darkTheme.colors.PrimaryBackground
        }
        barStyle={isDark ? 'light-content' : 'dark-content'}
      />
    </>
  );
};

export default SafeAreaComponent;

const styles = StyleSheet.create({});
