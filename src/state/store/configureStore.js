import prodStore from "./configureStore.prod";
import devStore from "./configureStore.dev";

const __PRODUCTION__ = false;

export default __PRODUCTION__ ? prodStore : devStore;