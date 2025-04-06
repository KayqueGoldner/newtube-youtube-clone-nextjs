import { ResultsSection } from "../sections/results-section";
import { CategoriesSection } from "../sections/categories-section";

interface SearchViewProps {
  query: string | undefined;
  categoryId: string | undefined;
}

export const SearchView = ({ categoryId, query }: SearchViewProps) => {
  return (
    <div className="mx-auto mb-10 flex max-w-[1300px] flex-col gap-y-6 px-4 pt-2.5">
      <CategoriesSection categoryId={categoryId} />
      <ResultsSection query={query} categoryId={categoryId} />
    </div>
  );
};
