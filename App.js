import React, { Comment, Component } from 'react'
import { Text, StyleSheet, View, PermissionsAndroid, Platform } from 'react-native'
import GMap from './GMap'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasMapPermission: false
    }
  }

  componentDidMount() {
    this.requestFineLocation();
  }

  async requestFineLocation() {
    try {
      if (Platform.OS == 'android') {
        const grant = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
        if (grant == PermissionsAndroid.RESULTS.RESULTS.GRANTED) {
          this.setState({ hasMapPermission: true });
        }
      } else {
        this.setState({ hasMapPermission: true });
      }
    } catch (error) {
      console.warn(error);
    }
  }

  render() {
    if (this.state.hasMapPermission) {
      return <GMap />;
    }
    return null;
  }
}

const style = StyleSheet.create({})