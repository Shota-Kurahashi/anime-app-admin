import React, { useRef, useState } from "react";
import { AllTitleDataShobo } from "./data/AllshoboTitle";
import { NOTTIDDATA } from "./data/notTidData";

const notTidData = NOTTIDDATA;
const allTidData = AllTitleDataShobo;

const filterData = () => {
  const result = notTidData
    .map((d) => {
      const flag = allTidData.find((e) => e.title === d.series_title);

      if (flag) {
        return {
          ...d,
          tid: flag.TID,
        };
      }

      return null;
    })
    .filter((d) => d !== null);

  return result;
};

export const Xml = () => {
  const [showData, setShowData] = useState(false);

  filterData();
  const inputRef = useRef<HTMLInputElement>(null);
  const [result, setResult] = useState<
    {
      title: string;
      TID: string;
      SubTitles: string;
    }[]
  >([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(
        event.target?.result as string,
        "text/xml"
      );

      const titleItems = xmlDoc.getElementsByTagName("TitleItems")[0];
      const allTitleItems = titleItems.querySelectorAll("TitleItem");

      allTitleItems?.forEach((titleItem) => {
        const title = titleItem.querySelector("Title")?.textContent;
        const TID = titleItem.querySelector("TID")?.textContent;
        const SubTitles = titleItem.querySelector("SubTitles")?.textContent;

        setResult((prev) => [
          ...prev,
          {
            title: title!.replace(/"/g, ""),
            TID: TID!,
            SubTitles: SubTitles!.replace(/"/g, ""),
          },
        ]);
      });
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <input type="file" ref={inputRef} onChange={handleFileChange} />
      <button
        className="bg-indigo-500 px-4 py-2 text-white"
        onClick={() => setShowData((p) => !p)}
      >
        showXML
      </button>

      {result.map((item) => (
        <div id={item.TID}>{`{
          title: "${item.title}",
          TID: "${item.TID}",
          SubTitles: "${item.SubTitles}"
        },`}</div>
      ))}

      {showData &&
        filterData().map((item) => (
          <div id={item?.tid}>{`{
            title: "${item?.title}",
            tid: ${item?.tid},
            media_type_id: ${item?.media_type_id},
            series_title: "${item?.series_title}"
          },`}</div>
        ))}
    </div>
  );
};
