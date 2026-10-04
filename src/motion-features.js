// Motion's animation, gesture, and layout features, loaded after hydration via <LazyMotion>.
// domMax (not domAnimation) because the floating nav pill uses a shared layoutId.
import { domMax } from 'motion/react';
export default domMax;
