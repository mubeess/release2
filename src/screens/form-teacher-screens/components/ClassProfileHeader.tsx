import Icon from '@safsims/components/Icon/Icon'
import { ArrowLeftIcon } from '@safsims/components/Images'
import SafeAreaComponent from '@safsims/components/SafeAreaComponent/SafeAreaComponent'
import Text from '@safsims/components/Text/Text'
import { lightTheme } from '@safsims/utils/Theme'
import React from 'react'
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native'

export default function ClassProfileHeader() {
  return (
   <View style={styles.container}>  
   
    <StatusBar backgroundColor="#fff" />
    <View style={styles.back}>
      <ArrowLeftIcon/>
    </View>
    <View style={styles.content}>
        <Text h2 style={{textAlign:'center'}}>Nur 1 Purple</Text>
        <Text style={{textAlign:'center'}}>Nur1</Text>
    </View>
   </View>
  )
}

const styles = StyleSheet.create({
  container:{
  height:110,
  width:'100%',
  backgroundColor:'#fff',
  flexDirection:'row',
  padding:20,
  justifyContent:'center',
  alignItems:'center',
  borderBottomWidth:1,
  borderBottomColor:lightTheme.colors.PrimaryBorderColor
 
  },
  back:{
    height:40,
    width:40,
    borderRadius:40,
    backgroundColor:'#E6E9EC',
    marginTop:40,
    justifyContent:'center',
    alignItems:'center',
    marginRight:'auto',
 
  },
  content:{
    marginTop:40,
    marginRight:'auto',
  }
})
