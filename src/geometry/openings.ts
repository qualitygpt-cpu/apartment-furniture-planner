import type { Opening, Wall } from '../types/apartment';
import { wallLength } from './wall';
export const openingFitsWall = (o: Opening, w?: Wall) => !!w && o.positionFromStart + o.width <= wallLength(w);
