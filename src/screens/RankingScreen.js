import React, { useState, useEffect } from "react";
import { ScrollView, View, Image, Text } from "react-native";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { map } from "lodash";
import { db } from "../utils";
import { PublicationRanking } from "../components/Restaurants";

export function RankingScreen() {
  const [publications, setPublications] = useState(null);

  useEffect(() => {
    const q = query(
      collection(db, "publications"),
      orderBy("ratingMedia", "desc"),
      limit(3)
    );

    onSnapshot(q, (snapshot) => {
      setPublications(snapshot.docs);
    });
  });

  return (
    <ScrollView style={{ backgroundColor: "white", height: "100%" }}>
      <View
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <View style={{ padding: 20 }}>
          <Image source={require("../../assets/img/LogoL.png")} />
        </View>
      </View>
      <Text
        style={{
          fontSize: 25,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        Ranking
      </Text>
      {map(publications, (publication, index) => (
        <PublicationRanking
          key={index}
          index={index}
          publication={publication.data()}
        />
      ))}
    </ScrollView>
  );
}
