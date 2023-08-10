import Icon from '@safsims/components/Icon/Icon'
import { ArrowLeftIcon, StudentHeaderOverlay } from '@safsims/components/Images'
import Text from '@safsims/components/Text/Text'
import { lightTheme } from '@safsims/utils/Theme'
import React from 'react'
import { Image, ImageBackground, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native'

export default function StudentHeader() {
  return (
 <SafeAreaView style={{backgroundColor:lightTheme.colors.PrimaryColor}}>
<StatusBar translucent backgroundColor={lightTheme.colors.PrimaryColor} />
 <ImageBackground resizeMode='cover' source={require('../../../../assets/overlay.png')} style={styles.container}>
 <View style={styles.back}>
      <ArrowLeftIcon/>
    </View>
    <View style={styles.content}>
        <Text h2 style={{textAlign:'center',color:'#fff',marginBottom:5}}>Results</Text>
        <Text style={{textAlign:'center',color:'#fff'}}>Nur1 purple</Text>
    </View>
</ImageBackground>

<View style={styles.detailsContainer}>
<Image style={styles.image}  source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiEHB9CujXfJZ9x3Xu0_V7HMcypKdb42-JFoGyXTEbjw&s'}}/>

<View style={styles.buttons}>
 <View style={styles.button}>
    <Icon color={lightTheme.colors.PrimaryGrey} name='arrow-circle-left' size={30}/>
    <Text style={{ 
        ...styles.text,
        marginLeft:10,
        color:lightTheme.colors.PrimaryGrey
        }}>Previuos</Text>
 </View>

 <View style={styles.button}>
   
    <Text style={{
        ...styles.text,
        marginRight:10,
        color:lightTheme.colors.PrimaryColor
    }}>Next</Text>
    <Icon color={lightTheme.colors.PrimaryColor} name='arrow-circle-right' size={30}/>
 </View>
</View>

<View style={styles.name}>
    <Text h2>Mubarak Ibrahim</Text>
    <Text style={{color:lightTheme.colors.PrimaryGrey}}>CSC/MAU/0096</Text>
</View>
</View>
 </SafeAreaView>
 
  )
}

const styles = StyleSheet.create({
    container:{
   height:140,
   width:'100%',
   backgroundColor:lightTheme.colors.PrimaryColor,
   flexDirection:'row',
   justifyContent: 'center',
   alignItems: 'center',
   position: 'relative',
   
    },
   
    back:{
        height:40,
        width:40,
        borderRadius:40,
        backgroundColor:'#E6E9EC',
       marginLeft:20,
        justifyContent:'center',
        alignItems:'center',
        marginRight:'auto',
        position:'absolute',
        left:0
    
     
      },
      content:{
      
        // marginRight:'auto',
      },
      detailsContainer:{
        backgroundColor:'#fff'
      },
      image:{
        height:70,
        width:70,
        borderRadius:52,
        marginLeft:'auto',
        marginRight:'auto',
        transform:[{translateY:-25}],
        borderWidth:4,
        borderColor:'#fff',
      },
      buttons:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%',
        alignItems:'center',
        paddingHorizontal:20,
        transform:[{translateY:-25}],

      },
      button:{
        flexDirection:'row',
        alignItems:'center',
      },
      text:{
        fontSize:14,
        fontWeight:'400'
      },
      name:{
        justifyContent:'center',
        alignItems:'center',
        transform:[{translateY:-25}],
      }
})