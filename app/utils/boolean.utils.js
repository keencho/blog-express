export default {
    isTrue: (bool) => {
        if (bool === 'true' || bool === 'True' || bool === true) {
            return true;
        } else {
            return false;
        }
    }
};
