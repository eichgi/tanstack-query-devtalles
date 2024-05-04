import {Issue} from "../../interfaces/issue";
import {githubApi} from "../../api/githubApi";
import {useQuery} from "@tanstack/react-query";
import {sleep} from "../../helpers/sleep";

const getIssues = async (): Promise<Issue[]> => {
  await sleep(2);
  const {data} = await githubApi.get<Issue[]>('/issues');
  return data;
}
export const useIssues = () => {
  const issuesQuery = useQuery({
    queryKey: ['issues'],
    queryFn: getIssues,
  });

  return issuesQuery;
};