import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Admin from "./main/Admin";
import ForgotPassword from "./main/Auth/ForgotPassword";
import ResetPassword from "./main/Auth/ResetPassword";
import SignIn from "./main/Auth/SignIn";
import SignUp from "./main/Auth/SignUp";
import Posts from "./main/Posts/Posts";
import PostsCreate from "./main/Posts/PostsCreate";
import PostsDetail from "./main/Posts/PostsDetail";
import PostsUpdate from "./main/Posts/PostsUpdate";
import PostsView from "./main/Posts/PostsView";
import Users from "./main/Users/Users";

export default function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <Suspense fallback="Đang tải...">
                <Home />
              </Suspense>
            }
          />
        </Route>
        <Route path="/admin">
          <Route
            index
            element={
              <Suspense fallback="Đang tải...">
                <Admin />
              </Suspense>
            }
          />
        </Route>
        <Route path="/users">
          <Route
            index
            element={
              <Suspense fallback="Đang tải...">
                <Users />
              </Suspense>
            }
          />
        </Route>
        <Route
          path="detail/:id"
          element={
            <Suspense fallback={"Đang tải..."}>
              <PostsDetail />
            </Suspense>
          }
        />
        <Route path="/posts">
          <Route
            index
            element={
              <Suspense fallback="Đang tải...">
                <Posts />
              </Suspense>
            }
          />
          <Route path="create" element={<PostsCreate />} />
          <Route
            path="view/:id"
            element={
              <Suspense fallback={"Đang tải..."}>
                <PostsView />
              </Suspense>
            }
          />
          <Route
            path="update/:id"
            element={
              <Suspense fallback={"Đang tải..."}>
                <PostsUpdate />
              </Suspense>
            }
          />
        </Route>
        <Route path="/sign-in">
          <Route index element={<SignIn />} />
        </Route>
        <Route path="/sign-up">
          <Route index element={<SignUp />} />
        </Route>
        <Route path="/forgot-password">
          <Route index element={<ForgotPassword />} />
        </Route>
        <Route path="/reset-password/:token">
          <Route index element={<ResetPassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
