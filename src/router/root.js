import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "../Layout/Layout"; // 올바른 경로로 임포트

const Home = lazy(() => import("../Page/Home"));
const Main = lazy(() => import("../Page/Main"));
const Food = lazy(() => import("../Page/Food"));
const Movie = lazy(() => import("../Page/Movie"));
const Drama = lazy(() => import("../Page/Drama"));
const ContentLocationList = lazy(() => import("../Page/ContentLocationList"));

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
]);

export default root;
