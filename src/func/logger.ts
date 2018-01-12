import debug from '../config/debug';

export default (thing: any, ...things: any[]) => {
    if (debug.isDebug) {
        console.log(thing, ...things);
    }
};
