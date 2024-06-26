/*
Copyright 2023 The Vitess Authors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import { Routes, Route } from "react-router-dom";

import ErrorPage from "./ErrorPage/ErrorPage";
import MacroPage from "./MacroPage/MacroPage";
import ComparePage from "./ComparePage/ComparePage";
import PRsPage from "./PRsPage/PRsPage";
import HomePage from "./HomePage/HomePage";
import StatusPage from "./StatusPage/StatusPage";
import DailyPage from "./DailyPage/DailyPage";
import SearchPage from "./SearchPage/SearchPage";
import PRPage from "./PRPage/PRPage";
import MacroQueriesComparePage from "./MacroQueriesComparePage/MacroQueriesComparePage";
// import MicroPage from "./MicroPage/MicroPage";
import AdminLoginPage from "./AdminLoginPage/AdminLoginPage";
import Layout from "../layout";
import AdminPanelPage from "./AdminPanelPage/AdminPanelPage";
import AdminBenchmarksPage from "./AdminBenchmarksPage/AdminBenchmarksPage";
import TestingPage from "./TestingPage/TestingPage";

const PublicRoute = () => {
  return (
    <Routes>
      <Route element={<Layout.Default />}>
        <Route index element={<HomePage />} />

        <Route path="home" element={<HomePage />} />
        <Route path="status" element={<StatusPage />} />
        <Route path="Daily" element={<DailyPage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="compare" element={<ComparePage />} />
        <Route path="macro" element={<MacroPage />} />
        <Route
          path="macrobench/queries/compare"
          element={<MacroQueriesComparePage />}
        />
        {/* <Route path="/micro" element={<MicroPage />} /> */}
        <Route path="pr" element={<PRsPage />} />
        <Route path="pr/:pull_nb" element={<PRPage />} />

        <Route path="*" element={<ErrorPage />} />
      </Route>

      <Route path="admin" element={<Layout.Admin />}>
        <Route index element={<AdminPanelPage />} />
        <Route path="benchmarks" element={<AdminBenchmarksPage />} />
      </Route>

      <Route path="admin/auth/login" element={<AdminLoginPage />} />
      <Route path="test/api" element={<TestingPage />} />
    </Routes>
  );
};

export default PublicRoute;
