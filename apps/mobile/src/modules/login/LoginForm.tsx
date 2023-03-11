import React from "react"
import styled from "styled-components/native"
import { Formik } from "formik";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from '../../types/nav'
import { LoginContext } from "../../context/LoginContext";
import { trpc } from "../../utils/trpc";

const LoginHeader = styled.Text`
    font-size: 30px;
    color: #f2e9e4;
    font-family: 'Inter-Bold';
    text-align: center;
`

const LoginView = styled.View`
    flex: 1;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
`

const LoginInput = styled.TextInput`
    border: 2px solid #4a4e69;
    color: #f2e9e4;
    font-family: 'Inter';
    padding: 10px;
    font-size: 18px;
    border-radius: 6px;
`

const PasswordInput = styled.TextInput`
    border: 2px solid #4a4e69;
    color: #f2e9e4;
    font-family: 'Inter';
    padding: 10px;
    font-size: 18px;
    border-radius: 6px;
`

const SubmitButton = styled.TouchableOpacity`
    background-color: #4a4e69;
    padding: 10px;
    margin: 20px 20% 0% 20%;
    border-radius: 6px;
`

const SubmitButtonText = styled.Text`
    color: #f2e9e4;
    font-family: 'Inter-Bold';
    font-size: 18px;
    text-align: center;
`

const ErrorsDisplay = styled.Text`
    color: #dc5d5d;
    font-family: 'Inter-SemiBold';
    font-size: 14px;
`

const InputContainer = styled.View`
    flex-direction: column;
    gap: 6px;
    margin: 0% 10%;
`

type LoginFormValues = {
    name: string;
    password: string;
}

const validate = (values: LoginFormValues) => {
    const errors: Partial<LoginFormValues> = {};

    if (values.password.length < 8) {
        errors.password = 'Hasło musi mieć co najmniej 8 znaków!';
    }

    if (values.name.length < 3) {
        errors.name = 'Nazwa użytkownika musi mieć co najmniej 3 znaki!';
    }

    return errors;
}

export const LoginForm = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { setLoggedIn } = React.useContext(LoginContext);
    const loginMutation = trpc.user.login.useMutation();

    const submit = async (values: LoginFormValues) => {
        try {
            const sid = await loginMutation.mutate(values, {
                onSuccess: async (sid) => {
                    await SecureStore.setItemAsync('sid', sid);
                    setLoggedIn(true);
                    navigation.navigate('Home');
                }
            });
        } catch (_err) {
            return
        }
    }

    return (
        <Formik
            initialValues={{ name: "", password: "" }}
            onSubmit={(values) => submit(values)}
            validate={validate}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                <LoginView>
                    <LoginHeader>Zaloguj się</LoginHeader>
                    <InputContainer>
                        <ErrorsDisplay>{errors.name}</ErrorsDisplay>
                        <LoginInput
                            placeholder="Nazwa"
                            placeholderTextColor="#4a4e69"
                            cursorColor="#f2e9e4"
                            onChangeText={handleChange('name')}
                            onBlur={handleBlur('name')}
                            value={values.name}
                        />
                    </InputContainer>
                    <InputContainer>
                        <ErrorsDisplay>{errors.password}</ErrorsDisplay>
                        <PasswordInput
                            placeholder="Hasło"
                            placeholderTextColor="#4a4e69"
                            secureTextEntry={true}
                            cursorColor="#f2e9e4"
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                        />
                    </InputContainer>
                    <SubmitButton onPress={() => {handleSubmit()}}>
                        <SubmitButtonText>
                            <MaterialCommunityIcons name="login" size={16} color="#f2e9e4" />{' '}
                            Zaloguj
                        </SubmitButtonText>
                    </SubmitButton>
                </LoginView>
            )}
        </Formik>
    )
}