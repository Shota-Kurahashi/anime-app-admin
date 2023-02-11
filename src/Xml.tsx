import React, { useRef, useState } from "react";

export const Xml = () => {
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

  console.log(result);

  return (
    <div>
      <input type="file" ref={inputRef} onChange={handleFileChange} />

      {result.map((item) => (
        <div id={item.TID}>{`{
          title: "${item.title}",
          TID: "${item.TID}",
          SubTitles: "${item.SubTitles}"
        },`}</div>
      ))}
    </div>
  );
};
