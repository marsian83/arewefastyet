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

import { useState, useEffect } from 'react';

import { errorApi } from '../utils';

const useApiCall = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [textLoading, setTextLoading] = useState(true)

  useEffect(() => {
    setTextLoading(true)
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const jsonData = await response.json();
        setTextLoading(false)
        setData(jsonData);
        setIsLoading(false);
      } catch (error) {
        console.log('Error while retrieving data from the API', error);
        setTextLoading(false)
        setError(errorApi);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading, error, textLoading };
};

export default useApiCall;