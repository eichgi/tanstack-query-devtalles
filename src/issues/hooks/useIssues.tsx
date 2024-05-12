import {Issue, State} from "../../interfaces/issue";
import {githubApi} from "../../api/githubApi";
import {useQuery} from "@tanstack/react-query";
import {sleep} from "../../helpers/sleep";
import {FC} from "react";

interface Props {
  state?: State;
  labels: string[];
}

const getIssues = async (labels: string[], state?: State): Promise<Issue[]> => {
  await sleep(2);

  const params = new URLSearchParams();
  if (state) {
    params.append('state', state);
  }

  if (labels.length) {
    const labelString = labels.join(',');
    params.append('labels', labelString);
  }

  params.append('page', '1');
  params.append('per_page', '5');

  const {data} = await githubApi.get<Issue[]>('/issues', {params});
  return data;
}

export const useIssues = ({state, labels}: Props) => {
  const issuesQuery = useQuery({
    queryKey: ['issues', {state, labels}],
    queryFn: () => getIssues(labels, state),
  });

  return issuesQuery;
};