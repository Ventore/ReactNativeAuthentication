import React, { Component } from 'react';
import { View, SafeAreaView } from 'react-native';
import firebase from 'firebase';
import { Button, Spinner, Card, CardSection } from './components/common';
import Header from './components/Header';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyA3Qc1uXacMJwBCJjLJXZsk7XEwPWflrcU',
      authDomain: 'react-native-auth-a28d9.firebaseapp.com',
      databaseURL: 'https://react-native-auth-a28d9.firebaseio.com',
      projectId: 'react-native-auth-a28d9',
      storageBucket: 'react-native-auth-a28d9.appspot.com',
      messagingSenderId: '912576291097',
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Card>
            <CardSection>
              <Button onPress={() => firebase.auth().signOut()}>Log Out</Button>
            </CardSection>
          </Card>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner style={{ flex: 1 }} size="large" />;
    }
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#F3F3F3' }}>
        <SafeAreaView>
          <Header headerText="Authentication" />
          {this.renderContent()}
        </SafeAreaView>
      </View>
    );
  }
}

export default App;
