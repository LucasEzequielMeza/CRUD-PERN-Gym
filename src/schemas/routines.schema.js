import {z} from 'zod'

export const createRutineSchema = z.object({
    title: z.string({
        required_error: "El titulo es requerido",
        invalid_type_error: "El titulo debe ser un texto",
    }).min(3, {
        message: "El titulo debe tener al menos 3 caracteres",
    }),
    description: z.string({
        required_error: "La descripcion es requerida"
    }).min(10, {
        message: "La descripcion debe tener al menos 10 caracteres"
    }
    ).max(255),
    day_of_week: z.string({
        required_error: "El dia de la semana es requerido"
    }),
    duration: z.string({
        required_error: "La duracion es requerida"
    }),
    goals: z.string().optional(),
    completed: z.boolean().optional(),
})

export const updateRutineSchema = z.object({
    title: z.string({
        required_error: "El titulo es requerido"
    }).min(3, {
        message: "El titulo debe tener al menos 3 caracteres",
    }).optional(),
    description: z.string({
        required_error: "La descripcion es requerida"
    }).min(10, {
        message: "La descripcion debe tener al menos 10 caracteres"
    }).max(255).optional(),
    day_of_week: z.string({
        required_error: "El dia de la semana es requerido"
    }).optional(),
    duration: z.string({
        required_error: "La duracion es requerida"
    }).optional(),
    goals: z.string().optional(),
})

