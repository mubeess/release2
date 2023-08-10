import Icon from '@safsims/components/Icon/Icon'
import Text from '@safsims/components/Text/Text'
import { lightTheme } from '@safsims/utils/Theme'
import React from 'react'
import { Image } from 'react-native'
import { StyleSheet, View } from 'react-native'

export default function TeachersCard({isLast}:{isLast?:boolean}) {
  return (
   <View style={[styles.container,{
    borderBottomWidth:isLast?0:1,
   }]}>
    <View style={styles.date}>
    <Image style={styles.image}  source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiEHB9CujXfJZ9x3Xu0_V7HMcypKdb42-JFoGyXTEbjw&s'}}/>
    <View>
    <Text h3>Mubarak Ibrahim</Text>
    <Text style={{color:lightTheme.colors.PrimaryGrey}}>English Language</Text>
    </View>
    </View>
   
   </View>
  )
}
const styles = StyleSheet.create({
    container:{
     height:65,
     width:'100%', 
     borderBottomColor:lightTheme.colors.PrimaryBorderColor,
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal:20
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
     height:25,
     width:25,
     borderRadius:25,
     marginRight:10
    }
})