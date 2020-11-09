export default {
    hasText: (str) => {
        if(typeof str == "undefined" || str == null || str == "" || str == "null")
            return false;
        else
            return true;
    }
}
