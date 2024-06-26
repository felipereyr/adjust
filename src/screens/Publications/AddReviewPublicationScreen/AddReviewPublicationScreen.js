import React from "react";
import { View } from "react-native";
import { AirbnbRating, Input, Button } from "react-native-elements";
import { useFormik } from "formik";
import Toast from "react-native-toast-message";
import { v4 as uuidv4 } from "uuid";
import { getAuth } from "firebase/auth";
import {
  doc,
  setDoc,
  query,
  collection,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { map, mean } from "lodash";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../../utils";
import {
  initialValues,
  validationSchema,
} from "./AddReviewPublicationScreen.data";
import { styles } from "./AddReviewPublicationScreen.styles";

export function AddReviewPublicationScreen(props) {
  const { route } = props;
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const auth = getAuth();
        const idDoc = uuidv4();
        const newData = formValue;
        newData.id = idDoc;
        newData.idPublication = route.params.idPublication;
        newData.idUser = auth.currentUser.uid;
        newData.avatar = auth.currentUser.photoURL;
        newData.createdAt = new Date();

        await setDoc(doc(db, "reviews", idDoc), newData);
        await updatePublication();
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error al enviar la review",
        });
      }
    },
  });

  const updatePublication = async () => {
    try {
      const q = query(
        collection(db, "reviews"),
        where("idPublication", "==", route.params.idPublication)
      );

      const snapshot = await getDocs(q);
      const reviews = snapshot.docs;
      const arrayStars = map(reviews, (review) => review.data().rating);
      const media = mean(arrayStars);

      const publicationRef = doc(
        db,
        "publications",
        route.params.idPublication
      );

      await updateDoc(publicationRef, {
        ratingMedia: media,
      });

      navigation.goBack();
    } catch (error) {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Error al actualizar la publicación",
      });
    }
  };

  return (
    <View style={styles.content}>
      <View>
        <View style={styles.ratingContent}>
          <AirbnbRating
            count={5}
            reviews={[
              "Pésimo",
              "Deficiente",
              "Normal",
              "Muy bueno",
              "Excelente",
            ]}
            defaultRating={formik.values.rating}
            size={35}
            onFinishRating={(rating) => formik.setFieldValue("rating", rating)}
          />
        </View>

        <View>
          <Input
            placeholder="Título"
            onChangeText={(text) => formik.setFieldValue("title", text)}
            errorMessage={formik.errors.title}
          />
          <Input
            placeholder="Comentario"
            multiline
            inputContainerStyle={styles.comment}
            onChangeText={(text) => formik.setFieldValue("comment", text)}
            errorMessage={formik.errors.comment}
          />
        </View>
      </View>

      <Button
        title="Enviar review"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
}