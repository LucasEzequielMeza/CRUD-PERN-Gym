import { z } from 'zod';

export const signupSchema = z.object({
  first_name: z.string({
    required_error: "El nombre es requerido",
    invalid_type_error: "El nombre debe ser un texto"
  }).min(4, {
    message: "El nombre debe tener al menos 4 caracteres",
  }).max(50),
  last_name: z.string({
    required_error: "El apellido es requerido",
    invalid_type_error: "El apellido debe ser un texto"
  }).min(4, {
    message: "El apellido debe tener al menos 4 caracteres",
  }).max(50),
  address: z.string({
    required_error: "La dirección es requerida",
    invalid_type_error: "La dirección debe ser un texto"
  }).min(10).max(100),
  birth_date: z.string({
    required_error: "La fecha de nacimiento es requerida",
    invalid_type_error: "La fecha de nacimiento debe ser una fecha válida"
  }).refine(date => !isNaN(Date.parse(date)), {
    message: "La fecha de nacimiento debe ser una fecha válida",
  }),
  email: z.string({
    required_error: 'El email es requerido',
    invalid_type_error: 'El email debe ser un texto'
    }).email({
        message: 'El email debe ser un email valido'
    }),
  phone_number: z.string({
    required_error: "El número de teléfono es requerido",
    invalid_type_error: "El número de teléfono debe ser un número",
  }).regex(/^\+?[0-9]{1,15}$/, "El número de teléfono no es válido"),
  password: z.string({
    required_error: "La contraseña es requerida",
    invalid_type_error: "La contraseña debe ser un texto",
  }).min(8, {
    message: "La contraseña debe tener al menos 8 caracteres"
  }),
  /*membership_start_date: z.string({
    invalid_type_error: "La fecha de inicio de la membresía debe ser una fecha válida"
  }).optional().refine(date => !isNaN(Date.parse(date)), {
    message: "La fecha de inicio de la membresía debe ser una fecha válida",
  }),
  membership_expiry_date: z.string({
    invalid_type_error: "La fecha de expiración de la membresía debe ser una fecha válida"
  }).optional().refine(date => !isNaN(Date.parse(date)), {
    message: "La fecha de expiración de la membresía debe ser una fecha válida",
  })*/
});


export const signinSchema = z.object({
    email: z.string({
        required_error: "El correo electrónico es requerido",
        invalid_type_error: "El correo electrónico debe ser una dirección válida",
    }).email({
      message: "El correo electrónico no es válido"
    }),
    password: z.string({
        required_error: "La contraseña es requerida",
        invalid_type_error: "La contraseña debe ser un texto",
    }).min(8, {
        message: "La contraseña debe tener al menos 8 caracteres"
    })
})