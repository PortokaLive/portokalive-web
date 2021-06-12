import React from "react";
import { getLiveUsersDetails } from "../../utils/actions/actionLive";

export const LiveStreamView = ({ history, match }: any) => {
  const [liveDetails, setLiveDetails] = React.useState<any>({});
  const liveDetailProps = history?.location?.state?.liveDetails ?? {};
  const liveDetailString = JSON.stringify(liveDetailProps);

  const { streamerId } = match.params;

  React.useEffect(() => {
    const fetchData = async () => {
      if (!!JSON.parse(liveDetailString)) {
        return setLiveDetails(JSON.parse(liveDetailString));
      }
      const result = await getLiveUsersDetails(streamerId);
      if (!!result) {
        setLiveDetails(result);
      }
    };

    fetchData();
  }, [liveDetailString, streamerId]);

  return (
    <div id="liveStream" className="h-100 pt-4">
      <div
        className="h-100 w-100 mt-5"
        dangerouslySetInnerHTML={{ __html: liveDetails?.assets?.iframe }}></div>
    </div>
  );
};
