import * as yup from 'yup'

export const generateId = () => {
    return Math.random().toString(32).substring(2)
}

export const schemaProject = yup.object().shape({
    name: yup.string().required('Name is required'),
    description: yup.string().required('Description is required'),
    status: yup.string().notRequired(),
    priority: yup.string().required('Priority is required'),
    budget: yup.number().required('Budget is required').positive(),
    start_date: yup.date().required('Start date is required'),
    end_date: yup.date().required('End date is required').min(yup.ref('start_date'), 'End date must be later than start date'),
    categorie: yup.string().required('Category is required'),
    capacity: yup.number().required('Capacity is required').positive(),
    clients: yup.array().of(
        yup.object().shape({
          id: yup.string().required(),
          name: yup.string().required('Required Field').min(3).max(8),
          age: yup.number().integer('Invalid age').min(0).max(120).required('Required Field'),
          email: yup.string().email('Invalid email').required('Required Field'),
          phone: yup.string().required('Required Field').min(8, 'Must be at least 8 characters').max(15, 'Must be 15 characters or less'),
        })
      ).required(), // Asegúrate de que este campo no sea undefined
    });


export function formatDate(isoDate: Date) {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses son 0-indexados
    const year = String(date.getFullYear()).slice(-2); // Obtiene los últimos 2 dígitos del año
    return `${day}/${month}/${year}`;
}


