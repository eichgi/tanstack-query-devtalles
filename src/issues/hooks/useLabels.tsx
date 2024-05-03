import {Label} from "../../interfaces/label";
import {githubApi} from "../../api/githubApi";
import {useQuery} from "@tanstack/react-query";
import {sleep} from "../../helpers/sleep";

const getLabels = async ():Promise<Label[]> => {
  await sleep(2);
  const {data} = await githubApi.get('/labels');

  return data;
}


export const useLabels = () => {
  const labelsQuery = useQuery({
    queryKey: ['labels'],
    queryFn: getLabels,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60,
    //initialData: [],
    placeholderData: [
      {
        "id": 791921801,
        "node_id": "MDU6TGFiZWw3OTE5MjE4MDE=",
        "url": "https://api.github.com/repos/facebook/react/labels/%E2%9D%A4%EF%B8%8F",
        "name": "❤️",
        "color": "ffffff",
        "default": false,
        "description": ""
      },
      {
        "id": 69105383,
        "node_id": "MDU6TGFiZWw2OTEwNTM4Mw==",
        "url": "https://api.github.com/repos/facebook/react/labels/Browser:%20IE",
        "name": "Browser: IE",
        "color": "c7def8",
        "default": false,
        "description": ""
      },
    ]
  });

  return labelsQuery;
}