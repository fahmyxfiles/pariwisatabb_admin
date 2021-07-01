import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export function getImageByType(images, type) {
  const image = images.filter(x => x.type === type)
  if (image) {
    if (image.length == 1) {
      return image[0]
    }
    return image
  }
  return null
}
export function toastErrorMsg(errMsg) {
  if (typeof errMsg === 'object' && errMsg !== null) {
    const keys = Object.keys(errMsg)
    // iterate over object
    keys.forEach((key, index) => {
      const errArray = errMsg[key]
      errArray.forEach(_text => {
        this.$toast(
          {
            component: ToastificationContent,
            props: {
              title: 'Error',
              icon: 'AlertCircleIcon',
              text: _text,
              variant: 'danger',
            },
          },
          {
            position: 'top-center',
            timeout: 6000,
          },
        )
      })
    })
  } else {
    this.$toast(
      {
        component: ToastificationContent,
        props: {
          title: 'Error',
          icon: 'AlertCircleIcon',
          text: errMsg,
          variant: 'danger',
        },
      },
      {
        position: 'top-center',
        timeout: 6000,
      },
    )
  }
}
export function createGoogleMap(center, _ref) {
  const center_lat = parseFloat(center.split(',')[0])
  const center_lng = parseFloat(center.split(',')[1])
  const center_zoom = parseFloat(center.split(',')[2])
  return new window.google.maps.Map(_ref, {
    center: { lat: center_lat, lng: center_lng },
    zoom: center_zoom,
  })
}
export function createGoogleMapMarker(coordinate, _map) {
  const coord_lat = parseFloat(coordinate.split(',')[0])
  const coord_lng = parseFloat(coordinate.split(',')[1])
  return new window.google.maps.Marker({
    position: { lat: coord_lat, lng: coord_lng },
    map: _map,
  })
}
