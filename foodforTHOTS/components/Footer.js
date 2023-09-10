import { Button, View, StyleSheet, Pressable, Text, TouchableOpacity } from "react-native";




export default function Footer(props) {



    return(
        <View style={styles.container}>
            <TouchableOpacity
            onPress = {props.onPress}
            title="Make an Event"
            style = {styles.button}
            
            >
                <Text style={{color: "white", fontSize: 20}}>Create an Event</Text>
            </TouchableOpacity>

        </View>

    );

}


const styles = StyleSheet.create(
    {
        container: {
            height:"10%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white"
        },
        button: {
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 10,
            paddingHorizontal: 5,
            backgroundColor: "blue",
            color: "white",
            width: "50%",
            borderRadius: 30,

        },
    }
);