/* eslint-disable no-shadow */
/* eslint-disable react/no-array-index-key */
/* eslint-disable camelcase */
import React, { FC } from "react";
import { Episodes } from "./Episodes";
import { RefactorData } from "./RefactorData";
import { TodayData } from "./TodayData";

import { Xml } from "./Xml";

const App: FC = () => (
  <div className="p-10">
    <Episodes />
    <Xml />
    <RefactorData />
    <TodayData />
  </div>
);

export default App;
