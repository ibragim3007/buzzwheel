import React from 'react';
import { BaseToast, BaseToastProps, ErrorToast, ToastConfig } from 'react-native-toast-message';
import { customTheme } from './theme/theme';

export const toastConfig: ToastConfig | undefined = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */

  success: (props: React.JSX.IntrinsicAttributes & BaseToastProps) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'pink' }}
      contentContainerStyle={{ paddingHorizontal: 20, borderRadius: 50 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400',
      }}
    />
  ),

  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props: any) => (
    <ErrorToast
      {...props}
      contentContainerStyle={{
        paddingHorizontal: 23,
        borderRadius: 50,
        backgroundColor: customTheme.background.error,
      }}
      style={{ borderRadius: 100, borderLeftWidth: 0, marginTop: 20 }}
      text1Style={{
        fontSize: 22,
        color: '#fff',
      }}
      text2Style={{
        fontSize: 15,
        color: customTheme.text.primary,
      }}
    />
  ),
};
