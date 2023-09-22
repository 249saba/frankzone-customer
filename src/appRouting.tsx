import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import AuthGuard from "./shared/guards/authGuard";
import Login from "@pages/auth/login";
import HomeContainer from "./containers/homeContainer";
import Home from "@src/pages/home";
import ForgotPassword from "@pages/auth/forgotPassword";
import ResetPassword from "@pages/auth/resetPassword";
import SendOTP from "@pages/auth/sendOTP";
import VerifyOTP from "@pages/auth/verifyOTP";
import AddLocation from "@pages/auth/addLocation";
import Vendors from "@src/pages/e_commerce/vendors";
import VendorDetail from "@pages/e_commerce/vendors/vendorDetail";
import VendorList from "@pages/e_commerce/vendors/vendorList";
import ItemDetail from "@pages/e_commerce/Items/ItemDetail";
import Cart from "@src/pages/cartManagement/cart";
import CartManagement from "@pages/cartManagement";
import ChoosePayment from "@pages/cartManagement/choosePayment";
import Favourites from "@pages/favourites";
import FavouritesList from "@pages/favourites/favouritesList";
import MyOrders from "@pages/myOrders";
import MyOrdersList from "@src/pages/myOrders/myOrdersList";
import SignUp from "@pages/auth/signup";
import FranksShorts from "./pages/e_commerce/franksShorts";
import FranksShortsList from "./pages/e_commerce/franksShorts/franksShortsList";
import FranksShortsDetail from "./pages/e_commerce/franksShorts/franksShortsDetail";
import SeeAllCategory from "./pages/home/category/seeAllCategory";
import SeeAllVendor from "./pages/e_commerce/vendors/seeAllVendor";
import CategoryWiseVendor from "./pages/e_commerce/vendors/categoryWiseVendor";
import DealView from "./pages/home/deal";
import DealDetail from "./pages/home/deal/dealDetail";
import ProductDetail from "./pages/home/deal/productDetail";
import AddCard from "./pages/cartManagement/addCard";
import VendorOrder from "./pages/myOrders/vendorOrder";
import OrderDetail from "./pages/myOrders/orderDetail";
import Reviews from "./pages/e_commerce/vendors/reviews";
import WhatsNew from "./pages/e_commerce/vendors/whatsNew";
import VendorChat from "./pages/e_commerce/vendors/vendorChat";
import Inbox from "./pages/inbox";
import ChatList from "./pages/inbox/chatList";
import TransactionHistory from "./pages/transactionHistory";
import TransactionList from "./pages/transactionHistory/transactionList";
import ProfileSetting from "./pages/profileSetting";
import Profile from "./pages/profileSetting/profile";
import ChangePassword from "./pages/ChangePassword/changePassword";
import ProfilePassword from "./pages/ChangePassword";
import Setting from "./pages/settings";
import AllSetting from "./pages/settings/allSetting";
import Faqs from "./pages/settings/faqs";
import PrivacyPolicy from "./pages/settings/privacyPolicy";
import TermsAndConditions from "./pages/settings/termsAndConditions";
import About from "./pages/settings/about";
import DeliveryAddress from "./pages/settings/deliveryAddress";
import ConfirmLocation from "./pages/settings/confirmLocation";
import AddNewAddress from "./pages/settings/addNewAddress";
import NewLocation from "./pages/auth/newLocation";
import PaymentMethod from "./pages/paymentMethod";
import PaymentCardListing from "./pages/paymentMethod/paymentCardsListing";
import AddPaymentCard from "./pages/paymentMethod/addPaymentCard";
import DealReviews from "./pages/home/deal/dealsReview";

