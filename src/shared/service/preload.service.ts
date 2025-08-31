import { Image } from 'expo-image';

export const preloadImages = async (imagesUrls: string[]) => {
  await Promise.all(
    imagesUrls.map(img =>
      Image.prefetch(img, {
        cachePolicy: 'memory-disk',
      }),
    ),
  );
};
