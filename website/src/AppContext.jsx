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

import React, { createContext, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [isColorChanged, setColorChanged] = useState(false);

  const handleButtonClick = () => {
    if (isColorChanged) {
		document.documentElement.style.setProperty('--primary-color', '#1f1d1d');
		document.documentElement.style.setProperty('--background-color', '#ffffff');
		document.documentElement.style.setProperty('--font-color', '#000000');
		document.documentElement.style.setProperty('--dropDown-color', '#e77002');
	  } else {
		document.documentElement.style.setProperty('--primary-color', '#343A40'); 
		document.documentElement.style.setProperty('--background-color', '#1F1D1D');
		document.documentElement.style.setProperty('--font-color', '#ffffff');
		document.documentElement.style.setProperty('--dropDown-color', '#1f1d1d');
	  }
    setColorChanged(!isColorChanged);
  };

  return (
    <AppContext.Provider value={{ isColorChanged, handleButtonClick }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };