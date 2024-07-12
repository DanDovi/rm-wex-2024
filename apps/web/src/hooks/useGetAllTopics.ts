import * as React from "react";

import { getAllTopics, ITopic } from "../api/topic";

export const useGetAllTopics = () => {
  const [data, setData] = React.useState<ITopic[] | undefined>();

  React.useEffect(() => {
    const f = async () => {
      getAllTopics().then((res) => setData(res));
    };

    f();
  }, []);

  return { topics: data };
  //   const data = await getAllTopics();
  //   return data;
};
