import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components/native';
import { TeamTabProps } from "../../../types/nav";
import { Animated, Dimensions, Platform, Text } from 'react-native';
import MapView, { Marker, AnimatedRegion, MapMarker } from 'react-native-maps';
import Ionicons from '@expo/vector-icons/Ionicons'
import * as Location from 'expo-location';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;

const LATITUDE = 52.24378;
const LONGITUDE = 20.91483;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const ScreenView = styled.View`
    flex: 1;
    background-color: #22223b;
    justify-content: center;
    align-items: center;
`


type Props = TeamTabProps<'Tracker'>;

type PosFn = typeof navigator.geolocation.watchPosition

export const TrackerView: React.FC<Props> = ({ route, navigation }) => {
    const [state, setState] = useState({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        coordinate: new AnimatedRegion({
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: 0,
            longitudeDelta: 0
        })
    })

    useEffect(() => {
        (async () => {
            const fgPermission = await Location.getForegroundPermissionsAsync();
            if (!fgPermission.granted) return;

            const bgPermission = await Location.getBackgroundPermissionsAsync();


        })()
    })

    function getMapRegion() {
        return {
            latitude: state.latitude,
            longitude: state.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        }
    }

    return (
        <ScreenView>
            <MapView
                showsUserLocation
                userLocationUpdateInterval={2000}
                followsUserLocation
                loadingEnabled
                region={getMapRegion()}
                style={{ flex: 1, height: '100%', width: '100%' }}
            >
                <Marker.Animated
                    coordinate={state.coordinate}
                    pinColor='#ffffff'
                >
                    <Ionicons name="people-circle-outline" color="#000000" size={40} />
                </Marker.Animated>
            </MapView>
        </ScreenView>
    )
}