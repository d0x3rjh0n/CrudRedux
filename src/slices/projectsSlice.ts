import { Project } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Props {
  arrayProject: Project[];
}

const initialState: Props = {
  arrayProject: [],
};

const projectSlice = createSlice({
  name: "projectSlice",
  initialState,
  reducers: {
    addProject(state, action: PayloadAction<Project>) {
      state.arrayProject.push(action.payload);
    },
    editProject(state, action: PayloadAction<Project>) {
      state.arrayProject = state.arrayProject.map((project) =>
        project.id === action.payload.id ? action.payload : project
      );
    },
    deleteProject(state, action: PayloadAction<string>) {
      state.arrayProject = state.arrayProject.filter(
        (project) => project.id != action.payload
      );
    },
    loadStorageProjects(state, action: PayloadAction<Project[]>) {
      state.arrayProject = action.payload;
    },
    activateProject(state, action: PayloadAction<[string, boolean]>) {
      state.arrayProject = state.arrayProject.map((project) =>
        project.id === action.payload[0]
          ? { ...project, status: action.payload[1] }
          : project
      );
    },
    setProgress(state, action: PayloadAction<[string, number]>) {
      state.arrayProject = state.arrayProject.map((project) =>
        project.id === action.payload[0]
          ? { ...project, progress: action.payload[1] }
          : project
      );
    },
  },
});

export const {
  addProject,
  editProject,
  deleteProject,
  activateProject,
  loadStorageProjects,
  setProgress,
} = projectSlice.actions;
export default projectSlice.reducer;
