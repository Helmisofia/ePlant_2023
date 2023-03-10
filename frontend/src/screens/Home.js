import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import firebase from '../components/firebase';
import { Snackbar } from 'react-native-paper';

export default function Home(props) {
    const user = "Petra";
    const [plants, setPlants] = useState([]);
    const [visibility, setVisibility] = useState(false);
    const { navigate } = props.navigation;

    // use these variables if they have all these props (so if user has navigated to Home.js from SelectName.js)
    const showSnackbar = props.navigation && props.navigation.state && props.navigation.state.params && props.navigation.state.params.showSnackbar
    const plantName = props.navigation && props.navigation.state && props.navigation.state.params && props.navigation.state.params.plantName

    // change snackbar visibility opposite to current status
    const toggleSnackBar = () => setVisibility(!visibility);

    console.disableYellowBox = true;

    // retrieving firebase data and inserting it to "plants" list
    useEffect(() => {
        firebase.database().ref('omatkasvit/').on('value', snapshot => {
            const plants = Object.values(snapshot.val());
            setPlants(plants);
        });

        if (showSnackbar === true) {
            toggleSnackBar();
        }
    }, []);

    // sending selected items data to next screen and navigating to there
    const handleSelect = (item) => {
        console.log(item)
        navigate('MyPlant', { plant: item })
    };

    return (
        <View style={styles.container}>    
            <ScrollView style={styles.container}>
                <View style={styles.top} >
                    <Text style={styles.top}>Huomenta {user}!</Text>
                </View>
                
                <View style={styles.middle}>
                    <View style={styles.middleheader}>
                        <Text style={styles.header}>Omat kasvini</Text>
                    </View>
                    <FlatList
                        horizontal={true}
                        contentContainerStyle={{ alignSelf: 'flex-start' }}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        data={plants}
                        renderItem={({ item }) =>
                            <TouchableOpacity style={styles.border}
                                onPress={() => handleSelect(item)}
                            >
                                <Text style={styles.middletext}>{item.nimi}</Text>
                                <Image style={styles.middleimage} source={require('../assets/flowerpot.png')} />
                            </TouchableOpacity>
                        }
                    />
                </View>
                <View style={styles.bottomheader}>
                    <Text style={styles.header}>Viimeisimm??t tapahtumat</Text>
                    <TouchableOpacity
                        onPress={() => navigate('Notifications', { plants })}
                    >
                        <Text style={styles.showmore}>N??yt?? lis????</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bottom}>
                    <FlatList data={plants}
                        marginLeft={15}
                        renderItem={({ item }) =>
                            <View style={styles.bottomitem}>
                                <View>
                                   <View style={styles.circle}/>
                                </View>
                                <View style={styles.bottomtext}>
                                    <Text style={styles.bottomtext1}>T??n????n klo 8.20</Text>
                                    <Text style={styles.bottomtext2}>{item.nimi} kasteltu.</Text>
                                </View>
                            </View>

                        }
                    />
                </View>
            </ScrollView>
            <View>
                <Snackbar
                    visible={visibility}
                    onDismiss={toggleSnackBar}
                    theme={{ colors: { accent: '#63816D' }}}
                    style={{
                        backgroundColor: '#404040',
                        
                    }}
                    action={{
                        label: 'SULJE',
                        onPress: () => {toggleSnackBar},
                    }}
                >
                    {plantName} lis??tty omiin kasveihin!
                </Snackbar>
            </View>
        </View>
    );
};

Home.navigationOptions = () => ({ title: 'Home' });

const styles = StyleSheet.create({
    button: {
        paddingBottom: 20
    },
    container: {
        backgroundColor: '#FCFCFC',
        flex: 1,

    },
    top: {
        fontSize: 26,
        marginLeft: 10,
        flex: 1,
        marginTop: 40,
        marginBottom: 30
    },
    middle: {
        fontSize: 14,
        marginLeft: 10,
        flex: 2,
        fontWeight: 'bold',
        shadowColor: "#000",
    },
    middleheader: {
        justifyContent:"space-between",
        flexDirection: 'row',
    },
    header: {
        fontSize: 14,
        fontWeight: "bold",
        marginLeft: 5,
        marginBottom: 15
    },
    border: {
        shadowColor: 'rgba(0,0,0, .1)', // IOS
        shadowOffset: { height: 3, width: 2 }, // IOS
        shadowOpacity: 3, // IOS
        shadowRadius: 1, //IOS
        elevation: 3, // android
        borderRadius: 4,
        margin:5,
        marginRight: 3,
        marginLeft: 3,
        marginTop: 10,
        backgroundColor: 'white',
        height: 170
    },
    middletext: {
        textAlign: 'center',
        fontSize: 16,
        marginTop: 10,
        fontWeight: "bold"
    },
    middleimage: {
        width: 150,
        height: 150
    },
    bottomheader: {
        justifyContent:"space-between",
        flexDirection: 'row',
        marginLeft: 10,
        marginTop: 30
    },
    showmore: {
        color: '#63816D',
        fontSize: 12,
        fontWeight: "bold",
        marginRight: 20
    },
    bottom: {
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 10,
        flex: 2,
        fontWeight: 'bold',
        fontSize: 14,
        shadowColor: 'rgba(0,0,0, .1)', // IOS
        shadowOffset: { height: 3, width: 2 }, // IOS
        shadowOpacity: 3, // IOS
        shadowRadius: 1, //IOS
        elevation: 3, // android
        backgroundColor: 'white',
        borderRadius: 4
    },
    bottomitem: {
        flexDirection: "row",
        marginBottom: 5,
        marginTop: 10

    },
    bottomimage: {
        width: 30,
        height: 30,
        borderRadius: 40
    },
    bottomtext: {
        marginLeft: 10,
        marginBottom: 10,
        flex: 2
    },
    bottomtext1: {
        marginLeft: 5,
        fontSize: 12,
        color: "#ACACAC",
        fontWeight: "bold"
    },
    bottomtext2: {
        marginLeft: 5,
        fontSize: 16
    },
    circle: {
        width: 40,
        height: 40,
        borderRadius: 100/2,
        backgroundColor: '#eaaf7e'
    },
});
