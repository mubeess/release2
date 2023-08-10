import { useNavigation } from '@react-navigation/native'
import Text from '@safsims/components/Text/Text'
import { lightTheme } from '@safsims/utils/Theme'
import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'

export default function StudentListItem() {
    const navigate=useNavigation()
  return (
    <TouchableOpacity onPress={()=>navigate.navigate('ResultDetails')} style={styles.container}>
        <View style={styles.date}>
        <Image style={styles.image}  source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiEHB9CujXfJZ9x3Xu0_V7HMcypKdb42-JFoGyXTEbjw&s'}}/>
        <View>
        <Text h3>Mubarak Ibrahim</Text>
        <Text style={{color:lightTheme.colors.PrimaryGrey,marginTop:5}}>CSC/17D/4405</Text>
        </View>
        </View>
       
       </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
    container:{
        height:65,
        width:'100%', 
        borderBottomColor:lightTheme.colors.PrimaryBorderColor,
       flexDirection:'row',
       alignItems:'center',
       paddingHorizontal:10,
       borderBottomWidth:1,
       marginTop:20
       },
       date:{
         flexDirection:'row',
         alignItems:'center',
         width:'70%'
       },
       status:{
         width:70,
         height:26,
         backgroundColor:'#FBDEC8',
         borderRadius:5,
         flexDirection:'row',
         justifyContent:'center',
         alignItems:'center',
       },
       image:{
        height:32,
        width:32,
        borderRadius:35,
        marginRight:10
       }
})