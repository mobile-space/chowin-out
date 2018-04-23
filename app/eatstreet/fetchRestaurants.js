this.apiInfo = {
  API_URL: 'https://api.eatstreet.com',
  RES_SEARCH_URL: '/publicapi/v1/restaurant/search',
  RES_URL: '/publicapi/v1/restaurant/',
  API_KEY: 'ba2d3e545f0d2bd1',
  method: 'both',
  search: 'vegan',
  streetAddress: 'san francisco',
  pickupRadius: '5',
}


export default _fetchRestaurants = async (latitude, longitude) => {
  let return_this_data = null

  const { API_KEY, RES_SEARCH_URL, API_URL, method, search, streetAddress, pickupRadius } = this.apiInfo

  await fetch(`${API_URL}${RES_SEARCH_URL}?method=${method}&search=${search}&longitude=${longitude}&latitude=${latitude}&pickup-radius=${pickupRadius}`, {
    method: 'GET',
    headers: {
      'X-Access-Token': `${API_KEY}`,
    }
  })
    .then(response => response.json())
    .then(data => {
      const { restaurants } = { ...data }
      
      let restApiKeyList = []

      for (let { apiKey: restApiKey } of restaurants) {
        restApiKeyList.push(restApiKey)
      }

      // console.log('RES-JSON-restApiKeyList:', restApiKeyList)

      return restApiKeyList
    }).then(list => {
      // console.log('REST-LIST:', list)

      return this._fetchMenuItems(list)
        .then( data => {
          
          return_this_data = data
        })
        .catch(error => {
          console.log(error)
        })
    })
    .catch(error => {
      console.log("Server is down " + error);
    })

    return return_this_data
}

_fetchMenuItems = async (restaurantsList) => {
  const { API_KEY, RES_URL, API_URL } = this.apiInfo
  let restMenuItemsList = []

  for (let resApiKey of restaurantsList) {
    await fetch(`${API_URL}${RES_URL}${resApiKey}/menu`, {
      method: 'GET',
      headers: {
        'X-Access-Token': `${API_KEY}`,
      }
    })
      .then(response => {
        return response.json()
      })
      .then(data => {
        return restMenuItemsList.push(data)
      })
      .catch(error => {
        console.log("Server request failed " + error);
      })
  }
  // console.log("restMenuItemsList", restMenuItemsList)
  const food_name_list = this._parseMenuList(restMenuItemsList)

  return food_name_list
}

_parseMenuList = (restMenuItemsList) => {
  console.log("restMenuItemsList", restMenuItemsList)

  let list = []

  for (let i = 0; i < restMenuItemsList.length; i++) {
    // console.log("ARRAY-LENGTH", restMenuItemsList[i].length)
    for (let j = 0; j < restMenuItemsList[i].length; j++) {

      let itemList = restMenuItemsList[i][j].items
        for (let { name: itemName } of itemList) {
          list.push(itemName)
          break
        }

    }
  }
  console.log("FoodNameList", list)  
  return list;
}