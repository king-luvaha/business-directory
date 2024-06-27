import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import Header from '../../components/Home/Header'
import Slider from '../../components/Home/Slider'
import Category from '../../components/Home/Category'
import PopularBusiness from '../../components/Home/PopularBusiness'

export default function home() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
        <Header />
      {/* Slider */}
        <Slider />
      {/* Category */}
        <Category />
      {/* Popular Business List */}
      <PopularBusiness/>

      <View style={{height:20}}></View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8', // Example background color
  },
})