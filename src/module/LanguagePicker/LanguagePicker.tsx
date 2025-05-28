import ModalDarkWrap from '@/src/entities/Modal/ui/ModalDarkWrap';
import { languages } from '@/src/shared/config/constants/languages/availableLanguages';
import { useLang } from '@/src/shared/hooks/lang/useLangStore';
import { useTheme } from '@/src/shared/hooks/useTheme';
import SettingItem from '@/src/shared/ui/elements/SettingsItem';
import Grid, { GridPressable } from '@/src/shared/ui/grid/Grid';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Modal, Pressable } from 'react-native';
import LanguageItem from './LanguageItem';
import Paper from '@/src/shared/ui/layout/Paper';
import { useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import Typography from '@/src/shared/ui/typography/Typography';

export default function LanguagePicker() {
  const colors = useTheme();
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const toggleModal = () => {
    setOpen(!open);
  };

  const onSetLanguage = (code: string) => {
    setLang(code);
  };

  const currentLanguage = languages.find(a => a.code === lang);

  return (
    <Grid>
      <SettingItem
        onPress={toggleModal}
        rightPrefix={currentLanguage?.flag}
        leftIcon={<FontAwesome name="language" size={24} color={colors.text.white} />}
        title="Language"
      />
      <Modal transparent onRequestClose={toggleModal} visible={open}>
        <ModalDarkWrap onClose={toggleModal}>
          <Pressable>
            <Paper space="md">
              <Grid width="100%" row justfity="center" align="center">
                <Typography weight="bold" variant="headline">
                  Language
                </Typography>
              </Grid>
              <GridPressable hitSlop={20} onPress={toggleModal} style={{ position: 'absolute', right: 0, top: -33 }}>
                <AntDesign name="close" size={20} color={colors.text.primary} />
              </GridPressable>

              <Grid space="md">
                {languages.map(language => (
                  <LanguageItem
                    picked={language.code === lang}
                    key={language.code}
                    item={language}
                    onSetLanguage={onSetLanguage}
                  />
                ))}
              </Grid>
            </Paper>
          </Pressable>
        </ModalDarkWrap>
      </Modal>
    </Grid>
  );
}
