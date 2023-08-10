import Text from '@safsims/components/Text/Text'
import { lightTheme } from '@safsims/utils/Theme'
import React from 'react'
import { StyleSheet, View } from 'react-native'

export default function SubjectCard() {
    const colors=[{
        bg:'#CAF5E6',
        font:'#03B2CB'
    },
    {
        bg:'#FBEFCA',
        font:'#F2C02E'
    }
]
    const tags=['language','core']
  return (
   <View style={styles.container}>
    <View style={styles.subject}>
        <Text h2 style={{color:lightTheme.colors.PrimaryColor,fontWeight:'500'}}>English Language</Text>
        <Text style={{color:lightTheme.colors.PrimaryGrey}}>Eng 101</Text>
        <View style={styles.tags}>
        {
    tags.map((tag,index) =>(
        <View key={tag} style={[styles.tag,{
            backgroundColor:colors[index].bg
        }]}>
            <Text h3 style={{
                fontWeight:'500',
                textTransform:'uppercase',
                fontSize:10,
                color:colors[index].font,
                
            }}>{tag}</Text>
        </View>
    ))
        }
        </View>

        
    </View>
   <View style={styles.names}>
   <Text style={{fontSize:12}} h3>Alameen Ak, Mubarak ibrahim, Alameen ibrahim</Text>
   <Text>Subject teachers</Text>
   </View>
   </View>
  )
}
const styles = StyleSheet.create({
    container:{
   height:170,
   borderWidth:1,
   borderColor:lightTheme.colors.PrimaryBorderColor,
   borderRadius:10,
   marginTop:20,
    },
    subject:{
        height:110,
        backgroundColor:lightTheme.colors.PrimaryFade,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        padding:10
    },
    tags:{
     flexDirection:'row',
     marginTop:10
    },
    tag:{
        minWidth:40,
        padding:10,
        justifyContent:'center',
        alignItems: 'center',
        marginRight:10,
    
        borderRadius:30,
    },
    names:{
        padding:10,
        
    }
})