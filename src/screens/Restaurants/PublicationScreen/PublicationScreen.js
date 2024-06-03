import { ScrollView, Text, Dimension, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "./PublicationScreen.styles";
import {
  doc,
  onSnapshot,
  collection,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { Carouselimg } from "../../../components/Shared";
import { Loading } from "../../../components/Shared";
import { db } from "../../../utils";
import { BtnFavorite } from "../../../components/Publication";
import { Header } from "../../../components/Publication";
import { BtnReviewForm } from "../../../components/Publication";
import { Reviews } from "../../../components/Publication";
import { Delete } from "../../../components/Publication";

const { width } = Dimensions.get("window");

export function PublicationScreen(props) {
  const { route } = props;
  const [publication, setPublication] = useState(null);

  useEffect(() => {
    setPublication(null);
    onSnapshot(doc(db, "publications", route.params.id), (doc) => {
      setPublication(doc.data());
    });
  }, [route.params.id]);

  if (!publication) return <Loading show text="Cargando publicaciones" />;
  return (
    <ScrollView style={styles.content}>
      <Carouselimg
        arrayImages={publication.images}
        height={250}
        width={width}
      />
      <Header publication={publication} />
      <BtnReviewForm idPublication={route.params.id} />
      <BtnFavorite idPublication={route.params.id} />
      <Reviews idPublication={route.params.id} />
    </ScrollView>
  );
}
