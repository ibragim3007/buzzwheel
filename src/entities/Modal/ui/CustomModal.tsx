// src/components/CustomModal.tsx
import { useTheme } from "@/src/shared/hooks/useTheme";
import Grid from "@/src/shared/ui/grid/Grid";
import Typography from "@/src/shared/ui/typography/Typography";
import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";
import { Modal, Pressable, StyleSheet, TouchableOpacity } from "react-native";
import { useModalStore } from "../useModalStore";
import ModalDarkWrap from "./ModalDarkWrap";

const CustomModal: React.FC = () => {
  const { isVisible, modalContent, closeModal } = useModalStore();
  const colors = useTheme();

  const onClose = () => {
    if (modalContent?.callbackOnClose) {
      modalContent.callbackOnClose();
    }
    closeModal();
  };

  return (
    <Modal visible={isVisible} onRequestClose={onClose} transparent>
      <ModalDarkWrap onClose={onClose}>
        <Pressable>
          <Grid
            padding={20}
            space="sm"
            style={{
              backgroundColor: colors.background.primary,
              borderRadius: 25,
              alignItems: "center",
            }}
          >
            <Grid row align="center">
              {modalContent?.title && (
                <Typography weight="bold" variant="headline">
                  {modalContent?.title}
                </Typography>
              )}

              <AntDesign
                name="close"
                onPress={onClose}
                size={24}
                color={colors.text.primary}
                style={{ position: "absolute", right: -50 }}
              />
            </Grid>
            {modalContent?.description && (
              <Typography style={styles.description}>
                {modalContent?.description}
              </Typography>
            )}
            {modalContent?.node && modalContent.node}
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Typography weight="bold" style={styles.buttonText}>
                {modalContent?.buttonText || "Close"}
              </Typography>
            </TouchableOpacity>
          </Grid>
        </Pressable>
      </ModalDarkWrap>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    // backgroundColor: "white",
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
  },

  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#FF69B4",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default CustomModal;
