import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, FlatList, Image } from "react-native";
import yelp from "../api/yelp";

const ResultsShowScreen = ({ navigation }) => {
  const id = navigation.getParam("id");
  const [results, setResults] = useState(null);

  console.log(results);

  const getResult = async (id) => {
    const response = await yelp.get(`/${id}`);
    setResults(response.data);
  };

  useEffect(() => {
    getResult(id);
  }, []);

  if (!results) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{results.name}</Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={results.photos}
        keyExtractor={(photo) => photo}
        renderItem={({ item }) => {
          return <Image style={styles.image} source={{ uri: item }} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  name: {
    fontSize: 25,
    fontWeight: "bold",
  },
  image: {
    width: 200,
    height: 300,
    marginBottom: 10,
  },
});

export default ResultsShowScreen;
