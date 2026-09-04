import { boolean, integer, pgTable, serial, text } from 'drizzle-orm/pg-core'

export const tarefas = pgTable('tarefas', {
    id: serial('id').primaryKey(),
    descricao: text('descricao').notNull(),
    concluido: boolean('concluido').notNull().default(false),
    projetoId: integer('projeto_id'),
})