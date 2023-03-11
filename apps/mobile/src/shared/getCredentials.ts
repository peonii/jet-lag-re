import * as SecureStore from 'expo-secure-store';

export async function getCredentials() {
    const sid = await SecureStore.getItemAsync('sid');

    return sid;
}