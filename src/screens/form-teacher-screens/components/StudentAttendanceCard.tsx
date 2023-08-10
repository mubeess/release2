import Button from '@safsims/components/Button/Button'
import Text from '@safsims/components/Text/Text'
import { lightTheme } from '@safsims/utils/Theme'
import React, { useState } from 'react'
import { Image, StyleSheet, View } from 'react-native'

export default function StudentAttendanceCard() {
  const [active,setActive] =useState(0)
  const handleActive =(next)=>{
    setActive(next)
}
  return (
   <View style={styles.container}>
     <View style={styles.teacher}>
        <Image style={styles.image}  source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiEHB9CujXfJZ9x3Xu0_V7HMcypKdb42-JFoGyXTEbjw&s'}}/>
        <View>
          <Text h3>Mubarak Ibrahim</Text>
          <Text style={{color:lightTheme.colors.PrimaryGrey}}>sample@mail.com</Text>
        </View>
      </View>

      <View style={styles.divider}/>
      <View style={styles.actions}>
        <Button 
        onPress={()=>handleActive(0)}
        fontStyle={{color:active==0?'#fff':lightTheme.colors.PrimaryGrey}}
        style={{
          ...styles.button,
          backgroundColor: active==0?lightTheme.colors.PrimaryGreen:lightTheme.colors.PrimaryFade,
    
        }} label='Present'/>
        <Button 
          onPress={()=>handleActive(1)}
        fontStyle={{color:active==1?'#fff':lightTheme.colors.PrimaryGrey}}
        style={{
          ...styles.button,
          backgroundColor: active==1?lightTheme.colors.PrimaryGreen:lightTheme.colors.PrimaryFade,
        
        }} label='Late'/>
        <Button 
          onPress={()=>handleActive(2)}
        fontStyle={{color:active==2?'#fff':lightTheme.colors.PrimaryGrey}}
        style={{
          ...styles.button,
          backgroundColor: active==2?lightTheme.colors.PrimaryGreen:lightTheme.colors.PrimaryFade,
        
        }} label='Absent'/>
      </View>
   </View>
  )
}

const styles = StyleSheet.create({
    container:{
    height:140,
    width:'100%',
    borderWidth:1,
    borderColor:lightTheme.colors.PrimaryBorderColor,
    borderRadius:10,
    marginTop:20,
    padding:10,
    },
    teacher:{
        flexDirection:'row',
        width:'100%',
        height:50,
        backgroundColor:'#fff',
       
        alignItems:'center',
        borderBottomLeftRadius:5,
        borderBottomRightRadius:5
      },
      image:{
        height:40,
        width:40,
        borderRadius:40,
        marginRight:10
      },
      divider:{
        height:1,
        width:'100%',
        backgroundColor:lightTheme.colors.PrimaryBorderColor,
        marginVertical:10
      },
      actions:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
      },
      button:{
        width:'30%',
        borderRadius:20,
        borderWidth:1,
        borderStyle:'dashed',
        borderColor:lightTheme.colors.PrimaryBorderColor
      }
})