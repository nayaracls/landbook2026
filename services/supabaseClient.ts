import { createClient } from '@supabase/supabase-js';
import { BusinessData } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

export const saveLead = async (data: BusinessData) => {
    if (!supabaseUrl || !supabaseKey) {
        console.warn('⚠️ Supabase não configurado');
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
                    answers: data.answers,
                    created_at: new Date().toISOString()
                }
            ]);

        if (error) {
            console.error('❌ Erro ao salvar lead:', error);
        } else {
            console.log('✅ Lead salvo com sucesso no Supabase Cloud!');
        }
    } catch (err) {
        console.error('❌ Erro inesperado:', err);
    }
};
