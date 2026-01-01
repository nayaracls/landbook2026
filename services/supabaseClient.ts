import { createClient } from '@supabase/supabase-js';
import { BusinessData } from '../types';

// Validação básica para evitar erro fatal se as envs não existirem
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

export const saveLead = async (data: BusinessData) => {
    // Se não estiver configurado, apenas loga e retorna
    if (!supabaseUrl || !supabaseKey) {
        console.warn('Supabase não configurado. Dados não serão salvos.');
        return;
    }

    try {
        const { error } = await supabase
            .from('leads')
            .insert([
                {
                    user_name: data.userName,
                    company_name: data.companyName,
                    email: data.email,
                    whatsapp: data.whatsapp,
                    profile: typeof data.profile === 'string' ? data.profile : 'Desconhecido',
                    answers: data.answers, // Supabase aceita JSONB
                    created_at: new Date().toISOString()
                }
            ]);

        if (error) {
            console.error('Erro ao salvar lead no Supabase:', error);
        } else {
            console.log('Lead salvo com sucesso!');
        }
    } catch (err) {
        console.error('Erro inesperado ao salvar lead:', err);
    }
};
