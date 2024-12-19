import api from "../apiSlice";
import { Project } from '../../types'
const projectApi = api.injectEndpoints({
    endpoints: (build) => ({
        getProjects: build.query<Project[], void>({
            query: () => ({url: '/projects', method: 'GET'}),
            providesTags: ['Projects']
        }),
        addProject: build.mutation<void, Project>({
            query: (newProject) => ({
                url: '/projects',
                method: 'POST',
                data: newProject
            }),
            invalidatesTags: ['Projects']
        })
    })
})


export const { useGetProjectsQuery, useAddProjectMutation } = projectApi