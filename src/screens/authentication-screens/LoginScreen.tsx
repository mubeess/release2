import { useTheme } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AuthLayout from "./components/AuthLayout";
import useLogin from "./hooks/useLogin";
import AuthInput from "../../components/Input/AuthInput";
import Button from "../../components/Button/Button";
import Icon from "../../components/Icon/Icon";
import { lightTheme } from "../../utils/Theme";
import useCurrentTermGet from "@safsims/general-hooks/useCurrentTermGet";
import { useAppSelector } from "@safsims/redux/hooks/useAppSelector";

const LoginScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [values, setValues] = useState({ username: "", password: "" });
  const school_id = useAppSelector(
    (data) => data.configuration.selectedSchool?.school_id
  );
  const { loginUser, loading } = useLogin({ school_id });

 
  const onSubmit = () => {
    const { username, password } = values;
    if (username && password) {
      loginUser(values);
    }
  };

  return (
    <>
      <AuthLayout
        title={"Login"}
        InputComponents={
          <>
            <AuthInput
              label="Email"
              text={values.username}
              type="email-address"
              onChange={(val) =>
                setValues((prev) => ({ ...prev, username: val }))
              }
            />
            <AuthInput
              label="Password"
              style={{
                marginTop: 15,
                zIndex: 10,
              }}
              secureEntry
              text={values.password}
              onChange={(val) =>
                setValues((prev) => ({ ...prev, password: val }))
              }
            />
          </>
        }
        ButtonComponents={
          <>
            <View style={{ marginTop: 30, flexDirection: "row" }}>
              <Text>Forgot your password?</Text>
              <TouchableOpacity style={{ marginLeft: 5 }}>
                <Text style={{ color: colors.PrimaryBlue }}>Click here</Text>
              </TouchableOpacity>
            </View>

            <Button
              label="Login"
              isLoading={loading}
              onPress={() => onSubmit()}
              IconRight={<Icon name="arrow-right-1" size={20} color="#fff" />}
              fontStyle={{
                fontSize: 16,
                fontWeight: "500",
              }}
              style={{
                marginTop: 30,
                height: 60,
              }}
            />

            {/* <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
                marginVertical: 20,
                backgroundColor: '#FFF',
                borderRadius: 3,
                height: 60,
                alignItems: 'center',
                shadowColor: Colors.grey40,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
              }}
            >
              <Icon name="google" size={20} color={colors.PrimaryFontColor} />
              <Text>Login with Google</Text>
              <View />
            </TouchableOpacity> */}

            <View
              style={{
                marginTop: 5,
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Text>Not your school?</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("SelectSchool")}
                style={{ marginLeft: 5 }}
              >
                <Text style={{ color: colors.PrimaryBlue }}>Change School</Text>
              </TouchableOpacity>
            </View>
          </>
        }
      />

      {/* <Pattern2
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 5,
          bottom: 0,
          zIndex: 0,
        }}
      /> */}
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightTheme.colors.PrimaryBackground,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
});
