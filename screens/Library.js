import React,{useState} from 'react';
import {
    SafeAreaView,
    StatusBar,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
    ScrollView,
  
} from 'react-native'
import Tooltip from 'react-native-walkthrough-tooltip'
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'


const Library = () => {
    const [toolTipVisible, setToolTipVisible] = useState(false);
        const [searchText, setSearchText] = useState("")
    
        const toggletooltipVisible = () => {
          setToolTipVisible(!toolTipVisible)
          console.log("Tooltip visible: "+ toolTipVisible)
        }
    return (
         <View>
            <Text>My Library</Text>
         </View>
    )
}

export default Library