

const initialState = {
    loading: true,
    isLogin: false,
    selected: 'key1',
   
};

export function splashFunction(state = initialState, action) {
    console.log('ACTION NAME :', action.type)
    switch (action.type) {
        case 'LOADING':
       //     console.log('LOADING Reducer Called.')
            state = action.payload;
            break;
        case 'LOGIN':
      //      console.log('Login Reducer Called.')
            state = action.payload;
            break;
    }
    return state;

}
// getData('login').then((value) => {
//     if (value !== null) {
//         if (value === 'true')
//             state = { isLogin: true };
//         else
//             state = { isLogin: false };

//         console.log('LOGIN STATUS : ', value);
//     }
//     else {
//         state = action.payload;
//         console.log('LOGIN STATUS : ', 'faliure.');
//     }

// })