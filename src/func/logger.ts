import debug from '../config/debug';

export default (where: string, ...things: any[]) => {
    if (debug.isDebug) {
        console.log(`[${where}] `, ...things);
    }
};
