import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
export const PAGE_WIDTH = width;
export const ITEM_WIDTH = 115;
export const ITEM_HEIGHT = 140;
export const centerOffset = PAGE_WIDTH / 2 - ITEM_WIDTH / 2;
export const TAPE_HEIGHT = 200;
export const DURATION_TAPE = 5 * 1000;
