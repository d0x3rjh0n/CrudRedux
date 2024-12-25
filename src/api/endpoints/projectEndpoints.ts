import api from "../apiSlice";
import { Project } from '../../types'
import { PatchStatusProject } from "../../types";
import { PatchProgressProject } from "../../types";

const projectApi = api.injectEndpoints({
    endpoints: (build) => ({
        getProjects: build.query<Project[], void>({
            query: () => ({url: '/projects', method: 'GET'}),
            providesTags: ['Projects']
        }),
        getProject: build.query<Project, string>({
            query: (id) => ({url: `/projects/${id}/`, method: 'GET'}),
            providesTags: ['Project']
        }),
        addProject: build.mutation<void, Project>({
            query: (newProject) => ({
                url: '/projects',
                method: 'POST',
                data: newProject
            }),
            invalidatesTags: ['Projects']
        }),
        changeStatus: build.mutation<void, [string, PatchStatusProject]>({
            query: ([id, newStatus]) => ({
                url: `/projects/${id}/`,
                method: 'PATCH',
                data: newStatus
            }),
            invalidatesTags: ['Projects']
        }),
        editProject: build.mutation<void, [string | undefined, Project]>({
            query: ([id, newProject]) => {
            const {name,budget,capacity,categorie,clients,description,priority} = newProject
            const PatchData = {name,budget,capacity,categorie,clients,description,priority}
            return {
                url: `/projects/${id}/`,
                method: 'PATCH',
                data: PatchData
            }},
            invalidatesTags: ['Projects']
        }),
        deleteProject: build.mutation<void, string>({
            query: (id) => ({
                url: `/projects/${id}/`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Projects']
        }),
        updateProgress: build.mutation<void, [string, PatchProgressProject]>({
            query: ([id,newProgress]) => ({
                url: `/projects/${id}/`,
                method: 'PATCH',
                data: newProgress
            }),
            invalidatesTags: ['Projects']
        }) 
    })
})


export const { useGetProjectsQuery, useUpdateProgressMutation, useAddProjectMutation, useDeleteProjectMutation, useChangeStatusMutation, useEditProjectMutation, useGetProjectQuery} = projectApi