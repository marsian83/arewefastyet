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

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RingLoader from "react-spinners/RingLoader";

import Macrobench from "../../common/Macrobench";

import { errorApi } from "../../utils";
import Hero from "./components/Hero";

const Macro = () => {
  const urlParams = new URLSearchParams(window.location.search);

  const [gitRef, setGitRef] = useState({
    left: urlParams.get("ltag") || "Left",
    right: urlParams.get("rtag") || "Right",
  });
  const [commits, setCommits] = useState({ left: "", right: "" });

  const [dataRefs, setDataRefs] = useState();
  const [dataMacrobench, setDataMacrobench] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadRefs() {
    try {
      const responseRefs = await fetch(
        `${import.meta.env.VITE_API_URL}vitess/refs`
      );
      const jsonDataRefs = await responseRefs.json();
      setDataRefs(jsonDataRefs);
    } catch (error) {
      setError(errorApi);
    }
  }

  async function loadData() {
    const commits = {
      left: dataRefs.filter((r) => r.Name === gitRef.left)[0].CommitHash,
      right: dataRefs.filter((r) => r.Name === gitRef.right)[0].CommitHash,
    };
    setCommits(commits);

    setLoading(true);
    try {
      const responseMacrobench = await fetch(
        `${import.meta.env.VITE_API_URL}macrobench/compare?ltag=${
          commits.left
        }&rtag=${commits.right}`
      );
      const jsonDataMacrobench = await responseMacrobench.json();
      setDataMacrobench(jsonDataMacrobench);
    } catch (error) {
      console.error("Error while retrieving data from the API", error);
      setError(errorApi);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRefs();
  }, []);

  const navigate = useNavigate();
  useEffect(() => {
    navigate(`?ltag=${gitRef.left}&rtag=${gitRef.right}`);

    dataRefs && loadData();
  }, [gitRef.left, gitRef.right, dataRefs]);

  return (
    <>
      <Hero refs={dataRefs} gitRef={gitRef} setGitRef={setGitRef} />

      <div className="p-page">
        <div className="border border-front" />
      </div>

      <div className="flex flex-col items-center py-20">
        {error && (
          <div className="text-sm w-1/2 text-red-500 text-center">{error}</div>
        )}

        {loading && <RingLoader loading={loading} color="#E77002" size={300} />}

        {!loading && dataMacrobench && (
          <div className="flex flex-col gap-y-20 ">
            {gitRef.left &&
              gitRef.right &&
              dataMacrobench.map((macro, index) => {
                return (
                  <div key={index}>
                    <Macrobench
                      data={macro}
                      gitRef={gitRef}
                      commits={commits}
                    />
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </>
  );
};

export default Macro;
