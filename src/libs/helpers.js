import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export function getImageByType(images, type) {
  const image = images.filter(x => x.type === type && x.hotel_room_id == null)
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
export function createGoogleMap(coordinate, center, _map, thisMap){
  var map_coordinate = coordinate;
  var map_center = center;
  var coord_lat = parseFloat(map_coordinate.split(",")[0])
  var coord_lng = parseFloat(map_coordinate.split(",")[1])
  var center_lat = parseFloat(map_center.split(",")[0])
  var center_lng = parseFloat(map_center.split(",")[1])
  var center_zoom = parseFloat(map_center.split(",")[2])
  thisMap = new window.google.maps.Map(map, {
    center: { lat: center_lat, lng: center_lng },
    zoom: center_zoom,      
  });
  new window.google.maps.Marker({
    position: { lat: coord_lat, lng: coord_lng },
    map: thisMap,
  })
}