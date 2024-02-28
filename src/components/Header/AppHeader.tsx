import { useTheme } from "@react-navigation/native";
import useDisclosure from "../../utils/useDisclosure/useDisclosure";
import {
  Appearance,
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import Icon from "../Icon/Icon";
import SafeAreaComponent from "../SafeAreaComponent/SafeAreaComponent";
import SideMenu from "../SideMenu/SideMenu";
import AvatarMenu from "./AvatarMenu";
import useGroupTermsBySessions from "@safsims/general-hooks/useGroupTermsBySessions";
import { useAppSelector } from "@safsims/redux/hooks/useAppSelector";
import useCurrentTermGet from "@safsims/general-hooks/useCurrentTermGet";
import { useEffect } from "react";

interface IProps {
  onBack?: () => void;
  navigation: any;
  pageTitle?: string;
  withBorder?: boolean;
}

const AppHeader = ({
  onBack,
  navigation,
  pageTitle,
  withBorder = true,
}: IProps) => {
  const { colors, dark } = useTheme();

  const data = useAppSelector((state) => state);
  const { currentTerm: current } = useCurrentTermGet();
  const { selectedTerm } = useGroupTermsBySessions({
    urlTermId: current?.term_id,
  });

  return (
    <>
      <SafeAreaComponent style={{ backgroundColor: colors.PrimaryWhite }} />
      <StatusBar backgroundColor="#fff" />
      <View
        style={[
          styles.container,
          {
            borderColor: colors.PrimaryBorderColor,
            backgroundColor: "#fff",
            borderBottomWidth: withBorder ? 1 : 0,
          },
        ]}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            style={{
              height: 40,
              width: 40,
              borderRadius: 40,
            }}
            source={
              data.configuration.selectedSchool?.logo
                ? { uri: data.configuration.selectedSchool?.logo }
                : require("../../../assets/ICS.png")
            }
          />
        </View>

        <View>
          <Text style={styles.schoolName}>
            {data.configuration.selectedSchool?.school_name}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon name="calendar" size={20} />
            <Text style={{ fontWeight: "500", fontSize: 12, marginLeft: 5 }}>
              {pageTitle ||
                `${selectedTerm?.value?.school_term_definition?.name} / ${selectedTerm?.value?.session?.name}`}
            </Text>
          </View>
        </View>

        <AvatarMenu />
      </View>
    </>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sideMenu: {
    height: Dimensions.get("screen").height,
    zIndex: 5,
    width: 300,
    backgroundColor: "red",
    position: "absolute",
    left: 0,
    borderRightWidth: 1,
  },
  schoolName: {
    fontSize: 8,
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "bold",
  },
});
