import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import BusinessListCard from './BusinessListCard';

export default function ExploreBusinessList({ businessList }) {
  return (
    <FlatList
      data={businessList}
      renderItem={({ item, index }) => (
        <BusinessListCard
          key={index} // Note: Using index as key is not recommended if your data can change order. Use item.id if available.
          business={item}
        />
      )}
      keyExtractor={(item, index) => index.toString()} // Ensure each item has a unique key
      ListFooterComponent={<View style={{ height: 250 }} />}
    />
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1, // Ensure the container takes up the full screen height
    },
  });
