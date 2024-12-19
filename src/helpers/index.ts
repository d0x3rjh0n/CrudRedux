import * as Yup from 'yup'

export const generateId = () => {
    return Math.random().toString(32).substring(2)
}

export const schemaProject = Yup.object().shape({
    name: Yup.string().required('req'),
    description: Yup.string().required('req'),
    status: Yup.string().required(),
    priority: Yup.string().required('req'),
    budget: Yup.number().required('req'),
    start_date: Yup.date().required('Start date is required'),
    end_date: Yup.date().required('End date is required').min(Yup.ref('start_date'), 'End date must be after start date'),
    categorie: Yup.string().required('Category is required'),
    capacity: Yup.number().required('Capacity is required').min(1, 'Capacity must be at least 1'),
    
  });