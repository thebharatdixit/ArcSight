import { getSpecialFoodTypes, getHomePageData, getFetchBannerUrl } from '../service/apiService'



export const getSpecialFoodType = (dispatch, data) => {
    return getSpecialFoodTypes(dispatch, data).then(function (response) {
          console.log("RESPONSE for getSpecialFoodTypes: ", JSON.stringify(response));
        return response;
    }, function (err) {
        console.log(' error', err)
    }).catch(function (err) {
        console.log('catch error', err)
    });
}

export const getHomeData = (dispatch, data) => {
    return getHomePageData(dispatch, data).then(function (response) {
        console.log("RESPONSE for getHomePageData: ", JSON.stringify(response));
        return response;
    }, function (err) {
        console.log(' error', err)
    }).catch(function (err) {
        console.log('catch error', err)
    });
}

export const fetchBannerUrl = () => {
    // dispatch(showLoader(true));
    return getFetchBannerUrl().then(function (response) {
        console.log("RESPONSE getFetchBannerUrl: ", JSON.stringify(response));
        // dispatch(showLoader(false));
        return response;
    }, function (err) {
        console.log(' error', err)
    }).catch(function (err) {
        console.log('catch error', err)
    });
}

