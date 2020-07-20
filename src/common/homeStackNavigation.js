import { createStackNavigator } from "react-navigation-stack";
import Home from '../views/Home/home';
import OutletList from '../views/Outlet/outletList';
import Notification from '../views/Home/notification';
import Filters from '../views/filters';
import OutletMenu from '../views/Outlet/outletMenu';
import YourCart from "../views/Outlet/yourCart";
import Coupons from "../views/Outlet/coupons";
import Coupons2 from "../views/Outlet/coupons2";
import Offers from '../views/Offers/offers';
import RateAndFeedback from "../views/Order/rateAndFeedback";
import RateAndFeedbackList from "../views/Outlet/rateAndFeedbackList";
import Payment from "../views/Outlet/payment";
// import PaymentView from "../views/Outlet/paymentView";
import UserWallet from "../views/Outlet/WalletCart/UserWallet";
// import Payment from "../views/Outlet/payment";
import Dummy from "../views/Outlet/dummyMenu";
//import Outlet from '../views/Outlet/outletMenu copy'
import Outlet from '../views/Outlet/outLetmenuFixed'

//import OutletMenu from '../views/Outlet/outletMenuReplica'
export default createStackNavigator({
    homeScreen: { screen: Home },
    OutletMenu: { screen: OutletMenu },
    OutletList: { screen: OutletList },
    Notification: { screen: Notification },
    Filters: { screen: Filters },
    Coupons2: { screen: Coupons2 },
    YourCart: { screen: YourCart },
    Coupons: { screen: Coupons },
    Offers: { screen: Offers },
    RateAndFeedbackList: { screen: RateAndFeedbackList },
    RateAndFeedback: { screen: RateAndFeedback },
    Payment: { screen: Payment },
    // PaymentView: { screen: PaymentView},
    UserWallet: { screen: UserWallet },

    Dummy: { screen: Dummy }
},
    {
        headerMode: 'none',
    }
);

