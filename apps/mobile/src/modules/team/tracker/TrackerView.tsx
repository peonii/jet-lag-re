import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components/native';
import { TeamTabProps } from "../../../types/nav";
import { Animated, Button, Dimensions, Platform, Text } from 'react-native';
import MapView, { Marker, AnimatedRegion, MapMarker } from 'react-native-maps';
import Ionicons from '@expo/vector-icons/Ionicons'
import * as Location from 'expo-location';
import PubnubReact, { usePubNub } from 'pubnub-react';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;

const LATITUDE = 52.24378;
const LONGITUDE = 20.91483;
const LATITUDE_DELTA = 0.006;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

let foregroundSubscription: Location.LocationSubscription;

const ScreenView = styled.View`
    flex: 1;
    background-color: #22223b;
    justify-content: center;
    align-items: center;
`


type Props = TeamTabProps<'Tracker'>;

type PosFn = typeof navigator.geolocation.watchPosition

export const TrackerView: React.FC<Props> = ({ route, navigation }) => {
    const [position, setPosition] = useState({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        heading: 0,
        accuracy: 0,
        coordinate: new AnimatedRegion({
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: 0,
            longitudeDelta: 0
        })
    })

    const pubnub = usePubNub();


    async function requestPermissions() {
        const fgPermission = await Location.requestForegroundPermissionsAsync();
        if (!fgPermission.granted) return;

        const bgPermission = await Location.requestBackgroundPermissionsAsync();
        if (!bgPermission.granted) return;
    }

    useEffect(() => {
        requestPermissions();
    })

    const startForegroundUpdate = async () => {
        const { granted } = await Location.getForegroundPermissionsAsync();

        if (!granted) return;

        if (foregroundSubscription != undefined)
            foregroundSubscription.remove();

        foregroundSubscription = await Location.watchPositionAsync(
            {
                accuracy: Location.Accuracy.BestForNavigation
            },
            location => {
                position.coordinate.setValue({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0,
                    longitudeDelta: 0,
                })
                
                setPosition({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    coordinate: position.coordinate,
                    heading: location.coords.heading ?? 0,
                    accuracy: location.coords.accuracy ?? 0
                })
            }
        );
    }

    const stopForegroundUpdate = async () => {
        if (foregroundSubscription != undefined)
            foregroundSubscription.remove();
    }

    function getMapRegion() {
        return {
            latitude: position.latitude,
            longitude: position.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        }
    }

    function calculateTrackerColor() {
        if (position.accuracy > 200) {
            return "#880000"
        }
        
        if (position.accuracy > 125) {
            return "#884400"
        }

        if (position.accuracy > 75) {
            return "#888800"
        }
        
        if (position.accuracy > 30) {
            return "#448800"
        }
    
        return "#008800"
    }

    return (
        <ScreenView>
            <MapView
                showsUserLocation
                userLocationUpdateInterval={2000}
                followsUserLocation
                loadingEnabled
                style={{ flex: 1, height: '100%', width: '100%' }}
                mapType={"terrain"}
            >
                <Marker.Animated
                    coordinate={position.coordinate}
                    pinColor='#ffffff'
                    anchor={{ x: 0.5, y: 0.5 }}
                >
                    <Ionicons name="people-circle-outline" style={{ textShadowColor: "#00000099", textShadowRadius: 10 }} color={calculateTrackerColor()} size={40} />
                </Marker.Animated>
            </MapView>
            <Button title="Start tracker" onPress={startForegroundUpdate} />
            <Button title="Stop tracker" onPress={stopForegroundUpdate} />
        </ScreenView>
    )
}