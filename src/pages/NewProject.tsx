import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from 'react-hook-form'
import { Button, Flex } from "@chakra-ui/react"
import { generateId, schemaProject } from "@/helpers"
import { Center, Grid, GridItem, Input, Textarea } from "@chakra-ui/react"
import { NumberInputField, NumberInputRoot } from "../components/ui/number-input"
import { SelectContent, SelectItem, SelectRoot, SelectTrigger, SelectValueText,} from "@/components/ui/select"
import { Field } from "../components/ui/field"
import { createListCollection } from "@chakra-ui/react"
import { Checkbox } from "../components/ui/checkbox"
import { useParams } from "react-router-dom"
import { useAddProjectMutation } from "@/api/endpoints/projectEndpoints"
import MyLabel from "@/components/MyLabel"

export interface FormValues {
  name: string
  description: string
  status: string
  priority: string
  budget: number
  start_date: Date
  end_date: Date
  categorie: string
  capacity: number
}

const NewProject = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
  resolver: yupResolver(schemaProject)});
  const [ addProject ] = useAddProjectMutation()
  const { id } = useParams<string>()
  const onSubmit = handleSubmit(async (data) => {
    const newProject = {
      ...data,
      id: id || generateId(),
      progress: 0,
      actual_end_date: new Date(),
      actual_cost: 0
    }
    try {
      await addProject(newProject)
    } catch (error) {
      console.log(error);
      
    }
    reset()
  })


  return (
    
      <form onSubmit={onSubmit}>
        <Center mt={20} px={6}>
          <Flex border={'1px solid'} p={9} w={{base: '100%', lg: '70%', xl: '45%'}} flexDirection={'column'} gap={3}>

            <Grid templateColumns={'repeat(4, 1fr)'} gap={2}>
                <GridItem colSpan={4}>
                    <Field label={<MyLabel>Name of project</MyLabel>} invalid={!!errors.name} errorText={errors.name?.message}>
                      <Input outline={'none'}  {...register('name')} />
                    </Field>
                </GridItem>

                {/* Start Date */}
                <GridItem colSpan={2}>
                    <Field label={<MyLabel>Start date</MyLabel>} invalid={!!errors.start_date} errorText={errors.start_date?.message}>
                    <Input outline={'none'} placeholder="Start Date" type="date" {...register('start_date')} />
                    </Field>
                </GridItem>

                {/* End Date */}
                <GridItem colSpan={2}>
                    <Field label={<MyLabel>End date</MyLabel>} invalid={!!errors.end_date} errorText={errors.end_date?.message}>
                    <Input outline={'none'} placeholder="End Date" type="date" {...register('end_date')} />
                    </Field>
                </GridItem>
            </Grid>

            <Grid templateColumns={'repeat(2, 1fr)'} gap={5}>
              {/* Capacity */}
              <GridItem colSpan={1}>
                  <Field label={<MyLabel>Capacity</MyLabel>} invalid={!!errors.capacity} errorText={errors.capacity?.message}>
                  <NumberInputRoot defaultValue="" width="full">
                      <NumberInputField {...register('capacity')} />
                  </NumberInputRoot>
                  </Field>
              </GridItem>

              {/* Budget */}
              <GridItem colSpan={1}>
                  <Field label={<MyLabel>Budget</MyLabel>} invalid={!!errors.budget} errorText={errors.budget?.message}>
                  <NumberInputRoot defaultValue="" width="full">
                      <NumberInputField {...register('budget')} />
                  </NumberInputRoot>
                  </Field>
              </GridItem>

            </Grid>

            <Grid templateColumns={'repeat(2, 1fr)'} gap={3} w={'full'}>
              {/* Priority */}
              <GridItem colSpan={{base: 2, md: 1}}>
                  <Field label={<MyLabel>Priority</MyLabel>} invalid={!!errors.priority} errorText={errors.priority?.message}>
                    <SelectRoot  {...register('priority')} collection={prioritys} size="sm">
                        <SelectTrigger >
                        <SelectValueText />
                        </SelectTrigger>
                        <SelectContent>
                        {prioritys.items.map((priority) => (
                            <SelectItem item={priority} key={priority.value}>
                            {priority.label}
                            </SelectItem>
                        ))}
                        </SelectContent>
                    </SelectRoot>
                  </Field>
              </GridItem>

              {/* Categorie */}
              <GridItem colSpan={{base: 2, md: 1}}>
                  <Field label={<MyLabel>Categorie</MyLabel>} invalid={!!errors.categorie} errorText={errors.categorie?.message}>
                    <SelectRoot {...register('categorie')} collection={categories} size="sm">
                      <SelectTrigger>
                      <SelectValueText />
                      </SelectTrigger>
                      <SelectContent>
                      {categories.items.map((categorie) => (
                          <SelectItem item={categorie} key={categorie.value}>
                          {categorie.label}
                          </SelectItem>
                      ))}
                      </SelectContent>
                    </SelectRoot>
                  </Field>
              </GridItem>
            </Grid>

            <Field label={<MyLabel>Description</MyLabel>} invalid={!!errors.description} errorText={errors.description?.message}>
                <Textarea autoresize placeholder="description" {...register('description')} />
            </Field>

            <Grid templateColumns={'repeat(4, 1fr)'} gap={5}>
              {/* Status */}
              <GridItem colSpan={{base: 4, md: 2}} gap={5}>
                  <Field invalid={!!errors.status} errorText={errors.status?.message}>
                  <Checkbox 
                      {...register('status')}
                  >
                      Active
                  </Checkbox>
                  </Field>
              </GridItem>

              <GridItem colSpan={{ base: 4, md: 2 }}>
                <Button w={'full'} type="submit" variant={'solid'}>
                  Add Project
                </Button>
              </GridItem>
              
            </Grid>
          </Flex>
        </Center>
      </form>
  
   
  )
}

export default NewProject


const prioritys = createListCollection({
  items: [
    { label: "High", value: "high" },
    { label: "Medium", value: "medium" },
    { label: "Low", value: "low" },
  ],
})


const categories = createListCollection({
  items: [
    { label: "Marketing", value: "marketing" },
    { label: "Web-Dev", value: "web-dev" },
    { label: "Account-Services", value: "account-service" },
  ],
})