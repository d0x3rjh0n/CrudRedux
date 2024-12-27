import { useEffect, useMemo, useState } from "react";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Flex, Table } from "@chakra-ui/react";
import { IoIosSearch } from "react-icons/io";
import { MdCreateNewFolder } from "react-icons/md";
import NoTableData from "../components/NoTableData";
import { TbFaceIdError } from "react-icons/tb";
import { MdOutlineFolderOff } from "react-icons/md";
//import { useGetProjectsQuery } from "@/api/endpoints/projectEndpoints";
import { Project } from "../types";
import TableLayout from "@/components/TableLayout";
import TableBodyProject from "@/components/TableBodyProject";
//import LoadingSkeleton from "@/components/LoadingSkeleton";
import { shouldRenderTableBody } from "@/helpers";
import { useDispatch, useSelector } from "react-redux";
import { pagProjectSelector } from "@/selectors/pagProjectSelector";
import { setProjects, resetPage } from "@/slices/paginationProjectSlice";
import PaginationComponent from "@/components/PaginationComponent";
import { projectSelector } from "@/selectors/projectSelector";
import { loadStorageProjects } from "@/slices/projectsSlice";

const columns = [{ accessorKey: "Name", header: "Name" }];

const Projects = () => {
  const [inputFilter, setInputFilter] = useState<string>("");
  //const { data: ProjectsData = [], isLoading: ProjectsLoading } = useGetProjectsQuery();
  const { arrayProject: ProjectsData } = useSelector(projectSelector);
  const { projects, count, currentPage, pageSize } =
    useSelector(pagProjectSelector);
  const dispatch = useDispatch();
  const startRange = (currentPage - 1) * pageSize;
  const endRange = startRange + pageSize;
  const isPaginated = ProjectsData.length > pageSize;
  const sessionProjects = localStorage.getItem("projects");

  useEffect(() => {
    if (sessionProjects) {
      const parsedProjects = JSON.parse(sessionProjects);
      dispatch(loadStorageProjects(parsedProjects));
    } else {
      localStorage.setItem("projects", JSON.stringify([]));
    }
    dispatch(resetPage());
  }, [dispatch, sessionProjects]);

  useMemo(() => {
    if (ProjectsData.length > 0) {
      localStorage.setItem("projects", JSON.stringify(ProjectsData));
    }
  }, [ProjectsData]);

  useEffect(() => {
    dispatch(setProjects(ProjectsData));
  }, [ProjectsData, dispatch]);

  const paginateData = useMemo(
    () => projects.slice(startRange, endRange),
    [startRange, endRange, projects]
  );

  const filteredData = useMemo(() => {
    const dataToFilter = inputFilter ? projects : paginateData;
    return dataToFilter.filter((project: Project) =>
      project.name.toLowerCase().includes(inputFilter.toLocaleLowerCase())
    );
  }, [inputFilter, projects, paginateData]);

  const table = useReactTable({
    data: filteredData || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const renderNoDataMessage = () => {
    if (inputFilter && filteredData?.length === 0) {
      return (
        <NoTableData
          title="No results found"
          description="Try adjusting your search"
          Icon={TbFaceIdError}
        />
      );
    }
    if (ProjectsData?.length === 0) {
      return (
        <NoTableData
          title="You have not added any project"
          description="Try to add a New Project"
          Icon={MdOutlineFolderOff}
        />
      );
    }
    return null;
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputFilter(e.target.value);
  };

  return (
    <TableLayout
      LinkIcon={MdCreateNewFolder}
      SearchIcon={IoIosSearch}
      handleFilterChange={handleFilterChange}
      heading="Projects Content"
      linkName="New Project"
      linkPath="/newProject"
      searchValue={inputFilter}
      placeholder="project"
    >
      {shouldRenderTableBody(filteredData, ProjectsData, inputFilter) ? (
        <Flex
          flexDirection={"column"}
          h={"full"}
          justifyContent={"space-between"}
        >
          <Table.Root w={"100%"} size="md" borderColor={"gray.100"}>
            <TableBodyProject table={table} />
          </Table.Root>
          {!inputFilter && isPaginated && (
            <PaginationComponent
              count={count}
              pageSize={pageSize}
              page={currentPage}
              value="projects"
            />
          )}
        </Flex>
      ) : (
        renderNoDataMessage()
      )}
    </TableLayout>
  );
};

export default Projects;