const routes = [
  {
    path: "/",
    component: <HomeContainer />,
    children: [
      { path: "/", component: <Home />, protectedPath: false },
      {
        path: "/vendors/:id?",
        component: <Vendors />,
        protectedPath: false,
        children: [
          { path: "", component: <VendorList /> },
          { path: "vendorDetail/:vendorid?", component: <VendorDetail /> },
          { path: "vendorDetail/:vendorid?/Item/:itemid?", component: <ItemDetail /> },
          { path: "seeAllCategory/:id?", component: <SeeAllCategory /> },
          { path: "seeAllVendor/:id?", component: <SeeAllVendor /> },
          { path: "vendorDetail/:vendorid?/Item/:itemid?/reviews/:reviewid?", component: <Reviews /> },
          { path: "reviews/:reviewid?", component: <DealReviews /> },
          { path: "whatsNew/:id?", component: <WhatsNew /> },
          { path: "vendorChat/:id?", component: <VendorChat /> },
          {
            path: "categoryWiseVendor/:id?",
            component: <CategoryWiseVendor />,
          },
        ],
      },
      {
        path: "/frankshorts/:id?",
        component: <FranksShorts />,
        protectedPath: false,
        children: [
          { path: "", component: <FranksShortsList /> },
          { path: "frankshortsDetail/:id?", component: <FranksShortsDetail /> },
          {
            path: "frankshortsrDetail/:id?/Item/:id?",
            component: <ItemDetail />,
          },
        ],
      },
      {
        path: "/deals/:dealid?",
        component: <DealView />,
        protectedPath: false,
        children: [
          { path: "", component: <DealDetail /> },
          { path: "frankshortsDetail/:id?", component: <FranksShortsDetail /> },
          { path: "productDetail/:productid?", component: <ProductDetail /> },
        ],
      },
      {
        path: "/cartManagement",
        component: <CartManagement />,
        protectedPath: true,
        children: [
          { path: "", component: <Cart /> },
          { path: "choosePayment", component: <ChoosePayment /> },
          { path: "addCard", component: <AddPaymentCard /> },
        ],
      },
      {
        path: "/paymentMethod",
        component: <PaymentMethod />,
        protectedPath: true,
        children: [
          { path: "", component: <PaymentCardListing /> },
          { path: "addPaymentCard", component: <AddPaymentCard /> },
        ],
      },
      {
        path: "/transactionHistory",
        component: <TransactionHistory />,
        protectedPath: false,
        children: [
          { path: "", component: <TransactionList /> },
        ],
      },
      {
        path: "/profileSetting",
        component: <ProfileSetting />,
        protectedPath: false,
        children: [
          { path: "", component: <Profile /> },
        ],
      },
      {
        path: "/ChangePassword",
        component: <ProfilePassword />,
        protectedPath: false,
        children: [
          { path: "", component: <ChangePassword /> },
        ],
      },
      {
        path: "/Setting",
        component: <Setting />,
        protectedPath: true,
        children: [
          { path: "", component: <AllSetting /> },
        
          { path: "DeliveryAddress", component: <DeliveryAddress /> },
          { path: "AddNewAddress", component: <AddNewAddress /> },
          { path: "ConfirmLocation", component: <ConfirmLocation /> },
          { path: "Faqs", component: <Faqs /> },
          { path: "PrivacyPolicy", component: <PrivacyPolicy /> },
          { path: "TermsAndConditions", component: <TermsAndConditions /> },
          { path: "About", component: <About /> },
        ],
        
      },
      { path: "TermsAndConditions", component: <TermsAndConditions/>,  protectedPath: false },
      { path: "PrivacyPolicy", component: <PrivacyPolicy />, protectedPath: false},

      {
        path: "/favourites",
        component: <Favourites />,
        protectedPath: true,
        children: [{ path: "", component: <FavouritesList /> }],
      },
      {
        path: "/messages",
        component: <Inbox />,
        protectedPath: true,
        children: [{ path: "", component: <ChatList /> }],
      },

      {
        path: "/myOrders",
        component: <MyOrders />,
        protectedPath: true,
        children: [
          { path: "", component: <MyOrdersList /> },
          { path: "vendorOrder/:id?", component: <VendorOrder /> },
          { path: "orderDetail/:id?", component: <OrderDetail /> },
        ],
      },

      { path: "/login", component: <Login />, protectedPath: false },
      { path: "/signup", component: <SignUp />, protectedPath: false },

      {
        path: "/forgotPassword",
        component: <ForgotPassword />,
        protectedPath: false,
      },
      {
        path: "/resetPassword",
        component: <ResetPassword />,
        protectedPath: false,
      },
      {
        path: "/sendOTP",
        component: <SendOTP />,
        protectedPath: false,
      },
      {
        path: "/verifyOTP/:id?",
        component: <VerifyOTP />,
        protectedPath: false,
      },
      {
        path: "/addLocation",
        component: <AddLocation />,
        protectedPath: false,
      },
      {
        path: "/newLocation",
        component: <NewLocation />,
        protectedPath: false,
      },
    ],
  },
];
const AppRouting = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map(({ path, component, children }) => (
          <Route key={Math.random()} path={path} element={component}>
            {children.map(({ path, component, protectedPath, children }) => (
              <Route
                key={Math.random()}
                path={path}
                element={
                  <AuthGuard protectedPath={protectedPath}>
                    {component}
                  </AuthGuard>
                }
              >
                {children &&
                  children?.length > 0 &&
                  children.map(({ path, component }) => (
                    <Route
                      key={Math.random()}
                      path={path}
                      element={component}
                    />
                  ))}
              </Route>
            ))}
          </Route>
        ))}
        {/* <Route path="*" element={<Navigate to="/not-found" />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouting;
