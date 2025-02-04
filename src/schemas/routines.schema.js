import {z} from 'zod'

export const createRutineSchema = z.object({
    title: z.string({
        required_error: "El titulo es requerido"
    }).min(3).max(20),
    description: z.string({
        required_error: "La descripcion es requerida"
    }).min(10).max(255),
    day_of_week: z.string({
        required_error: "El dia de la semana es requerido"
    }),
    duration: z.number({
        required_error: "La duracion es requerida"
    }),
    goals: z.string().optional(),
    completed: z.boolean(),
})

export const updateRutineSchema = z.object({
    title: z.string({
        required_error: "El titulo es requerido"
    }).min(3).max(20).optional(),
    description: z.string({
        required_error: "La descripcion es requerida"
    }).min(10).max(255).optional(),
    day_of_week: z.string({
        required_error: "El dia de la semana es requerido"
    }).optional(),
    duration: z.number({
        required_error: "La duracion es requerida"
    }).optional(),
    goals: z.string().optional(),
    completed: z.boolean().optional(),
})

