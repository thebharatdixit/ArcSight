import React, { useEffect, useState } from 'react';

import {
    View, Text, TouchableOpacity, StyleSheet,
    ScrollView,
    ImageBackground,
    Image,
    StatusBar,
    ActivityIndicator,
    Modal,
    Dimensions,
    TextInput,
    ToastAndroid,
    FlatList,
    Share,
    Alert,
    TouchableWithoutFeedback,
    KeyboardAvoidingView
} from 'react-native';
import SelectMultiple from 'react-native-select-multiple';
import { useIsFocused } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen'
// import {Picker} from '@react-native-community/picker';
import { connect } from 'react-redux';
import { Button, Icon, Item, Input, CheckBox, ListItem, Body, Picker } from 'native-base';
//import CustomMultiPicker from "react-native-multiple-select-list";
import { getDimen } from '../../../dimensions/dimen';
// import ImagePicker from 'react-native-image-crop-picker';
import ImagePicker from 'react-native-image-picker';

// import ImagePicker from 'react-native-image-picker';
import { storeData, getData } from '../../../utils/asyncStore';
import { createList } from '../../../actions/createListAction';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { fetchAminities } from '../../../actions/addListingActions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


function EditPropertyScreen({ navigation, route }) {

    const { listingData } = route.params ? route.params : ""

    const [filePath, setFilePath] = React.useState('')
    const [picture, setPicture] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [city, setCity] = React.useState('');
    const [stateName, setStateName] = React.useState('');
    const [zipcode, setZipcode] = React.useState('');
    const [location2, setLocation2] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [bedroom, setBedroom] = React.useState('');
    const [bath, setBath] = React.useState('');
    const [bathroom, setBathroom] = React.useState('');
    const [terrace, setTerrace] = React.useState(0);
    const [homeType, setHomeType] = React.useState('');
    const [squreFeet, setSqureFeet] = React.useState('');
    const [pricePerSqureFeet, setPricePerSqureFeet] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [isFeatured, setIsFeatured] = React.useState('');

    const [taxes, setTaxes] = React.useState('');
    const [amenities, setAmenities] = React.useState('');
    const [yearBuilt, setYearBuilt] = React.useState('');
    const [imageUrl, setImageUrl] = React.useState('');
    const [videoUrl, setVideoUrl] = React.useState('');
    const [selectedValue, setSelectedValue] = React.useState("House");
    const [tokens, setTokens] = React.useState('');
    const [imgs, setImgs] = React.useState('');
    const [imgList, setImgList] = React.useState([]);
    const [selectdItems, setSelectedItems] = React.useState([]);
    const [aminitiesList, setAminitiesList] = React.useState([]);
    const [selected, setSelected] = React.useState('');
    const [homeTypes, setHomeTypes] = React.useState('');
    const [selected2, setSelected2] = React.useState('');
    const [listingType, setListingType] = React.useState('');
    const [arrSelectedAminities, setArrSelectedAminities] = React.useState([]);
    const [arrSelectedAminitiesForApi, setArrSelectedAminitiesForApi] = React.useState([]);
    const [counter, setCounter] = React.useState(0);
    const [locationNeighbourhood, setLocationNeighbourhood] = React.useState("");

    const [imgSourceArr, setImgSourceArr] = React.useState([]);
    const [arrImages, setArrImages] = React.useState([]);
    const [dupArrImages, setDupArrImages] = React.useState([]);
    const [mainImage, setMainImage] = React.useState('');
    const [mainImageData, setMainImageData] = React.useState('');
    const [showGoogleView, setGoogleView] = React.useState(false)
    const [showLoader, setShowLoader] = React.useState('hide');
    const [location, setLocation] = React.useState('');
    const [latitude, setLatitude] = React.useState('');
    const [longnitude, setLongnitude] = React.useState('');
    const [checked, setChecked] = React.useState(false);

    const [listImagesData, setListImagesData] = React.useState([]);

    const isFocused = useIsFocused();
    let temp = '';

    const userList = {
        "123": "Tom",
        "124": "Michael",
        "125": "Christin"
    }


    let imageUrls = {
        "imgUrl": ''
    }

    getData('userData').then((data) => {
        const userData = JSON.parse(data);
        const listTokens = userData.token;
        setTokens(listTokens);
        // console.log('token1', listTokens)
        // const tokens = userData.token;
        // setAccessToken(tokens)
        // console.log('userDataPrachi:', userData)
        // console.log('UserAccessToken67777Prachi:', 'Bearer ' + accessToken )
    })
    //const tokens = datas.token;
    const updateProperty = () => {


        var fileName = "";
        if (!(mainImage === "")) {
            fileName = GetFilename(mainImage);
        }
        if (!(mainImage === "")) {
            console.log('fileName:::: ' + fileName);
            const formData = new FormData();

            formData.append('listing_id', listingData.id);
            formData.append('home_type', homeType);
            formData.append('sq_feet', squreFeet);
            formData.append('bedrooms', bedroom);
            formData.append('bathrooms', bath);
            formData.append('terrace', terrace);
            formData.append('listing_type', listingType);
            formData.append('state', stateName);
            formData.append('city', city);
            formData.append('zipcode', zipcode);
            formData.append('location', address);
            formData.append('year_built', yearBuilt);
            formData.append('price_per_sq_feet', pricePerSqureFeet);
            formData.append('price', price);
            formData.append('taxes', taxes);
            formData.append('latitude', latitude);
            formData.append('longitude', longnitude);
            formData.append('video_url', videoUrl);
            formData.append('web_share_url', imageUrl);
            formData.append('location_neighbourhood', locationNeighbourhood);
            // console.log("location_neighbourhood:: " + filenamess);
            formData.append('amenities', JSON.stringify(arrSelectedAminitiesForApi));
            // formData.append('amenities[]', 2);
            formData.append('description', description);
            formData.append('is_featured', 'yes');
            var fileName = mainImageData.fileName;
            var filetype = mainImageData.type;
            if (fileName) {

            }
            else {
                var filenamess = mainImage.replace(/^.*[\\\/]/, '');
                console.log("filenamess:: " + filenamess);
                fileName = filenamess;
                filetype = "image/jpeg";
            }
            formData.append('main_image',
                {
                    uri: mainImage,
                    name: fileName,
                    type: filetype
                });
            // formData.append('main_image', mainImage, fileName);
            var selImgArray = arrImages;
            selImgArray.splice(selImgArray.length - 1, selImgArray.length - 1);
            console.log("selImgArray::: " + JSON.stringify(selImgArray));
            selImgArray.forEach((element, i) => {
                const newFile = element;
                if (element.name) {
                    formData.append('listing_images[]', newFile)
                }
                else {
                    var filenamess = element.uri.replace(/^.*[\\\/]/, '');
                    console.log("elementuri:: " + filenamess);
                    formData.append('listing_images[]',
                        {
                            uri: element.uri,
                            name: filenamess,
                            type: "image/jpeg"
                        });
                }
                // formData.append('listing_images[]', newFile)
            });
            // formData.append('listing_images[]', arrImages);


            console.log('formdata ::' + JSON.stringify(formData) + 'tokennn :' + tokens);
            setShowLoader('')
            fetch("http://arc.softwaresolutions.website/api/v1/create-listing", {
                method: "post",
                headers: {
                    Accept: "application/json",
                    // 'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${tokens}`,
                },
                body: formData,
            }).then(res => res.json())
                .then(res => {
                    setShowLoader('hide')
                    console.log('listLog edit', res.message);
                    // Alert.alert('' + res.message, [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
                    alert(res.message);
                    // if (res.message === 'Listing has been added successfully') {
                    navigation.goBack();
                    // }
                    // Alert.alert('' + res.message, [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });



                })
                .catch(err => {
                    setShowLoader('hide')
                    console.error("error uploading images: ", err);
                });
        }



    }

    React.useEffect(() => {
        console.log('listingData::: ' + JSON.stringify(listingData));
        console.log('listingDatabathrooms::: ' + listingData.bathrooms);
        setShowLoader("");
        if (listingData && listingData.location) {
            getData('userData').then((data) => {
                const userData = JSON.parse(data);
                const listTokens = userData.token;
                console.log('listingDataObjectDetails' + JSON.stringify(listingData));
                searchListingDetailApiIntegration(listTokens, listingData.id)
            })
        }

    }, [listingData])


    const loadData = (DataToLoad) => {
        setAddress(listingData.location);
        setStateName(listingData.state);
        setCity(listingData.city);
        setZipcode(listingData.zipcode);
        setLocation(listingData.location);
        setPrice("" + listingData.price_per_sq_feet);
        setPricePerSqureFeet("" + listingData.price_per_sq_feet);
        setBedroom("" + listingData.bedrooms);
        console.log("setBathrooom " + listingData.bathrooms);
        setBath("" + listingData.bathrooms);
        setBathroom("" + listingData.bathrooms);
        setImageUrl(listingData.web_share_url);
        setVideoUrl(listingData.video_url);
        setHomeType(listingData.home_type);
        if (listingData.home_type === 'House') {
            setSelected("key0");
            // setListingType("For Sale");
        }
        else if (listingData.home_type === 'Co-op') {
            setSelected("key1");
        }
        else if (listingData.home_type === 'Condo') {
            setSelected("key2");
        }
        else if (listingData.home_type === 'Townhouse') {
            setSelected("key3");
        }
        else if (listingData.home_type === 'Multi-Family') {
            setSelected("key4");
        }
        else if (listingData.home_type === 'Land') {
            setSelected("key5");
        }
        else {
            setSelected("key6");
        }


        setSqureFeet("" + listingData.sq_feet);
        console.log("setIsFeaturedsetIsFeatured " + listingData.is_featured);
        setIsFeatured(listingData.is_featured);
        if (listingData.is_featured === 'yes') {
            setChecked(true)
        }
        else {
            setChecked(false);
        }
        setTerrace("" + listingData.terrace);
        setListingType(listingData.listing_type);
        if (listingData.listing_type === 'For Sale') {
            setSelected2("key0");
            // setListingType("For Sale");
        }
        else {
            setSelected2("key1");
        }
        setDescription(listingData.description);
        setCounter(counter + 1);
        setLatitude(listingData.latitude);
        setLongnitude(listingData.longitude);
        setLocationNeighbourhood(listingData.location_neighbourhood);
        console.log("location_neighbourhood:: " + listingData.location_neighbourhood);
        setArrSelectedAminities([]);
        setYearBuilt("" + listingData.year_built);
        setMainImage(listingData.main_image_url);

        getAminities();
    }



    // React.useEffect(() => {
    //     console.log("vxmsvjmasgja");
    //     setTimeout(() => {
    //         console.log('listingDataObjectDetailsx' + JSON.stringify(listingDataObject));
    //         if (listingDataObject && listingDataObject.location) {
    //             getData('userData').then((data) => {
    //                 const userData = JSON.parse(data);
    //                 const listTokens = userData.token;
    //                 console.log('listingDataObjectDetails' + JSON.stringify(listingDataObject));
    //                 if (listingDataObject) {
    //                     searchListingDetailApiIntegration(accessToken, listingDataObject.id)
    //                 }
    //             })
    //         }
    //     }, 5000);


    // }, [listingDataObject])

    const searchListingDetailApiIntegration = (accessToken, listing_id) => {
        setShowLoader("");
        fetch("http://arc.softwaresolutions.website/api/v1/listing/detail", {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                "listing_id": listing_id
            })
        }).then(res => res.json())
            .then(res => {
                setShowLoader('hide')
                if (res.status) {

                    console.log('Edit Property Listing Details' + JSON.stringify(res.data.listing.listing_images));
                    // setListImagesData(res.data.listing.listing_images);
                    
                    var imagesArray = res.data.listing.listing_images;
                    var dupImgArray = [];
                    // var dupImgArray = [];
                    console.log('imagesArrayimagesArray ' + imagesArray.length + ' :imagesArray :' + JSON.stringify(imagesArray))
                    for (let i = 0; i < imagesArray.length; i++) {
                        const newFile = imagesArray[i];
                        let imageItem = {
                            uri: newFile.image_url,
                            name: newFile.image,
                            type: "image/jpeg"
                        }
                        dupImgArray.push(imageItem);
                        // formData.append('listing_images[]', newFile)
                    };
                    let image2 = {
                        name: "Add",
                    }
                    dupImgArray.push(image2);
                    console.log('dupArrImages Details' + JSON.stringify(dupImgArray));
                    setArrImages(dupImgArray);
                    loadData(res.data.listing);



                    // console.log('listing/detail', searchListDetail);
                    // Alert.alert('', res.message, [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false })
                } else {
                    console.log('Search Listing Details Error' + JSON.stringify(res.message));
                    // Alert.alert('', res.message, [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
                }
            })
            .catch(err => {
                console.error("error: ", err);
            });
    }

    


    React.useEffect(() => {
        getData('selectedAminitiesData').then((selectedAminitiesData) => {
            if (selectedAminitiesData && selectedAminitiesData.length > 0) {
                console.log('USER reson id : ' + JSON.stringify(selectedAminitiesData));
                const selectedAminitiesDataArr = JSON.parse(selectedAminitiesData);
                var strArr = [];
                var strArrApi = [];
                for (let i = 0; i < selectedAminitiesDataArr.length; i++) {
                    let item = selectedAminitiesDataArr[i];
                    let data = {
                        "id": item.id,

                    }
                    strArr.push(item.name);
                    strArrApi.push(data);
                }
                setArrSelectedAminities(strArr);
                setArrSelectedAminitiesForApi(strArrApi);
                // this.setState({ arrSelectedAminities: strArr });
            }
            else {
                console.log('elsecase');
                setArrSelectedAminities([]);
                setArrSelectedAminitiesForApi([]);
                // this.setState({ arrSelectedAminities: [] });
            }
        })

    }, [isFocused])

    const GetFilename = (url) => {

        var myArray = url.split('/');
        var imgName = myArray[myArray.length - 1];
        return imgName;
        // if (url) {
        //     var m = url.toString().match(/.*\/(.+?)\./);
        //     if (m && m.length > 1) {
        //         return m[1];
        //     }
        // }
        // return "";
    }

    const getAminities = () => {
        console.log('fetchingaminities');
        fetchAminities().then((response) => {

            if (response.status) {
                setAminitiesList(response.data);

            }
            else {
                Alert.alert('' + response.message, [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
            }

        })

    }

    const onValueChange = (value) => {
        // console.log(JSON.stringify(aminitiesList[value]));
        setSelected(value);
        if (value === 'key0') {
            setHomeType("House");
        }
        else if (value === 'key1') {
            setHomeType("Co-op");
        }
        else if (value === 'key2') {
            setHomeType("Condo");
        }
        else if (value === 'key3') {
            setHomeType("Townhouse");
        }
        else if (value === 'key4') {
            setHomeType("Multi-Family");
        }
        else if (value === 'key5') {
            setHomeType("Land");
        }
        else {
            setHomeType("Other");
        }
    }

    const onValueChange2 = (value) => {
        // console.log(JSON.stringify(aminitiesList[value]));
        setSelected2(value);
        if (value === 'key0') {
            setListingType("For Sale");
        }
        else {
            setListingType("For Rent");
        }
    }

    const getAminitiesItems = () => {
        // console.log('load aminities : '+ JSON.stringify(aminitiesList))
        let serviceItems = aminitiesList.map((aminities, i) => {
            return <Picker.Item key={i} value={aminities.id} label={aminities.name} />
        });
        console.log('service items : ', serviceItems);

        return serviceItems
    }


    const fetchDataFromAmenities = () => {
        console.log('next to prev success');
    }

    const takePics = () => {
        ImagePicker.openPicker({
            width: 200,
            height: 200, compressImageMaxHeight: 400,
            compressImageMaxWidth: 400, cropping: true, multiple: true
        })
            .then(response => {
                let tempArray = []
                console.log("responseimage-------" + response)
                setImgSourceArr(response)
                // this.setState({ ImageSource: response })
                console.log("responseimagearray" + JSON.stringify(response));
                response.forEach((item) => {

                    let image = {
                        uri: item.path,
                        // width: item.width,
                        // height: item.height,
                    }
                    console.log("imagpath==========" + JSON.stringify(item))
                    tempArray.push(image)
                    //   this.setState({ ImageSourceviewarray: tempArray })
                    console.log('savedimageuri=====' + item.path);

                    console.log("imagpath==========" + JSON.stringify(image))
                })
                setArrImages(tempArray);
                setFilePath(tempArray[0].uri)
                console.log("finalImageArray==========" + JSON.stringify(tempArray))

            }).catch(e => {
                console.log("e.message :   " + e.message)
            })

    }

    const seeImageInZoom = (item) => {
        setFilePath(item.uri)
    }

    const chooseFile = () => {

        ImagePicker.showImagePicker({ noData: true, mediaType: "photo" }, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else {
                console.log('image picker picked image path' + JSON.stringify(response));
                setMainImage(response.uri)
                setMainImageData(response);
            }
        });
    };

    const chooseFileForMultipleImages = () => {

        ImagePicker.showImagePicker({ noData: true, mediaType: "photo" }, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else {
                console.log('image picker picked image path' + JSON.stringify(response));
                // setMainImage(response.uri)
                // setMainImageData(response);
                var fileName = response.fileName;
                var filetype = response.type;
                if (fileName || filetype) {

                }
                else {
                    var filenamess = response.uri.replace(/^.*[\\\/]/, '');
                    console.log("filenamess::: " + filenamess);
                    fileName = filenamess;
                    filetype = "image/jpeg";
                }
                let imageItem = {
                    uri: response.uri,
                    name: fileName,
                    type: filetype
                }
                var imageArray = [];
                // console.log('dupArrImages::: ' + JSON.stringify(dupArrImages) + 'length::: ' + dupArrImages.length);

                imageArray = dupArrImages;
                imageArray.splice(imageArray.length - 1, imageArray.length - 1);
                // console.log('imagearray:: ' + JSON.stringify(imageArray) + 'length::: ' + imageArray.length);
                imageArray.push(imageItem);
                // console.log('imagearray::: ' + JSON.stringify(imageArray) + 'length::: ' + imageArray.length);
                setDupArrImages(imageArray);
                let image2 = {
                    name: "Add",
                }

                // setTimeout(function () {
                imageArray.push(image2);
                setArrImages(imageArray);
                setCounter(counter + 1)
                console.log('imagearray:::2 ' + JSON.stringify(imageArray) + 'length::: ' + imageArray.length);
                // }, 300);

            }
        });
    };

    const mainImageClicked = () => {
        setMainImage('');
    }

    const additionalImageClicked = (index) => {
        console.log('indexx:: ' + index);
        var arrImg = arrImages;
        arrImg.splice(index, 1);
        setArrImages(arrImg);
        setCounter(counter + 1);
    }

    const getMapDetails = async (data) => {
        const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${data.place_id}&key=AIzaSyDx8L9iRu5yyvqdw6pvPFUOdgdUjOq6S2k`);
        console.log("Google map all Details1" + JSON.stringify(response));
        const userInfo = await response.json();
        console.log("Google map all Details" + JSON.stringify(userInfo) + " ::SS:: " + JSON.stringify(userInfo.result.geometry.location) + " :: " + userInfo.result.geometry.location.lat);
        var lat = userInfo.result.geometry.location.lat;
        var long = userInfo.result.geometry.location.lng;
        setLatitude(lat);
        setLongnitude(long);
    }

    return (
        <View style={{ flex: 1 }}>
            {console.log('imagearray:::3 ' + JSON.stringify(arrImages) + 'length::: ' + arrImages.length)}
            {console.log("rendering the screen...")}
            <View style={{ width: '100%', flex: 0.10, backgroundColor: '#C0C0C0', alignItems: 'center', paddingRight: 10, paddingLeft: 10, flexDirection: 'row' }}>
                <TouchableOpacity onPress={() =>
                    navigation.goBack()
                }>
                    <Image source={require('../../../assets/icons/back.png')}
                        style={{ height: 25, width: 25 }} />
                </TouchableOpacity>

                <View style={{ width: '95%', height: getDimen(0.3 / 2), backgroundColor: '#C0C0C0', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 10, paddingLeft: 10, flexDirection: 'row' }}>
                    {/* <Image source={require('../../../assets/icons/2.png')}
                        style={{ height: getDimen(0.1), width: getDimen(0.1) }} /> */}

                    <Image source={require('../../../assets/images/logo.png')}
                        style={{ height: getDimen(0.3 / 2), width: getDimen(0.3 / 2) }} />
                </View>
            </View>
            <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 0.90, width: '100%', height: '100%', backgroundColor: 'white', alignContent: 'flex-end', flexDirection: 'column' }}>
                <View style={{ backgroundColor: 'white', height: getDimen(0.125), width: '100%', justifyContent: 'center', alignContent: 'center' }}>
                    <View style={{ backgroundColor: '#121735', height: getDimen(0.125), width: getDimen(0.6), justifyContent: 'center', alignContent: 'center' }}>
                        <Text style={{ fontSize: getDimen(0.05), color: 'white', fontWeight: 'bold', backgroundColor: '#121735', textAlign: 'center' }}>EDIT LISTING</Text>
                    </View>
                    {/* <TouchableOpacity onPress={chooseFile.bind(this)}>
                    <View style={{ backgroundColor: '#f1ac35', height: getDimen(0.125), width: getDimen(0.5), justifyContent: 'center', alignContent: 'center', marginLeft: getDimen(0.01) }}>
                        <Text style={{ fontSize: getDimen(0.05), color: 'white', fontWeight: 'bold', backgroundColor: '#f1ac35', textAlign: 'center' }}>IMAGE UPLOAD</Text>
                    </View>
                </TouchableOpacity> */}
                </View>
                <ScrollView style={styles.container}>
                    <View>
                        <View style={{ borderRadius: 0, width: getDimen(0.90), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', marginTop: 10 }}>

                            <View style={{ backgroundColor: '#E6E6E6', flex: 1, width: '100%', height: getDimen(.55), marginTop: 0, marginRight: 0, borderRadius: 5, justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center' }}>


                                {console.log('uriiii:' + mainImage)}
                                {mainImage === '' ?
                                    <TouchableOpacity style={{ flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center', alignContent: 'center', alignSelf: 'center' }}
                                        // onPress={() => Alert.alert('Plus icon clicked!')}
                                        onPress={chooseFile}
                                    >
                                        <Text style={{ flex: 1, fontSize: getDimen(0.15), color: 'gray', textAlign: 'center', marginTop: getDimen(0.17) }}>+</Text>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity style={{ height: '100%', width: '100%', alignItems: 'center', alignContent: 'center', }}
                                        // onPress={() => Alert.alert('Plus icon clicked!')}
                                        onPress={chooseFile}
                                    >
                                        <Image
                                            style={{ resizeMode: 'cover', alignSelf: 'center', height: getDimen(0.55), width: getDimen(0.90), borderRadius: 10 }}
                                            source={{ uri: mainImage }}
                                            defaultSource={require('../../../assets/icons/19.png')}
                                        />
                                        <TouchableOpacity onPress={mainImageClicked} style={{ position: 'absolute', height: 35, width: 35, alignSelf: 'flex-end', alignItems: 'center', justifyContent: 'center', borderRadius: 15, }}>
                                            <View style={{ width: 26, height: 26, borderRadius: 13, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', }}>
                                                <Image style={{ width: '80%', height: '80%', borderRadius: 15 }}
                                                    source={require('../../../assets/icons/iconClose.png')}
                                                />
                                            </View>
                                        </TouchableOpacity>

                                    </TouchableOpacity>
                                }

                            </View>
                        </View>
                        <Text style={{ fontSize: getDimen(0.035), color: 'gray', marginLeft: getDimen(0.06), marginTop: getDimen(0.025) }}>Additional Listing Images</Text>
                        {arrImages && arrImages.length > 0 ?
                            <FlatList
                                horizontal={false}
                                numColumns={2}
                                showsVerticalScrollIndicator={false}
                                style={{ marginLeft: getDimen(.065), marginRight: getDimen(.065), marginTop: getDimen(0.025), }}
                                data={arrImages}
                                keyExtractor={(item, index) => "images" + index}
                                renderItem={({ item, separators, index }) => (
                                    <View>
                                        {arrImages && index == arrImages.length - 1 ?
                                            <View style={{ backgroundColor: '#E6E6E6', width: getDimen(1 / 2) - getDimen(0.12), height: getDimen(.35), marginTop: 10, marginRight: 0, marginLeft: 10, borderRadius: 5, justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center' }}>
                                                <TouchableOpacity onPress={chooseFileForMultipleImages}>
                                                    <Text style={{ fontSize: getDimen(0.15), alignSelf: 'center', height: getDimen(.35), width: '100%', color: 'gray', marginTop: getDimen(0.12) }}>+</Text>

                                                </TouchableOpacity>
                                            </View>
                                            :
                                            <View style={{ flexDirection: "column", width: getDimen(1 / 2) - getDimen(0.090), height: getDimen(.35), borderRadius: 10, marginTop: 10, marginLeft: 5, }}>

                                                <Image
                                                    source={{ uri: item.uri }}
                                                    style={{ width: '100%', height: getDimen(.35), resizeMode: 'cover', alignSelf: 'center', borderRadius: 10 }}
                                                    defaultSource={require('../../../assets/icons/19.png')}
                                                />
                                                <TouchableOpacity onPress={() => additionalImageClicked(index)}
                                                    style={{ position: 'absolute', height: 35, width: 35, alignSelf: 'flex-end', alignItems: 'center', justifyContent: 'center', borderRadius: 15, }}>
                                                    <View style={{ width: 26, height: 26, borderRadius: 13, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', }}>
                                                        <Image style={{ width: '80%', height: '80%', borderRadius: 15 }}
                                                            source={require('../../../assets/icons/iconClose.png')}
                                                        />
                                                    </View>
                                                </TouchableOpacity>

                                            </View>
                                        }


                                    </View>
                                )}
                            />
                            :
                            <View style={{ backgroundColor: '#E6E6E6', flex: 1, width: getDimen(1) / 3, marginLeft: getDimen(0.06), height: getDimen(1) / 3, marginTop: getDimen(0.025), marginRight: 0, borderRadius: 5, justifyContent: 'center', alignSelf: 'flex-start', alignItems: 'center', alignContent: 'center' }}>
                                <TouchableOpacity onPress={chooseFileForMultipleImages}>
                                    <Text style={{ fontSize: getDimen(0.15), alignSelf: 'center', height: getDimen(1) / 3, width: getDimen(1) / 3, color: 'gray', textAlign: 'center', marginTop: getDimen(0.1) }}>+</Text>

                                </TouchableOpacity>
                            </View>
                        }


                        <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'column', width: '100%', height: getDimen(.18) - 5, marginTop: getDimen(0.08), marginRight: 10, borderRadius: 0, alignItems: 'flex-start', }}>
                            <Text style={{ fontSize: getDimen(0.038), marginLeft: getDimen(0.07), textAlign: 'justify', }}>Address</Text>
                            {/* <Text style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.04), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0.025), color: 'gray', }}>Co-op / Condo</Text> */}
                            {/* <Item style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.06), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0), borderBottomWidth: 0}}>
                                <Input placeholder='123 Street Name'
                                    style={{ fontSize: getDimen(0.038), }}
                                    onChangeText={(val) => setLocation(val)}
                                />
                            </Item> */}
                            {/* <View style={styles.inputContainer}> */}
                            {/* <TextInput
                                    style={styles.input}
                                    placeholder="Address"
                                    placeholderTextColor="#8A8A8A"
                                    // secureTextEntry={true}
                                    underlineColorAndroid='transparent'
                                    onChangeText={(address) => setAddress(address)}
                                    value={address} /> */}

                            <TouchableOpacity onPress={() => setGoogleView(true)}>
                                {
                                    (location === '') ?
                                        <Text style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.085), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0.05), color: 'gray', }}>Current Location / City,State / Zip Code</Text>
                                        :
                                        <Text style={{ fontSize: getDimen(0.035), marginLeft: getDimen(0.085), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0.05), color: 'gray', }}>{location}</Text>
                                }

                            </TouchableOpacity>
                            {/* </View> */}
                        </View>
                        <View style={{ height: 1, width: getDimen(0.9), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#CCC', marginTop: getDimen(0.0136) }}></View>

                        <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'column', width: '100%', height: getDimen(.18) - 5, marginTop: getDimen(0.08), marginRight: 10, borderRadius: 0, alignItems: 'flex-start', }}>
                            <Text style={{ fontSize: getDimen(0.038), marginLeft: getDimen(0.07), textAlign: 'justify', }}>City</Text>
                            {/* <Text style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.04), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0.025), color: 'gray', }}>Co-op / Condo</Text> */}
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="City"
                                    placeholderTextColor="#8A8A8A"
                                    // secureTextEntry={true}
                                    underlineColorAndroid='transparent'
                                    onChangeText={(city) => setCity(city)}
                                    value={city} />
                            </View>
                        </View>
                        {/* <View style={{ height: 1, width: getDimen(0.90), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#8d8865', marginTop: getDimen(0.0136) }}></View> */}

                        <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'column', width: '100%', height: getDimen(.18) - 5, marginTop: getDimen(0.08), marginRight: 10, borderRadius: 0, alignItems: 'flex-start', }}>
                            <Text style={{ fontSize: getDimen(0.038), marginLeft: getDimen(0.07), textAlign: 'justify', }}>State</Text>
                            {/* <Text style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.04), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0.025), color: 'gray', }}>Co-op / Condo</Text> */}
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="State"
                                    placeholderTextColor="#8A8A8A"
                                    // secureTextEntry={true}
                                    underlineColorAndroid='transparent'
                                    onChangeText={(stateName) => setStateName(stateName)}
                                    value={stateName} />
                            </View>
                        </View>
                        {/* <View style={{ height: 1, width: getDimen(0.90), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#8d8865', marginTop: getDimen(0.0136) }}></View> */}

                        <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'column', width: '100%', height: getDimen(.18) - 5, marginTop: getDimen(0.08), marginRight: 10, borderRadius: 0, alignItems: 'flex-start', }}>
                            <Text style={{ fontSize: getDimen(0.038), marginLeft: getDimen(0.07), textAlign: 'justify', }}>Zip Code</Text>
                            {/* <Text style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.04), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0.025), color: 'gray', }}>Co-op / Condo</Text> */}
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Zip Code"
                                    placeholderTextColor="#8A8A8A"
                                    keyboardType="numeric"
                                    // secureTextEntry={true}
                                    underlineColorAndroid='transparent'
                                    onChangeText={(zipcode) => setZipcode(zipcode)}
                                    value={zipcode} />
                            </View>
                        </View>
                        {/* <View style={{ height: 1, width: getDimen(0.90), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#8d8865', marginTop: getDimen(0.0136) }}></View> */}

                        <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'column', width: '100%', height: getDimen(.18) - 5, marginTop: getDimen(0.08), marginRight: 10, borderRadius: 0, alignItems: 'flex-start', }}>
                            <Text style={{ fontSize: getDimen(0.038), marginLeft: getDimen(0.07), textAlign: 'justify', }}>Location / Neighborhood</Text>
                            {/* <Text style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.04), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0.025), color: 'gray', }}>Co-op / Condo</Text> */}
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Location / Neighborhood"
                                    placeholderTextColor="#8A8A8A"
                                    // secureTextEntry={true}
                                    underlineColorAndroid='transparent'
                                    onChangeText={(locationNeighbourhood) => setLocationNeighbourhood(locationNeighbourhood)}
                                    value={locationNeighbourhood} />
                            </View>
                        </View>
                        {/* <View style={{ height: 1, width: getDimen(0.90), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#8d8865', marginTop: getDimen(0.0136) }}></View> */}



                        <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'column', width: '100%', height: getDimen(.18) - 5, marginTop: getDimen(0.08), marginRight: 10, borderRadius: 0, alignItems: 'flex-start', }}>
                            <Text style={{ fontSize: getDimen(0.038), marginLeft: getDimen(0.07), textAlign: 'justify', }}>Price</Text>
                            {/* <Text style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.04), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0.025), color: 'gray', }}>Co-op / Condo</Text> */}
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Price"
                                    placeholderTextColor="#8A8A8A"
                                    keyboardType="numeric"
                                    // secureTextEntry={true}
                                    underlineColorAndroid='transparent'
                                    onChangeText={(price) => setPrice(price)}
                                    value={price} />
                            </View>
                        </View>
                        {/* <View style={{ height: 1, width: getDimen(0.90), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#8d8865', marginTop: getDimen(0.0136) }}></View> */}

                        <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'column', width: '100%', height: getDimen(.18) - 5, marginTop: getDimen(0.08), marginRight: 10, borderRadius: 0, alignItems: 'flex-start', }}>
                            <Text style={{ fontSize: getDimen(0.038), marginLeft: getDimen(0.07), textAlign: 'justify', }}>Price per squre feet</Text>
                            {/* <Text style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.04), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0.025), color: 'gray', }}>Co-op / Condo</Text> */}
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Price per squre feet"
                                    placeholderTextColor="#8A8A8A"
                                    keyboardType="numeric"
                                    // secureTextEntry={true}
                                    underlineColorAndroid='transparent'
                                    onChangeText={(pricePerSqureFeet) => setPricePerSqureFeet(pricePerSqureFeet)}
                                    value={pricePerSqureFeet} />

                            </View>
                        </View>
                        {/* <View style={{ height: 1, width: getDimen(0.90), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#8d8865', marginTop: getDimen(0.0136) }}></View> */}

                        <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'column', width: '100%', height: getDimen(.18) - 5, marginTop: getDimen(0.08), marginRight: 10, borderRadius: 0, alignItems: 'flex-start', }}>
                            <Text style={{ fontSize: getDimen(0.038), marginLeft: getDimen(0.07), textAlign: 'justify', }}>Bedrooms</Text>
                            {/* <Text style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.04), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0.025), color: 'gray', }}>Co-op / Condo</Text> */}
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Bedrooms"
                                    placeholderTextColor="#8A8A8A"
                                    keyboardType="numeric"
                                    // secureTextEntry={true}
                                    underlineColorAndroid='transparent'
                                    onChangeText={(bedroom) => setBedroom(bedroom)}
                                    value={bedroom} />
                            </View>
                        </View>
                        {/* <View style={{ height: 1, width: getDimen(0.90), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#8d8865', marginTop: getDimen(0.0136) }}></View> */}

                        <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'column', width: '100%', height: getDimen(.18) - 5, marginTop: getDimen(0.08), marginRight: 10, borderRadius: 0, alignItems: 'flex-start', }}>
                            <Text style={{ fontSize: getDimen(0.038), marginLeft: getDimen(0.07), textAlign: 'justify', }}>Baths</Text>
                            {/* <Text style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.04), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0.025), color: 'gray', }}>Co-op / Condo</Text> */}
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Baths"
                                    placeholderTextColor="#8A8A8A"
                                    keyboardType="numeric"
                                    // secureTextEntry={true}
                                    underlineColorAndroid='transparent'
                                    onChangeText={(bathroom) => setBathroom(bathroom)}
                                    value={bathroom} />
                            </View>
                        </View>
                        {/* <View style={{ height: 1, width: getDimen(0.90), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#8d8865', marginTop: getDimen(0.0136) }}></View> */}

                        <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'column', width: '100%', height: getDimen(0.18) - 5, marginTop: getDimen(0.08), marginRight: 10, borderRadius: 0, alignItems: 'flex-start', }}>
                            <Text style={{ fontSize: getDimen(0.038), marginLeft: getDimen(0.07), textAlign: 'justify', }}>Home Type </Text>
                            {/* <Text style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.04), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0.025), color: 'gray', }}>Co-op / Condo</Text> */}
                            <View style={styles.inputContainer2}>
                                <View style={{ position: 'absolute', flexDirection: 'row', justifyContent: 'center', width: '100%', height: '100%' }}>
                                    <View style={{ flex: 0.8, justifyContent: 'center' }}>

                                    </View>
                                    <View style={{ flex: 0.2, width: '100%', height: '100%', justifyContent: 'center' }}>
                                        <Image
                                            source={require('../../../assets/images/down-arrow.png')}
                                            style={{ marginRight: 1, alignSelf: 'center', width: '30%', height: '30%' }}
                                        />
                                    </View>
                                </View>
                                {/* <Image
                                    source={require('../assets/images/nationality.png')}
                                    style={styles.ImageStyle}
                                /> */}
                                <Picker
                                    mode="dialog"
                                    iosIcon={<Icon />}
                                    style={{ marginLeft: getDimen(0.05), width: '80%', height: '100%', backgroundColor: 'transparent', color: 'black', fontSize: 14 }}
                                    placeholder="Select Home Type"

                                    placeholderStyle={{ color: "#000000", fontSize: 14 }}
                                    placeholderIconColor="#000000"
                                    selectedValue={selected}
                                    onValueChange={(value) => onValueChange(value)}
                                >
                                    <Picker.Item label="House" value="key0" />
                                    <Picker.Item label="Co-op" value="key1" />
                                    <Picker.Item label="Condo" value="key2" />
                                    <Picker.Item label="Townhouse" value="key3" />
                                    <Picker.Item label="Multi-Family" value="key4" />
                                    <Picker.Item label="Land" value="key5" />
                                    <Picker.Item label="Other" value="key6" />
                                </Picker>
                            </View>
                        </View>
                        <View style={{ height: 1, width: getDimen(0.90), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#CCC', marginTop: getDimen(0.0136) }}></View>

                        <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'column', width: '100%', height: getDimen(.18) - 5, marginTop: getDimen(0.08), marginRight: 10, borderRadius: 0, alignItems: 'flex-start', }}>
                            <Text style={{ fontSize: getDimen(0.038), marginLeft: getDimen(0.07), textAlign: 'justify', }}>Square Feet</Text>
                            {/* <Text style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.04), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0.025), color: 'gray', }}>Co-op / Condo</Text> */}
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Square Feet"
                                    placeholderTextColor="#8A8A8A"
                                    // secureTextEntry={true}
                                    underlineColorAndroid='transparent'
                                    onChangeText={(squreFeet) => setSqureFeet(squreFeet)}
                                    value={squreFeet} />
                            </View>
                        </View>
                        {/* <View style={{ height: 1, width: getDimen(0.90), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#8d8865', marginTop: getDimen(0.0136) }}></View> */}

                        <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'column', width: '100%', height: getDimen(.18) - 5, marginTop: getDimen(0.08), marginRight: 10, borderRadius: 0, alignItems: 'flex-start', }}>
                            <Text style={{ fontSize: getDimen(0.038), marginLeft: getDimen(0.07), textAlign: 'justify', }}>Terrace</Text>
                            {/* <Text style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.04), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0.025), color: 'gray', }}>Co-op / Condo</Text> */}
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Terrace"
                                    placeholderTextColor="#8A8A8A"
                                    keyboardType="numeric"
                                    // secureTextEntry={true}
                                    underlineColorAndroid='transparent'
                                    onChangeText={(terrace) => setTerrace(terrace)}
                                    value={terrace} />
                            </View>
                        </View>
                        {/* <View style={{ height: 1, width: getDimen(0.90), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#8d8865', marginTop: getDimen(0.0136) }}></View> */}

                        <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'column', width: '100%', height: getDimen(0.18) - 5, marginTop: getDimen(0.08), marginRight: 10, borderRadius: 0, alignItems: 'flex-start', }}>
                            <Text style={{ fontSize: getDimen(0.038), marginLeft: getDimen(0.07), textAlign: 'justify', }}>Listing Type </Text>
                            {/* <Text style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.04), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0.025), color: 'gray', }}>Co-op / Condo</Text> */}
                            <View style={styles.inputContainer2}>
                                <View style={{ position: 'absolute', flexDirection: 'row', justifyContent: 'center', width: '100%', height: '100%' }}>
                                    <View style={{ flex: 0.8, justifyContent: 'center' }}>

                                    </View>
                                    <View style={{ flex: 0.2, width: '100%', height: '100%', justifyContent: 'center' }}>
                                        <Image
                                            source={require('../../../assets/images/down-arrow.png')}
                                            style={{ marginRight: 1, alignSelf: 'center', width: '30%', height: '30%' }}
                                        />
                                    </View>
                                </View>
                                {/* <Image
                                    source={require('../assets/images/nationality.png')}
                                    style={styles.ImageStyle}
                                /> */}
                                <Picker
                                    mode="dialog"
                                    iosIcon={<Icon />}
                                    style={{ marginLeft: getDimen(0.05), width: '80%', height: '100%', backgroundColor: 'transparent', color: 'black', fontSize: 14 }}
                                    placeholder="Select Listing Type"

                                    placeholderStyle={{ color: "#000000", fontSize: 14 }}
                                    placeholderIconColor="#000000"
                                    selectedValue={selected2}
                                    onValueChange={(value) => onValueChange2(value)}
                                >
                                    <Picker.Item label="For Sale" value="key0" />
                                    <Picker.Item label="For Rent" value="key1" />

                                </Picker>
                            </View>
                        </View>
                        <View style={{ height: 1, width: getDimen(0.90), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#CCC', marginTop: getDimen(0.0136) }}></View>

                        <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'column', width: '100%', height: getDimen(0.18) - 5, marginTop: getDimen(0.08), marginRight: 10, borderRadius: 0, alignItems: 'flex-start', }}>
                            <Text style={{ fontSize: getDimen(0.038), marginLeft: getDimen(0.07), textAlign: 'justify', }}>Amenities </Text>
                            {/* <Text style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.04), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0.025), color: 'gray', }}>Co-op / Condo</Text> */}
                            <View style={styles.inputContainer2}>
                                <TouchableOpacity onPress={() => navigation.navigate('Aminities', ({ 'dataFor': "Aminities", "data": aminitiesList }))} style={{ position: 'absolute', flexDirection: 'row', justifyContent: 'center', width: '100%', height: '100%' }}>
                                    <View style={{ flex: 0.8, justifyContent: 'center' }}>
                                        <Text style={{ marginLeft: getDimen(0.1) }}>{(arrSelectedAminities && arrSelectedAminities.length > 0) ? arrSelectedAminities.toString() : "Select Aminities"}</Text>
                                    </View>
                                    <View style={{ flex: 0.2, width: '100%', height: '100%', justifyContent: 'center' }}>
                                        <Image
                                            source={require('../../../assets/images/down-arrow.png')}
                                            style={{ marginRight: 1, alignSelf: 'center', width: '30%', height: '30%' }}
                                        />
                                    </View>
                                </TouchableOpacity>
                                {/* <Image
                                    source={require('../assets/images/nationality.png')}
                                    style={styles.ImageStyle}
                                /> */}
                                {/* <Picker
                                    mode="dialog"
                                    iosIcon={<Icon />}
                                    style={{ marginLeft: getDimen(0.07), width: '80%', height: '100%', backgroundColor: 'transparent', color: 'black', fontSize: 14 }}
                                    placeholder="Aminities"

                                    placeholderStyle={{ color: "#000000", fontSize: 14 }}
                                    placeholderIconColor="#000000"
                                    selectedValue={selected}
                                    onValueChange={(value) => onValueChange(value)}
                                >
                                    {getAminitiesItems()}
                                </Picker> */}
                            </View>
                        </View>
                        <View style={{ height: 1, width: getDimen(0.90), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#CCC', marginTop: getDimen(0.0136) }}></View>

                        <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'column', width: '100%', height: getDimen(.18) - 5, marginTop: getDimen(0.08), marginRight: 10, borderRadius: 0, alignItems: 'flex-start', }}>
                            <Text style={{ fontSize: getDimen(0.038), marginLeft: getDimen(0.07), textAlign: 'justify', }}>Year Built</Text>
                            {/* <Text style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.04), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0.025), color: 'gray', }}>Co-op / Condo</Text> */}
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Year Built"
                                    placeholderTextColor="#8A8A8A"
                                    keyboardType="numeric"
                                    // secureTextEntry={true}
                                    underlineColorAndroid='transparent'
                                    onChangeText={(yearBuilt) => setYearBuilt(yearBuilt)}
                                    value={yearBuilt} />
                            </View>
                        </View>
                        {/* <View style={{ height: 1, width: getDimen(0.90), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#8d8865', marginTop: getDimen(0.0136) }}></View> */}

                        <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'column', width: '100%', height: getDimen(.18) - 5, marginTop: getDimen(0.08), marginRight: 10, borderRadius: 0, alignItems: 'flex-start', }}>
                            <Text style={{ fontSize: getDimen(0.038), marginLeft: getDimen(0.07), textAlign: 'justify', }}>Property Share URL</Text>
                            {/* <Text style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.04), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0.025), color: 'gray', }}>Co-op / Condo</Text> */}
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Your Property Share URL"
                                    placeholderTextColor="#8A8A8A"
                                    // secureTextEntry={true}
                                    underlineColorAndroid='transparent'
                                    onChangeText={(imageUrl) => setImageUrl(imageUrl)}
                                    value={imageUrl} />
                            </View>
                        </View>
                        {/* <View style={{ height: 1, width: getDimen(0.90), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#8d8865', marginTop: getDimen(0.0136) }}></View> */}


                        <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'column', width: '100%', height: getDimen(.18) - 5, marginTop: getDimen(0.08), marginRight: 10, borderRadius: 0, alignItems: 'flex-start', }}>
                            <Text style={{ fontSize: getDimen(0.038), marginLeft: getDimen(0.07), textAlign: 'justify', }}>Property video URL</Text>
                            {/* <Text style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.04), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0.025), color: 'gray', }}>Co-op / Condo</Text> */}
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Your Property Video URL"
                                    placeholderTextColor="#8A8A8A"
                                    // secureTextEntry={true}
                                    underlineColorAndroid='transparent'
                                    onChangeText={(videoUrl) => setVideoUrl(videoUrl)}
                                    value={videoUrl} />
                            </View>
                        </View>
                        {/* <View style={{ height: 1, width: getDimen(0.90), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#8d8865', marginTop: getDimen(0.0136) }}></View> */}

                        <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'column', width: '100%', height: getDimen(.18) - 5, marginTop: getDimen(0.08), marginRight: 10, borderRadius: 0, alignItems: 'flex-start', }}>
                            <Text style={{ fontSize: getDimen(0.038), marginLeft: getDimen(0.07), textAlign: 'justify', }}>Description</Text>
                            {/* <Text style={{ fontSize: getDimen(0.040), marginLeft: getDimen(0.04), color: '#7F7F93', textAlign: 'justify', marginTop: getDimen(0.025), color: 'gray', }}>Co-op / Condo</Text> */}
                            <View style={styles.inputContainer}>
                                <Textarea
                                    containerStyle={styles.textareaContainer}
                                    style={styles.textarea}
                                    placeholder="Description"
                                    placeholderTextColor="#8A8A8A"
                                    // secureTextEntry={true}
                                    underlineColorAndroid='transparent'
                                    onChangeText={(description) => setDescription(description)}
                                    value={description} />
                            </View>
                        </View>
                        {/* <View style={{ height: 1, width: getDimen(0.90), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#8d8865', marginTop: getDimen(0.0136) }}></View> */}


                        <View style={{ width: '100%', height: getDimen(0.1), alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>

                            {/* <TouchableOpacity onPress={selectFile.bind(this)}>
                                <Text style={{ backgroundColor: '#D7D4D3', paddingLeft: getDimen(0.1), paddingRight: getDimen(0.1), paddingTop: 5, paddingBottom: 5 }}>
                                    Choose File...
                            </Text>
                            </TouchableOpacity> */}
                        </View>

                        <View style={{ alignSelf: 'flex-start', marginBottom: getDimen(0), flexDirection: 'row', alignItems: 'center', marginLeft: getDimen(0.06), marginTop: getDimen(0.1) }}>

                            <TouchableOpacity onPress={() => featuredAlert()}>
                                {
                                    checked ? (
                                        <Image source={require('../../../assets/icons/tick.png')}
                                            style={{ height: getDimen(0.06), width: getDimen(0.06) }} />
                                    ) :
                                        <Image source={require('../../../assets/icons/circle.png')}
                                            style={{ height: getDimen(0.06), width: getDimen(0.06) }} />
                                }
                                {/* <Image source={require('../../../assets/icons/tick.png')}
                            style={{ height: getDimen(0.06), width: getDimen(0.06) }} /> */}
                            </TouchableOpacity>

                            <Text style={{ paddingLeft: getDimen(0.05), color: '#8d8865' }}>
                                Featured Property
                            </Text>
                        </View>


                        <View style={{ width: '100%', height: getDimen(0.1), alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>
                            <Image
                                style={{ resizeMode: 'cover', alignSelf: 'center', height: getDimen(0.55), width: getDimen(0.2), borderRadius: getDimen(.32) / 2 }}
                                source={temp}
                            />

                        </View>

                    </View>

                </ScrollView>

                <View style={{ height: getDimen(0.16), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: 'white', marginTop: 0 }}>
                    <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'row', width: '100%', height: getDimen(.14), marginTop: getDimen(-0.01), alignItems: 'center', }}>
                        <View style={{ backgroundColor: '#121735', height: getDimen(0.125), width: '100%', justifyContent: 'center', alignContent: 'center' }}>
                            <TouchableOpacity
                                onPress={() => updateProperty()}
                            >
                                <Text style={{ fontSize: getDimen(0.05), color: 'white', fontWeight: 'bold', backgroundColor: '#121735', textAlign: 'center' }}>UPDATE</Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                </View>
            </KeyboardAvoidingView >
            {
                (showGoogleView === true) ?
                    <View
                        style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'flex-start', position: 'absolute', width: '100%', height: '100%' }}
                    >
                        <View style={{ width: '100%', flex: 0.10, backgroundColor: '#C0C0C0', alignItems: 'center', paddingRight: 10, paddingLeft: 10, flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => {
                                setGoogleView(false)
                                console.log('location', location)
                            }
                            }>
                                <Image source={require('../../../assets/icons/cross.png')}
                                    style={{ height: 20, width: 20 }} />
                            </TouchableOpacity>

                            <View style={{ width: '95%', height: getDimen(0.3 / 2), backgroundColor: '#C0C0C0', alignItems: 'center', justifyContent: 'space-between', paddingRight: 10, paddingLeft: 10, flexDirection: 'row' }}>
                                <Image source={require('../../../assets/icons/2.png')}
                                    style={{ height: getDimen(0.1), width: getDimen(0.1) }} />

                                <Image source={require('../../../assets/images/logo.png')}
                                    style={{ height: getDimen(0.3 / 2), width: getDimen(0.3 / 2) }} />
                            </View>

                        </View>

                        <GooglePlacesAutocomplete
                            placeholder='Current Location / City,State / Zip Code'
                            autoFocus={false}
                            returnKeyType={'default'}
                            fetchDetails={true}
                            listViewDisplayed={false}
                            currentLocation={true}
                            keyboardShouldPersistTaps={'handled'}
                            styles={{
                                textInputContainer: {
                                    width: '100%',
                                    marginTop: 0
                                },
                                textInput: {
                                    // marginLeft: 0,
                                    // marginRight: 0,
                                    // marginTop: 0,
                                    // marginBottom: 0,
                                    // height: '98%'
                                }
                            }}
                            onPress={(data, details = null) => {
                                // 'details' is provided when fetchDetails = true
                                console.log('Google Details => ', data.description);
                                setLocation(data.description);
                                setAddress(data.description);
                                // https://maps.googleapis.com/maps/api/place/details/json?placeid={placeid}&key={key}
                                // const response = await fetch(`https://graph.facebook.com/me?access_token=${accessData.accessToken}&fields=id,name,email,picture.type(large)`);
                                getMapDetails(data);
                            }}
                            query={{
                                key: 'AIzaSyDx8L9iRu5yyvqdw6pvPFUOdgdUjOq6S2k',
                                language: 'en',
                            }}
                        //  predefinedPlaces={[homePlace, workPlace]}
                        />

                        {/* <View style={{}}> */}
                        <View style={{ backgroundColor: '#121735', height: getDimen(0.125), width: getDimen(0.6), justifyContent: 'center', alignContent: 'center', marginBottom: getDimen(0.01) }}>
                            <TouchableOpacity
                                onPress={() => {
                                    if (location === '') {
                                        // Alert.alert('', 'Please Select Location..', [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
                                        return;
                                    } else {
                                        setGoogleView(false)
                                    }
                                    console.log('location', location)
                                }
                                }
                            >
                                <Text style={{ fontSize: getDimen(0.05), color: 'white', fontWeight: 'bold', textAlign: 'center' }}>SAVE</Text>
                            </TouchableOpacity>

                        </View>
                        {/* </View> */}

                    </View>
                    :
                    null
            }

            {
                (showLoader === '') ?
                    <View
                        style={{ flex: 1, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center', position: 'absolute', width: '100%', height: '100%' }}
                    >
                        <ActivityIndicator size="large" color="#2b5f9c" style={{ position: 'absolute', rotation: 180 }} />
                    </View>
                    :
                    null
            }
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        marginTop: getDimen(0.02),
        width: getDimen(1)
    },

    ImageStyle: {
        padding: 10,
        margin: 5,
        height: 20,
        width: 20,
        resizeMode: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    inputContainerBottom: {
        borderWidth: 1,
        paddingBottom: 5,
        borderBottomColor: '#CCC',
        borderColor: 'transparent',
        flexDirection: 'row',
        marginTop: getDimen(.085),
        marginLeft: getDimen(.085),
        marginRight: getDimen(.085)
    },
    inputContainer: {
        marginTop: 1,
        borderWidth: 1,
        marginLeft: 25,
        marginRight: 25,
        paddingBottom: -5,
        borderBottomColor: '#CCC',
        borderColor: 'transparent',
        flexDirection: 'row'
    },
    inputContainer2: {
        marginTop: 0,
        borderWidth: 1,
        marginRight: 25,
        height: '100%',
        marginLeft: -10,
        borderBottomColor: 'transparent',
        borderColor: 'transparent',
        flexDirection: 'row'
    },
    input: {
        height: 50,
        flex: 10,
        paddingLeft: 10,
        fontSize: 14,
        width: '100%',
        // fontFamily: 'Poppins-Regular',
        color: 'black'
    },
    forgotContainer: {
        paddingTop: 10,
        paddingRight: 20,
    },
    forgotText: {
        fontSize: 13,
        alignSelf: 'flex-end',
        color: '#F26622',
    },
    textStyle1: {
        color: 'black',
        alignSelf: 'flex-start',
        marginTop: getDimen(.2),
        marginLeft: getDimen(.085),
        fontSize: getDimen(.045)
    },
    textStyle2: {
        color: '#0088DD',
        alignSelf: 'center',
        fontWeight: 'bold',
        marginTop: getDimen(.1),
        // marginLeft: getDimen(.085),
        fontSize: getDimen(.08)
    },
    textStyle3: {
        color: 'black',
        alignSelf: 'flex-start',
        fontStyle: 'italic',
        marginTop: getDimen(.085),
        marginLeft: getDimen(.085),
        fontSize: getDimen(.045)
    },
    textareaContainer: {
        height: 100,
        padding: 5,
        backgroundColor: '#F7F7F7',
    },
    textarea: {
        textAlignVertical: 'top',  // hack android
        height: 90,
        fontSize: 14,
        color: '#333',
    },
    body: {
        backgroundColor: 'white',
        // alignItems: "center",
        // justifyContent: "center",
    },
    itemStyle: {
        marginTop: getDimen(.085),
        marginLeft: getDimen(.085),
        marginRight: getDimen(.085)
    },
});
export default EditPropertyScreen;
