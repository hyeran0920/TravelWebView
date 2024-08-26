import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "../Layout/Layout"; // 올바른 경로로 임포트

const Home = lazy(() => import("../Page/Home"));
const Main = lazy(() => import("../Page/Main"));
const Food = lazy(() => import("../Page/Food"));
const Contents = lazy(() => import("../Page/Contents"));

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
    path: "/Contents",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Layout>
          <Contents/>
        </Layout>
      </Suspense>
    )
  }
]);

export default root;
