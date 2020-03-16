import { NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';

export const NATIVE_FORWARD: NativeTransitionOptions = {
  direction: 'left', // 'left|right|up|down', default 'left' (which is like 'next')
  duration: 100,
  slowdownfactor: 3,
  slidePixels: 20,
  iosdelay: 100,
  androiddelay: 50,
  fixedPixelsTop: 0,
  fixedPixelsBottom: 0,
};
export const NATIVE_BACK: NativeTransitionOptions = Object.assign({ direction: 'right' }, NATIVE_FORWARD);
