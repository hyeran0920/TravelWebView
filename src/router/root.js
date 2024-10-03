import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "../Layout/Layout"; // 올바른 경로로 임포트
import AddressContentsList from "../Page/AddressContentsList";
import AddrInformation from "../Page/AddrInformation";

const Home = lazy(() => import("../Page/Home"));
const Main = lazy(() => import("../Page/Main"));
const Food = lazy(() => import("../Page/Food"));
const Movie = lazy(() => import("../Page/Movie"));
const Drama = lazy(() => import("../Page/Drama"));
const Map = lazy(() => import("../Component/Map"));
const ContentLocationList = lazy(() => import("../Page/ContentLocationList"));
const LocationInformation = lazy(() => import("../Page/LocationInformation"));
const Camera = lazy(() => import("../Page/Camera"));
const SearchList = lazy(() => import("../Page/SearchList.js"));
const FoodRecom = lazy(() => import("../Component/FoodRecom.js"));
const AllFestival = lazy(() => import("../Component/AllFestival.js"));

const root = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Home />
      </Suspense>
    )
  },
  {
    path: "/Main",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Layout>
          <Main />
        </Layout>
      </Suspense>
    )
  },
  {
    path: "/Food",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Layout>
          <Food/>
        </Layout>
      </Suspense>
    )
  },
  {
    path: "/Movie",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Layout>
          <Movie/>
        </Layout>
      </Suspense>
    )
  },
  {
    path: "/Drama",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Layout>
          <Drama/>
        </Layout>
      </Suspense>
    )
  },
  {
    path: "/contentLocationList/:contentTitle",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Layout>
          <ContentLocationList/>
        </Layout>
      </Suspense>
    )
  },
  {
    path: "/InformationByPlace/:contentTitle/:placeName",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
          <LocationInformation/>
      </Suspense>
    )
  },
  {
    path: "/locations/:locationName",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Layout>
          <AddressContentsList/>
        </Layout>
      </Suspense>
    )
  },
  {
    path: "/InformationByAddr/:contentTitle/:placeName",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Layout>
          <AddrInformation />
        </Layout>
      </Suspense>
    )
  },
  {
    path: "/camera",  // 카메라 경로 추가
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Camera />
      </Suspense>
    )
  },
  {
    path: "/content/searchList",  // 검색 경로
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Layout>
          <SearchList />
        </Layout>
      </Suspense>
    )
  },  {
    path: "/Map", 
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Layout>
        <Map />
        </Layout>
        </Suspense>
    )
  },{
    path: "/FoodRecom",  
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Layout>
        <FoodRecom />
        </Layout>
        </Suspense>
    )
  },{
    path: "/festivals",  
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Layout>
        <AllFestival />
        </Layout>
        </Suspense>
    )
  },
]);

export default root;
