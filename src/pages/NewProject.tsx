import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from 'react-hook-form'
import {  Flex } from "@chakra-ui/react"
import {   generateId, schemaProject } from "@/helpers"
import { Center, Textarea } from "@chakra-ui/react"
import { Field } from "../components/ui/field"
import { useNavigate, useParams } from "react-router-dom"
import { useAddProjectMutation, useEditProjectMutation, useGetProjectQuery } from "@/api/endpoints/projectEndpoints"
import MyLabel from "@/components/MyLabel"
import { Client } from "@/types"
import NameAndDateFields from "@/components/NameAndDateFields"
import NumberFields from "@/components/NumberFields"
import SelectsFields from "@/components/SelectsFields"
import ClientsField from "@/components/ClientsField"
import ActiveAndSubmit from "@/components/ActiveAndSubmit"
import { useDispatch, useSelector } from "react-redux"
import { clientsArraySelector } from "@/selectors/clientsArraySelector"
import { toaster } from "@/components/ui/toaster"
import { fillArray, resetArray } from "@/slices/clientsSlice"
import { useEffect } from "react"

export interface FormValues {
  name: string
  description: string
  priority: string
  budget: number
  categorie: string
  capacity: number
  clients: Client[]
}

const NewProject = () => {
  const arrayClients = useSelector(clientsArraySelector)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({resolver: yupResolver(schemaProject), defaultValues: {
    clients: arrayClients
  }});
  const { id } = useParams<string>() || {}
  const { data } = useGetProjectQuery(id || '', {
    skip: !id,
    refetchOnMountOrArgChange: true
  })  
  useEffect(() => {
    if (id && data ) {
      reset({
        name: data?.name,
        budget: data?.budget,
        capacity: data?.capacity,
        categorie: data?.categorie,
        clients: data?.clients,
        description: data?.description,
        priority: data?.priority,
      })
      dispatch(fillArray(data?.clients))
    }else{
      dispatch(resetArray())
    }
  },[reset, id, data, dispatch])
  const [ addProject ] = useAddProjectMutation()
  const [ editProject ] = useEditProjectMutation()
  const onSubmit = handleSubmit(async (data) => {
    const newProject = {
      ...data,
      id: id || generateId(),
      progress: 1,
      clients: arrayClients,
      status: false,
    }
    if (!(arrayClients.length > newProject.capacity)) {
      try {
        if (id) {
          await editProject([id,newProject]).unwrap()
        }else{
          await addProject(newProject).unwrap()
        }
        dispatch(resetArray())
        reset()
        toaster.create({type: 'success', title: `${id ? 'Edit Project' : 'New Project'}`, description: `The new project has been ${id ? 'edited' : 'created'} correctly`})
        navigate('/projects')
      } catch (error) {
        console.log(error);
      } 
    }else{
      toaster.create({type: 'error', title: 'Data error', description: 'You cannot assign more clients than the defined capacity'})
      return
    }
  })

  return (
    <form onSubmit={onSubmit}>
      <Center py={6} px={6}>
        <Flex border={'1px solid'} borderColor={'gray.200'} borderRadius={'md'} shadow={'md'} p={5} w={{base: '100%', lg: '70%', xl: '45%'}} flexDirection={'column'} gap={3}>

          <NameAndDateFields register={register} errors={errors}/>

          <NumberFields register={register} errors={errors}/>

          <SelectsFields register={register} errors={errors}/>

          <ClientsField/>

          <Field label={<MyLabel>Description</MyLabel>} invalid={!!errors.description} errorText={errors.description?.message}>
              <Textarea rows={1} autoresize placeholder="description" {...register('description')} />
          </Field>

          <ActiveAndSubmit/>

        </Flex>
      </Center>
    </form>

  )
}

export default NewProject
