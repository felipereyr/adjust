import React, { useState } from "react";
import { styles } from "./PublicationsScreen.styles";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../../utils/firebase";
import { useEffect } from "react";
import { LoadingModal } from "../../../components/Shared";
import { ListPublications } from "../../../components/Restaurants";
import { View, Image } from "react-native";
import { Text } from "react-native-elements";
import { Loading } from "../../../components/Shared";
import { FixedOffsetZone } from "luxon";

export function PublicationsScreen(props) {
  const [publications, setPublications] = useState(null);
  const [_, setReload] = useState(false);
  const onReload = () => setReload((prevState) => !prevState);

  useEffect(() => {
    const q = query(
      collection(db, "publications"),
      orderBy("createdAt", "desc")
    );

    onSnapshot(q, (snapshot) => {
      setPublications(snapshot.docs);
    });
  }, []);

  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <View
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <View style={{ padding: 20 }}>
          <Image source={require("../../../../assets/img/LogoL.png")} />
        </View>
      </View>
      {!publications ? (
        <LoadingModal show text="Cargando" />
      ) : (
        <ListPublications publications={publications} onReload={onReload} />
      )}
    </View>
  );
}