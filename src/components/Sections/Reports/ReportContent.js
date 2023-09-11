import LineChart from "@/components/Charts/LineChart";
function isLink(text) {
  // Regular expression to match a basic URL pattern
  var urlPattern = /^(http|https|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

  return urlPattern.test(text);
}
export default function ReportContent({
  data,
  graphData,
  companyData,
  selectedGraphOption,
  setSelectedGraphOption,
  full_data,
}) {
  // console.log(data?.data, full_data?.[0].paragraphs[0]);

  return (
    <div className="flex flex-[.7] flex-grow-[1] bg-white  text-black  border gap-3 p-4 rounded-md  h-[85vh] overflow-hidden overflow-y-auto">
      <div className="flex flex-[.7] flex-col">
        {full_data?.map((subHeadings, hn) => {
          return (
            <div key={hn}>
              {subHeadings?.paragraphs.map((paragraph, n) => (
                <div key={n}>
                  <p
                    className="text-2xl text-primary underline -tracking-2 leading-6 font-medium my-2"
                    id={`${paragraph.id}`}
                  >
                    {paragraph?.text}
                  </p>
                  <p className="text-base text-[#1D4ED8] -tracking-2 leading-6 font-bold my-2">
                    Source:{paragraph?.source}
                  </p>
                  {paragraph?.dataArray
                    ?.filter((v) => v.type === "card")
                    ?.map((v, i) => {
                      return (
                        <div
                          key={i + "card"}
                          className="flex flex-col gap-1] my-2"
                        >
                          <p
                            className={`mb-2text-base -tracking-2 leading-6 text-[#323A46]
                        ${v.bold == true ? " font-bold" : ""}
                        `}
                          >
                            {v.title}
                          </p>
                          {v?.paragraph ? (
                            <p className="font-medium text-sm -tracking-2 leading-6 text-[#4B5768]">
                              {v.paragraph}
                            </p>
                          ) : null}
                        </div>
                      );
                    })}
                </div>
              ))}
            </div>
          );
        })}
      </div>
      <div className="flex flex-[.3] flex-col gap-3">
        {graphData?.data && (
          <div className="flex flex-1 flex-row gap-3 justify-around align-middle">
            {[{ name: "1M" }, { name: "1Y" }, { name: "5Y" }].map((e, i) => {
              return (
                <div
                  className="w-full "
                  key={e.name}
                  onClick={() => {
                    setSelectedGraphOption(i);
                  }}
                >
                  <p
                    className={`text-center  py-2 rounded font-bold cursor-default ${
                      i == selectedGraphOption ? "bg-red-100 text-red-600" : ""
                    }`}
                  >
                    {e.name}
                  </p>
                </div>
              );
            })}
          </div>
        )}
        <LineChart key={"chart"} data={graphData?.data} />

        {companyData?.data.map((com, ind) => {
          return (
            <div
              key={ind + "com"}
              className="flex justify-between items-center border-b px-1 py-1"
            >
              <p className="text-[#64748B] text-base font-medium">
                {com.attribute}
              </p>
              <p className="text-[#323A46] text-base font-medium">
                {isLink(com.value) ? (
                  <a href={com.value} className="text-blue-500" target="_blank">
                    {com.value}
                  </a>
                ) : (
                  com.value
                )}
              </p>
            </div>
          );
        })}
        <div>
          <p className="text-center bg-gray-100 text-gray-800 p-3 text-xl">
            About
          </p>
          <p>{companyData?.about}</p>
        </div>
      </div>
    </div>
  );
}
