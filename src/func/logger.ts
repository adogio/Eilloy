import debug from '../config/debug';

export default (where: string, thing: any, ...things: any[]) => {
    if (debug.isDebug) {
        console.log(`[${where}] `, thing, ...things);
    }
};
