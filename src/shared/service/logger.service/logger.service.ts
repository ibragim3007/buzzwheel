import Toast, { ToastProps, ToastShowParams } from 'react-native-toast-message';

import { Logger, LoggerStrategy } from 'logger-service-ts';

class ConsoleLogger<TOptions> implements LoggerStrategy<TOptions> {
  log<TMessage>(message: TMessage, options?: TOptions) {
    if (typeof message === 'string') console.log(message, options || {});
  }

  error<TError>(e: TError, options?: TOptions) {
    if (e instanceof Error) console.error(e.message, options || {});
    if (typeof e === 'string') console.error(e);
  }

  success<TMessage>(message: TMessage, options?: TOptions) {
    if (typeof message === 'string') console.log(message, options || {});
  }
}

// class CatchError<TOptions> implements LoggerStrategy<TOptions> {
//   log<TMessage>(message: TMessage, options?: TOptions) {}

//   error<TError>(e: TError, options?: TOptions) {
//     if (e instanceof Error) {
//       void api.post(metricsApi.errorCatched);
//       console.error(e.message, options || {});
//     }
//     if (typeof e === 'string') {
//       void api.post(metricsApi.errorCatched);
//       console.error(e);
//     }
//   }

//   success<TMessage>(message: TMessage, options?: TOptions) {
//     if (typeof message === 'string') console.log(message, options || {});
//   }
// }

class ToastLogger<TOptions> implements LoggerStrategy<TOptions> {
  log<TMessage>(message: TMessage) {
    if (typeof message === 'string')
      Toast.show({
        text1: message,
        type: 'success',
      });
  }

  error<TError>(e: TError, options?: TOptions) {
    if (options) {
      Toast.show(options);
      return;
    }

    if (e instanceof Error)
      Toast.show({
        text1: e.message,
        type: 'error',
      });
    if (typeof e === 'string')
      Toast.show({
        text1: e,
        type: 'error',
      });
  }

  success<TMessage>(message: TMessage, options?: TOptions) {
    if (typeof message === 'string')
      Toast.show({
        text1: message,
        type: 'success',
      });
  }
}

export const Inform = new Logger<ToastShowParams>([new ToastLogger()]);
