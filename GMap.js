import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import Geolocation from 'react-native-geolocation-service';

export default class GMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userLatitude: 0,
            userLongitude: 0
        };
    }

    componentDidMount() {
        this.locationWatchId = Geolocation.watchPosition(
            (pos) => {
                this.setState({
                    userLatitude: pos.coords.latitude,
                    userLongitude: pos.coords.longitude
                })
            },
            (error) => console.warn(error), {
            enableHighAccuracy: true
        }
        )
    }

    componentWillUnmount() {
        Geolocation.clearWatch(this.locationWatchId);
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    showsUserLocation
                    followsUserLocation
                    style={styles.map}
                    region={{
                        latitude: this.state.userLatitude,
                        longitude: this.state.userLongitude,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}
                >
                </MapView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});