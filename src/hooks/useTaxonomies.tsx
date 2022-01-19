import { useQuery } from "react-query";
import { SERVER_URL } from "utils/configs";
import { Taxonomy } from "utils/types";


const getTaxonomies = async ():Promise<Taxonomy[]>  => {

  const response = await fetch(
    `${SERVER_URL}/taxonomies`  );
  if (response.ok) {
    return response.json() as unknown as Taxonomy[] | []
  } else {
    return []
 }
};

export default function useTaxonomies() {
  return useQuery("taxonomies", getTaxonomies);
}
