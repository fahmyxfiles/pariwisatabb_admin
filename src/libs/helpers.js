export function getImageByType(images, type) {
    var image = images.filter((x) => x.type === type);
    if (image) {
        if(image.length == 1){
        return image[0];
        }
        return image;
    }
    return null;
};
export function toastErrorMsg(errMsg) {
    if (typeof errMsg === "object" && errMsg !== null) {
        const keys = Object.keys(errMsg);
        // iterate over object
        keys.forEach((key, index) => {
        var errArray = errMsg[key];
        errArray.forEach((_text) => {
            this.$toast(
            {
                component: ToastificationContent,
                props: {
                title: "Error",
                icon: "AlertCircleIcon",
                text: _text,
                variant: "danger",
                },
            },
            {
                position: "top-center",
                timeout: 6000,
            }
            );
        });
        });
    } else {
        this.$toast(
        {
            component: ToastificationContent,
            props: {
            title: "Error",
            icon: "AlertCircleIcon",
            text: errMsg,
            variant: "danger",
            },
        },
        {
            position: "top-center",
            timeout: 6000,
        }
        );
    }
};